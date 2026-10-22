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

  // API endpoint for Mautic proxy (Form ID 21 on crm.nambds.vn)
  app.post('/api/mautic-submit', async (req, res) => {
    try {
      const { firstname, email, formId = 21 } = req.body;
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

      const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';

      const response = await fetch(mauticUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': (req.headers['user-agent'] as string) || 'LandingPage/1.0',
          'X-Forwarded-For': clientIp,
        },
        body: params.toString(),
      });

      console.log(`[Mautic] Forwarded lead ${email} to ${mauticUrl}. HTTP status: ${response.status}`);
      return res.json({ success: true, formId, email });
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
