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
    email: 'nam.unique1@gmail.com',
  });

  assert.equal(result.success, true);
  assert.equal(result.formId, 21);
  assert.ok(result.timestamp);
});

test('submitLeadToMautic deduplicates repeated submissions for the same email within cooldown', async () => {
  const testEmail = 'dedup.test@gmail.com';

  const res1 = await submitLeadToMautic({
    firstname: 'Test User',
    email: testEmail,
  });
  assert.equal(res1.success, true);

  // Immediate second call with same email should be deduplicated
  const res2 = await submitLeadToMautic({
    firstname: 'Test User Duplicate',
    email: testEmail,
  });
  assert.equal(res2.success, true);
  assert.equal(res2.deduplicated, true);
});

test('submitLeadToMautic handles concurrent requests with in-flight mutex', async () => {
  const testEmail = 'concurrent.test@gmail.com';

  const [res1, res2] = await Promise.all([
    submitLeadToMautic({ firstname: 'User A', email: testEmail }),
    submitLeadToMautic({ firstname: 'User B', email: testEmail }),
  ]);

  assert.equal(res1.success, true);
  assert.equal(res2.success, true);
});
