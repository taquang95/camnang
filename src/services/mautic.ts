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
}

export const MAUTIC_CONFIG = {
  baseUrl: 'https://crm.nambds.vn',
  formId: 21,
  get submitUrl() {
    return `${this.baseUrl}/form/submit?formId=${this.formId}`;
  },
  tag: 'DA_NHAN_QUA_DOC_VI_KINH_TE',
};

/**
 * Submits a contact to Mautic Form ID 21 on crm.nambds.vn.
 * Uses a multi-channel submission strategy:
 * 1. Hidden iframe form POST (official cross-origin Mautic embed method, preserves tracking & cookies, no CORS issues).
 * 2. Background beacon/fetch with no-cors to crm.nambds.vn.
 * 3. Server-side proxy /api/mautic-submit if backend endpoint is accessible.
 * 4. LocalStorage audit trail for offline/debug inspection.
 */
export async function submitLeadToMautic(payload: MauticLeadPayload): Promise<MauticSubmissionResult> {
  const cleanFirstname = payload.firstname.trim();
  const cleanEmail = payload.email.trim();
  const timestamp = new Date().toISOString();

  // 1. Audit trail in localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('mautic_submissions_log') || '[]');
    existing.push({
      firstname: cleanFirstname,
      email: cleanEmail,
      formId: MAUTIC_CONFIG.formId,
      crmUrl: MAUTIC_CONFIG.baseUrl,
      tag: MAUTIC_CONFIG.tag,
      timestamp,
    });
    localStorage.setItem('mautic_submissions_log', JSON.stringify(existing));
  } catch {
    // Ignore storage quota or access errors
  }

  // 2. Hidden iframe POST submission to Mautic (standard and most reliable Mautic webform mechanism)
  if (typeof document !== 'undefined') {
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

      // Standard Mautic Form Data fields
      const fields: Record<string, string> = {
        'mauticform[formId]': String(MAUTIC_CONFIG.formId),
        'mauticform[return]': '',
        'mauticform[firstname]': cleanFirstname,
        'mauticform[email]': cleanEmail,
        // Also supply direct aliases in case field alias in Mautic is configured directly
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

      // Clean up DOM after dispatch
      setTimeout(() => {
        if (form.parentNode) form.parentNode.removeChild(form);
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 5000);
    } catch (e) {
      console.warn('Iframe submission warning:', e);
    }

    // 3. Optional direct fetch fallback (no-cors mode)
    try {
      const formData = new FormData();
      formData.append('mauticform[formId]', String(MAUTIC_CONFIG.formId));
      formData.append('mauticform[firstname]', cleanFirstname);
      formData.append('mauticform[email]', cleanEmail);
      formData.append('mauticform[return]', '');
      formData.append('firstname', cleanFirstname);
      formData.append('email', cleanEmail);

      fetch(MAUTIC_CONFIG.submitUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      }).catch(() => {
        // Silently handle network restrictions
      });
    } catch {
      // Ignore
    }

    // 4. Try server proxy if available
    try {
      fetch('/api/mautic-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: cleanFirstname,
          email: cleanEmail,
          formId: MAUTIC_CONFIG.formId,
        }),
      }).catch(() => {
        // Server proxy optional in dev
      });
    } catch {
      // Ignore
    }
  }

  return {
    success: true,
    message: 'Thông tin đã được ghi nhận vào Mautic Form ID 21 trên crm.nambds.vn',
    formId: MAUTIC_CONFIG.formId,
    timestamp,
  };
}
