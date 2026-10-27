/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

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

  // API endpoint for Mautic proxy (Form ID 21 on crm.nambds.vn)
  app.post('/api/mautic-submit', async (req, res) => {
    try {
      const { firstname, email, formId = 21 } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
      }

      const cleanEmail = email.trim().toLowerCase();
      const cleanFirstname = typeof firstname === 'string' ? firstname.trim() : '';
      const now = Date.now();

      // Server-side Deduplication Guard: Ignore duplicates within 30 seconds
      const lastSubTime = recentServerSubmissions.get(cleanEmail);
      if (lastSubTime && now - lastSubTime < 30000) {
        console.log(`[Mautic Proxy] Deduplicated request for ${cleanEmail} (${Math.round((now - lastSubTime)/1000)}s ago). Skipping CRM dispatch.`);
        return res.json({
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
          'User-Agent': (req.headers['user-agent'] as string) || 'LandingPage/1.0',
          'X-Forwarded-For': clientIp,
        },
        body: params.toString(),
        signal: controller.signal,
      }).finally(() => {
        clearTimeout(timeoutId);
      });

      console.log(`[Mautic] Forwarded lead ${cleanEmail} to ${mauticUrl}. HTTP status: ${response.status}`);
      return res.json({ success: true, formId, email: cleanEmail, mauticStatus: response.status });
    } catch (err: unknown) {
      console.error('[Mautic proxy error]', err);
      return res.json({ success: true, note: 'fallback_handled' });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mauticFormId: 21, mauticHost: 'crm.nambds.vn' });
  });

  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
