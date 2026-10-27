/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// In-memory rate limiting and deduplication map (email -> timestamp)
const recentServerSubmissions = new Map<string, number>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [email, time] of recentServerSubmissions.entries()) {
    if (now - time > 60000) {
      recentServerSubmissions.delete(email);
    }
  }
}, 60000);

// Vercel Serverless Function for Mautic CRM Form ID 21 on crm.nambds.vn
export default async function handler(req: any, res: any) {
  // CORS Preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstname, email, formId = 21 } = req.body || {};

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanFirstname = typeof firstname === 'string' ? firstname.trim() : '';
    const now = Date.now();

    // Server-side Deduplication Guard: Ignore duplicates within 30 seconds
    const lastSubTime = recentServerSubmissions.get(cleanEmail);
    if (lastSubTime && now - lastSubTime < 30000) {
      console.log(`[Vercel Mautic Proxy] Deduplicated request for ${cleanEmail} (${Math.round((now - lastSubTime)/1000)}s ago). Skipping CRM dispatch.`);
      return res.status(200).json({
        success: true,
        formId,
        email: cleanEmail,
        deduplicated: true,
        message: 'Request already processed recently',
      });
    }

    // Record submission time
    recentServerSubmissions.set(cleanEmail, now);

    const mauticUrl = `https://crm.nambds.vn/form/submit?formId=${formId}`;
    const params = new URLSearchParams();
    params.append('mauticform[formId]', String(formId));
    params.append('mauticform[formName]', 'bieumaudocvinenkinhtebanhang');
    params.append('mauticform[firstname]', cleanFirstname);
    params.append('mauticform[email]', cleanEmail);
    params.append('mauticform[submit]', '1');
    params.append('mauticform[return]', '');

    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';

    // Set 15s timeout since Mautic synchronously connects to SMTP on form submit (takes ~5-6s)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(mauticUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': (req.headers['user-agent'] as string) || 'Vercel-MauticProxy/1.0',
        'X-Forwarded-For': clientIp,
      },
      body: params.toString(),
      signal: controller.signal,
    }).finally(() => {
      clearTimeout(timeoutId);
    });

    console.log(`[Vercel Mautic Proxy] Successfully dispatched ${cleanEmail} to Mautic. Status: ${response.status}`);

    return res.status(200).json({
      success: true,
      formId,
      email: cleanEmail,
      mauticStatus: response.status,
    });
  } catch (err: unknown) {
    console.error('[Vercel Mautic Proxy Error]', err);
    // Return 200 so customer UX continues gracefully
    return res.status(200).json({ success: true, note: 'fallback_handled' });
  }
}
