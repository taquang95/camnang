export type EconomicStageId = 'trough' | 'recovery' | 'expansion' | 'peak' | 'contraction';

export interface EconomicStage {
  id: EconomicStageId;
  name: string;
  englishName: string;
  order: number;
  shortDesc: string;
  fullDesc: string;
  marketSentiment: string;
  keySignals: string[];
  commonTrap: string;
  bdsReaction: string;
}

export type IndicatorTiming = 'leading' | 'coincident' | 'lagging';

export interface IndicatorGroup {
  id: string;
  name: string;
  shortCode: string;
  timing: IndicatorTiming;
  timingLabel: string;
  description: string;
  whatItMeasures: string;
  cautionNote: string;
  stagesData: Record<EconomicStageId, string>;
}

export interface HandbookPage {
  pageNumber: number;
  title: string;
  category: string;
  summary: string;
  content: string[];
  keyQuote?: string;
  callout?: string;
}

export interface LeadSubmission {
  firstname: string;
  email: string;
  submittedAt: string;
}
