import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ECONOMIC_STAGES,
  STAGES_LIST,
  INDICATOR_GROUPS,
  HANDBOOK_PAGES,
  calculateDiagnosticResult
} from './economicData.ts';

test('ECONOMIC_STAGES contains all 5 classic cycle stages', () => {
  assert.equal(STAGES_LIST.length, 5);
  assert.equal(ECONOMIC_STAGES.trough.name, 'Đáy');
  assert.equal(ECONOMIC_STAGES.recovery.name, 'Phục hồi');
  assert.equal(ECONOMIC_STAGES.expansion.name, 'Mở rộng');
  assert.equal(ECONOMIC_STAGES.peak.name, 'Gần đỉnh');
  assert.equal(ECONOMIC_STAGES.contraction.name, 'Thu hẹp');
});

test('INDICATOR_GROUPS contains 9 core indicators from Page 16 matrix', () => {
  assert.equal(INDICATOR_GROUPS.length, 9);
  
  // Verify leading, coincident, lagging groups exist
  const leading = INDICATOR_GROUPS.filter(i => i.timing === 'leading');
  const coincident = INDICATOR_GROUPS.filter(i => i.timing === 'coincident');
  const lagging = INDICATOR_GROUPS.filter(i => i.timing === 'lagging');

  assert.ok(leading.length >= 3, 'Must have at least 3 leading indicators');
  assert.ok(coincident.length >= 2, 'Must have coincident indicators');
  assert.ok(lagging.length >= 3, 'Must have lagging indicators');

  // Verify all 9 indicators have data for all 5 stages
  for (const ind of INDICATOR_GROUPS) {
    assert.ok(ind.stagesData.trough, `${ind.name} missing trough data`);
    assert.ok(ind.stagesData.recovery, `${ind.name} missing recovery data`);
    assert.ok(ind.stagesData.expansion, `${ind.name} missing expansion data`);
    assert.ok(ind.stagesData.peak, `${ind.name} missing peak data`);
    assert.ok(ind.stagesData.contraction, `${ind.name} missing contraction data`);
  }
});

test('HANDBOOK_PAGES contains all 16 pages synthesized from original book', () => {
  assert.equal(HANDBOOK_PAGES.length, 16);
  assert.equal(HANDBOOK_PAGES[0].pageNumber, 1);
  assert.equal(HANDBOOK_PAGES[15].pageNumber, 16);
  assert.equal(HANDBOOK_PAGES[15].title, 'Bảng tra cứu thực chiến: Nền kinh tế đang ở đâu?');
});

test('calculateDiagnosticResult calculates dominant stage correctly', () => {
  // Test recovery bias
  const recoveryAnswers = {
    1: 2, // PMI vừa vượt 50 -> recovery
    2: 1, // Lãi suất vẫn thấp -> recovery
    3: 2, // Bắt đầu tuyển dụng lại -> recovery
    4: 1  // Thanh khoản nhích nhẹ ở nhà ở thực -> recovery
  };

  const result = calculateDiagnosticResult(recoveryAnswers);
  assert.equal(result.dominantStage.id, 'recovery');
  assert.equal(result.stageDistribution.recovery, 4);
  assert.ok(result.advice.includes('Phục hồi'));
});

test('calculateDiagnosticResult handles peak warnings correctly', () => {
  const peakAnswers = {
    1: 4, // Tốc độ đơn hàng chững lại -> peak
    2: 3, // Lãi suất tăng cao, siết room -> peak
    3: 4, // Thất nghiệp rất thấp nhưng dừng tuyển -> peak
    4: 3  // Giá neo cao nhưng không có giao dịch -> peak
  };

  const result = calculateDiagnosticResult(peakAnswers);
  assert.equal(result.dominantStage.id, 'peak');
  assert.equal(result.stageDistribution.peak, 4);
  assert.ok(result.advice.includes('Gần đỉnh') || result.advice.includes('phòng thủ'));
});
