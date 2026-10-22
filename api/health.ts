/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function handler(req: any, res: any) {
  res.status(200).json({
    status: 'ok',
    platform: 'vercel',
    mauticFormId: 21,
    crmHost: 'crm.nambds.vn',
    timestamp: new Date().toISOString(),
  });
}
