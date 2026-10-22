/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { MAUTIC_CONFIG, submitLeadToMautic } from './mautic.ts';

test('MAUTIC_CONFIG matches user requirements for crm.nambds.vn and form ID 21', () => {
  assert.equal(MAUTIC_CONFIG.baseUrl, 'https://crm.nambds.vn');
  assert.equal(MAUTIC_CONFIG.formId, 21);
  assert.equal(MAUTIC_CONFIG.submitUrl, 'https://crm.nambds.vn/form/submit?formId=21');
  assert.equal(MAUTIC_CONFIG.tag, 'DA_NHAN_QUA_DOC_VI_KINH_TE');
});

test('submitLeadToMautic handles firstname and email payload gracefully in Node environment', async () => {
  const result = await submitLeadToMautic({
    firstname: 'Nguyễn Văn Nam',
    email: 'nam.investor@gmail.com',
  });

  assert.equal(result.success, true);
  assert.equal(result.formId, 21);
  assert.ok(result.message.includes('Mautic Form ID 21'));
  assert.ok(result.timestamp);
});
