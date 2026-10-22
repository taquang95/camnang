/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const mauticUrl = `https://crm.nambds.vn/form/submit?formId=${formId}`;
    const params = new URLSearchParams();
    params.append('mauticform[formId]', String(formId));
    params.append('mauticform[firstname]', firstname || '');
    params.append('mauticform[email]', email);
    params.append('mauticform[return]', '');
    params.append('firstname', firstname || '');
    params.append('email', email);

    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket?.remoteAddress || '';

    const response = await fetch(mauticUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': (req.headers['user-agent'] as string) || 'Vercel-MauticProxy/1.0',
        'X-Forwarded-For': clientIp,
      },
      body: params.toString(),
    });

    return res.status(200).json({
      success: true,
      formId,
      email,
      mauticStatus: response.status,
    });
  } catch (err: unknown) {
    console.error('[Vercel Mautic Proxy Error]', err);
    return res.status(200).json({ success: true, note: 'fallback_handled' });
  }
}
