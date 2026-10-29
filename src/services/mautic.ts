/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MauticLeadPayload {
  firstname: string;
  email: string;
}

export interface MauticSubmissionResult {
  success: boolean;
  message: string;
  formId: number;
  timestamp: string;
  deduplicated?: boolean;
}

export const MAUTIC_CONFIG = {
  baseUrl: 'https://crm.nambds.vn',
  formId: 21,
  formName: 'bieumaudocvinenkinhtebanhang',
  get submitUrl() {
    return `${this.baseUrl}/form/submit?formId=${this.formId}`;
  },
  tag: 'DA_NHAN_QUA_DOC_VI_KINH_TE',
  // Strict 60-second cooldown window to prevent repeated submissions
  cooldownMs: 60000,
};

// In-memory mutex map to prevent concurrent duplicate submissions for the same email
const inFlightPromises = new Map<string, Promise<MauticSubmissionResult>>();

// In-memory timestamp map for client-side cooldown
const lastSubmittedTimestamps = new Map<string, number>();

/**
 * Submits a contact directly to Mautic Form ID 21 on crm.nambds.vn.
 *
 * PURE CLIENT-SIDE EMBEDDED FORM DISPATCH:
 * 1. Single stream only: Directly from visitor's browser to crm.nambds.vn Form ID 21.
 * 2. Streams from 127.0.0.1 (local server) and cloud server (/api/mautic-submit) are completely disabled.
 * 3. Preserves visitor's real client IP, headers, and Mautic tracking cookies.
 * 4. Multi-layer Deduplication:
 *    - In-flight mutex (blocks parallel simultaneous clicks)
 *    - In-memory 60s cooldown
 *    - SessionStorage 60s cooldown
 *    - LocalStorage 60s cooldown (across browser tabs)
 * 5. Exact schema matching Mautic Form ID 21:
 *    - mauticform[formId] = 21
 *    - mauticform[formName] = bieumaudocvinenkinhtebanhang
 *    - mauticform[firstname] = <Ho va ten>
 *    - mauticform[email] = <Email>
 *    - mauticform[submit] = 1
 *    - mauticform[return] = ""
 */
export async function submitLeadToMautic(payload: MauticLeadPayload): Promise<MauticSubmissionResult> {
  const cleanFirstname = payload.firstname.trim();
  const cleanEmail = payload.email.trim().toLowerCase();
  const now = Date.now();
  const timestamp = new Date().toISOString();

  // 1. Check in-memory deduplication cooldown (60 seconds)
  const lastTime = lastSubmittedTimestamps.get(cleanEmail) || 0;
  if (now - lastTime < MAUTIC_CONFIG.cooldownMs) {
    console.log(`[Mautic Client Form] Deduplicated in-memory: ${cleanEmail} was submitted ${Math.round((now - lastTime) / 1000)}s ago. Skipping.`);
    return {
      success: true,
      message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
      formId: MAUTIC_CONFIG.formId,
      timestamp,
      deduplicated: true,
    };
  }

  // 2. Check sessionStorage & localStorage cooldown (60 seconds)
  try {
    if (typeof sessionStorage !== 'undefined') {
      const sessionTime = Number(sessionStorage.getItem(`mautic_submitted_${cleanEmail}`) || '0');
      if (now - sessionTime < MAUTIC_CONFIG.cooldownMs) {
        console.log(`[Mautic Client Form] Deduplicated via sessionStorage: ${cleanEmail}. Skipping duplicate.`);
        return {
          success: true,
          message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
          formId: MAUTIC_CONFIG.formId,
          timestamp,
          deduplicated: true,
        };
      }
    }

    if (typeof localStorage !== 'undefined') {
      const storedLastTime = Number(localStorage.getItem(`mautic_submitted_${cleanEmail}`) || '0');
      if (now - storedLastTime < MAUTIC_CONFIG.cooldownMs) {
        console.log(`[Mautic Client Form] Deduplicated via localStorage: ${cleanEmail}. Skipping duplicate.`);
        return {
          success: true,
          message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
          formId: MAUTIC_CONFIG.formId,
          timestamp,
          deduplicated: true,
        };
      }
    }
  } catch {
    // Ignore storage quota or access errors
  }

  // 3. Check if there is an in-flight submission for this exact email
  const existingPromise = inFlightPromises.get(cleanEmail);
  if (existingPromise) {
    console.log(`[Mautic Client Form] Joining in-flight submission for ${cleanEmail}`);
    return existingPromise;
  }

  // Mark submission timestamp immediately to prevent race conditions
  lastSubmittedTimestamps.set(cleanEmail, now);
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(`mautic_submitted_${cleanEmail}`, String(now));
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`mautic_submitted_${cleanEmail}`, String(now));
      
      const existing = JSON.parse(localStorage.getItem('mautic_submissions_log') || '[]');
      existing.push({
        firstname: cleanFirstname,
        email: cleanEmail,
        formId: MAUTIC_CONFIG.formId,
        crmUrl: MAUTIC_CONFIG.baseUrl,
        tag: MAUTIC_CONFIG.tag,
        timestamp,
      });
      localStorage.setItem('mautic_submissions_log', JSON.stringify(existing.slice(-20)));
    }
  } catch {
    // Ignore storage quota or access errors
  }

  // 4. Create single execution promise directly via client-side Mautic form submit
  const submissionPromise = (async (): Promise<MauticSubmissionResult> => {
    if (typeof document !== 'undefined') {
      try {
        console.log(`[Mautic Client Form] Submitting lead directly to ${MAUTIC_CONFIG.baseUrl} for ${cleanEmail}`);
        
        const iframeName = `mautic_lead_frame_${Date.now()}`;
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px';
        iframe.style.left = '-9999px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';
        iframe.style.pointerEvents = 'none';
        iframe.setAttribute('aria-hidden', 'true');
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = MAUTIC_CONFIG.submitUrl;
        form.target = iframeName;
        form.style.display = 'none';

        // Exact Mautic Form 21 schema fields
        const fields: Record<string, string> = {
          'mauticform[formId]': String(MAUTIC_CONFIG.formId),
          'mauticform[formName]': MAUTIC_CONFIG.formName,
          'mauticform[firstname]': cleanFirstname,
          'mauticform[email]': cleanEmail,
          'mauticform[submit]': '1',
          'mauticform[return]': '',
        };

        Object.entries(fields).forEach(([key, val]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = val;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        // Clean up DOM elements after submission has propagated
        setTimeout(() => {
          if (form.parentNode) form.parentNode.removeChild(form);
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 5000);
      } catch (e) {
        console.warn('[Mautic Client Form] Direct form dispatch error:', e);
      }
    }

    return {
      success: true,
      message: 'Thông tin đã được ghi nhận vào Mautic Form ID 21 trên crm.nambds.vn',
      formId: MAUTIC_CONFIG.formId,
      timestamp,
    };
  })();

  inFlightPromises.set(cleanEmail, submissionPromise);

  try {
    const result = await submissionPromise;
    return result;
  } finally {
    // Release in-flight lock
    inFlightPromises.delete(cleanEmail);
  }
}
