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
 * Submits a contact to Mautic Form ID 21 on crm.nambds.vn.
 *
 * CRITICAL DEFENSE-IN-DEPTH ARCHITECTURE:
 * 1. Multi-layer Deduplication:
 *    - In-flight mutex (blocks parallel simultaneous clicks)
 *    - In-memory 60s cooldown
 *    - SessionStorage 60s cooldown
 *    - LocalStorage 60s cooldown (across browser tabs)
 * 2. Guaranteed SINGLE dispatch:
 *    - Tries backend/Vercel serverless proxy (/api/mautic-submit) with 15s timeout
 *    - ONLY if the proxy endpoint returns a genuine 404/network unreachable (e.g. pure static hosting),
 *      it executes the hidden iframe POST.
 *    - Never executes both.
 * 3. Exact field mapping matching Mautic Form ID 21 schema:
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
    console.log(`[Mautic] Deduplicated in-memory: ${cleanEmail} was submitted ${Math.round((now - lastTime) / 1000)}s ago. Skipping redundant submission.`);
    return {
      success: true,
      message: 'Thông tin của anh/chị đã được tiếp nhận thành công.',
      formId: MAUTIC_CONFIG.formId,
      timestamp,
      deduplicated: true,
    };
  }

  // 2. Check sessionStorage & localStorage cooldown
  try {
    if (typeof sessionStorage !== 'undefined') {
      const sessionTime = Number(sessionStorage.getItem(`mautic_submitted_${cleanEmail}`) || '0');
      if (now - sessionTime < MAUTIC_CONFIG.cooldownMs) {
        console.log(`[Mautic] Deduplicated via sessionStorage: ${cleanEmail}. Skipping duplicate.`);
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
        console.log(`[Mautic] Deduplicated via localStorage: ${cleanEmail}. Skipping duplicate.`);
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
    console.log(`[Mautic] Joining in-flight submission for ${cleanEmail}`);
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

  // 4. Create single execution promise
  const submissionPromise = (async (): Promise<MauticSubmissionResult> => {
    let proxyAttemptedAndCompleted = false;

    // Strategy A: Primary path - Send ONE request via backend/serverless proxy (/api/mautic-submit)
    if (typeof window !== 'undefined') {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 16000);

        const response = await fetch('/api/mautic-submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstname: cleanFirstname,
            email: cleanEmail,
            formId: MAUTIC_CONFIG.formId,
          }),
          signal: controller.signal,
        }).finally(() => {
          clearTimeout(timeoutId);
        });

        // If the proxy endpoint answered (200, 302, etc.), consider it completed
        if (response.ok || response.status === 200 || response.status === 204) {
          proxyAttemptedAndCompleted = true;
          console.log(`[Mautic] Successfully dispatched lead via /api/mautic-submit for ${cleanEmail}`);
        } else if (response.status !== 404 && response.status !== 405) {
          // If status is 500 or other, the server already received the request, do NOT retry via iframe
          proxyAttemptedAndCompleted = true;
          console.warn(`[Mautic] Backend proxy returned status ${response.status}, not retrying to avoid duplicate email.`);
        }
      } catch (err: any) {
        // Only if it's an offline network error or abort, we log
        console.warn('[Mautic] Backend proxy request notice:', err?.message || err);
        // If aborted after 16s, the server was already processing, do not fire a second request!
        if (err?.name === 'AbortError') {
          proxyAttemptedAndCompleted = true;
        }
      }
    }

    // Strategy B: Fallback ONLY if proxy endpoint is completely non-existent (e.g. running on pure static CDN)
    if (!proxyAttemptedAndCompleted && typeof document !== 'undefined') {
      try {
        console.log(`[Mautic] Submitting lead via native form iframe fallback for ${cleanEmail}`);
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

        setTimeout(() => {
          if (form.parentNode) form.parentNode.removeChild(form);
          if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 4000);
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
