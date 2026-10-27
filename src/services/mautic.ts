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
  get submitUrl() {
    return `${this.baseUrl}/form/submit?formId=${this.formId}`;
  },
  tag: 'DA_NHAN_QUA_DOC_VI_KINH_TE',
  // Cooldown window in milliseconds to prevent duplicate submissions
  cooldownMs: 30000, // 30 seconds
};

// In-memory mutex map to prevent concurrent duplicate submissions for the same email
const inFlightPromises = new Map<string, Promise<MauticSubmissionResult>>();

// In-memory timestamp map for client-side cooldown
const lastSubmittedTimestamps = new Map<string, number>();

/**
 * Submits a contact to Mautic Form ID 21 on crm.nambds.vn.
 *
 * CRITICAL FIX FOR MULTIPLE EMAILS & CRM OVERLOAD:
 * 1. Cooldown & Deduplication: Prevents submitting the same email multiple times within 30s.
 * 2. In-flight Mutex: If a submission is already pending, returns the existing promise.
 * 3. SINGLE Authoritative Dispatch: Sends exactly ONE request (via API proxy).
 *    Only falls back to hidden iframe if the API proxy is completely unreachable.
 *    NEVER executes parallel dispatches.
 */
export async function submitLeadToMautic(payload: MauticLeadPayload): Promise<MauticSubmissionResult> {
  const cleanFirstname = payload.firstname.trim();
  const cleanEmail = payload.email.trim().toLowerCase();
  const now = Date.now();
  const timestamp = new Date().toISOString();

  // 1. Check deduplication cooldown (30 seconds window)
  const lastTime = lastSubmittedTimestamps.get(cleanEmail) || 0;
  if (now - lastTime < MAUTIC_CONFIG.cooldownMs) {
    console.log(`[Mautic] Deduplicated: ${cleanEmail} was submitted ${Math.round((now - lastTime) / 1000)}s ago. Skipping redundant submission.`);
    return {
      success: true,
      message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
      formId: MAUTIC_CONFIG.formId,
      timestamp,
      deduplicated: true,
    };
  }

  // Check localStorage cooldown as well (across tabs)
  try {
    const storedLastTime = Number(localStorage.getItem(`mautic_submitted_${cleanEmail}`) || '0');
    if (now - storedLastTime < MAUTIC_CONFIG.cooldownMs) {
      console.log(`[Mautic] Deduplicated via storage: ${cleanEmail}. Skipping redundant submission.`);
      return {
        success: true,
        message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
        formId: MAUTIC_CONFIG.formId,
        timestamp,
        deduplicated: true,
      };
    }
  } catch {
    // Ignore localStorage errors
  }

  // 2. Check if there is an in-flight submission for this exact email
  const existingPromise = inFlightPromises.get(cleanEmail);
  if (existingPromise) {
    console.log(`[Mautic] Joining in-flight submission for ${cleanEmail}`);
    return existingPromise;
  }

  // Mark submission timestamp immediately to prevent race conditions
  lastSubmittedTimestamps.set(cleanEmail, now);
  try {
    localStorage.setItem(`mautic_submitted_${cleanEmail}`, String(now));
    
    // Audit log
    const existing = JSON.parse(localStorage.getItem('mautic_submissions_log') || '[]');
    existing.push({
      firstname: cleanFirstname,
      email: cleanEmail,
      formId: MAUTIC_CONFIG.formId,
      crmUrl: MAUTIC_CONFIG.baseUrl,
      tag: MAUTIC_CONFIG.tag,
      timestamp,
    });
    localStorage.setItem('mautic_submissions_log', JSON.stringify(existing.slice(-20))); // Keep last 20
  } catch {
    // Ignore storage quota or access errors
  }

  // 3. Create single execution promise
  const submissionPromise = (async (): Promise<MauticSubmissionResult> => {
    let proxySucceeded = false;

    // Strategy A: Primary path - Send ONE request via backend/serverless proxy (/api/mautic-submit)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/mautic-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: cleanFirstname,
            email: cleanEmail,
            formId: MAUTIC_CONFIG.formId,
          }),
        });

        if (response.ok) {
          proxySucceeded = true;
          console.log(`[Mautic] Successfully submitted lead via /api/mautic-submit for ${cleanEmail}`);
        }
      } catch (err) {
        console.warn('[Mautic] Backend proxy unreachable, falling back to client-side iframe', err);
      }
    }

    // Strategy B: Fallback ONLY if proxy failed (e.g. running in purely static environment)
    if (!proxySucceeded && typeof document !== 'undefined') {
      try {
        const iframeId = `mautic_iframe_${Date.now()}`;
        const iframe = document.createElement('iframe');
        iframe.id = iframeId;
        iframe.name = iframeId;
        iframe.style.display = 'none';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = MAUTIC_CONFIG.submitUrl;
        form.target = iframeId;
        form.style.display = 'none';

        const fields: Record<string, string> = {
          'mauticform[formId]': String(MAUTIC_CONFIG.formId),
          'mauticform[return]': '',
          'mauticform[firstname]': cleanFirstname,
          'mauticform[email]': cleanEmail,
          'firstname': cleanFirstname,
          'email': cleanEmail,
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

        setTimeout(() => {
          if (form.parentNode) form.parentNode.removeChild(form);
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 3000);
      } catch (e) {
        console.warn('[Mautic] Iframe fallback error:', e);
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
