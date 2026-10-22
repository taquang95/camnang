import React, { useState } from 'react';
import { 
  DIAGNOSTIC_QUESTIONS, 
  calculateDiagnosticResult 
} from '../utils/economicData.ts';
import { 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  Compass, 
  Sparkles,
  BarChart2
} from 'lucide-react';

interface InteractiveDiagnosticProps {
  onOpenLeadModal: () => void;
}

export const InteractiveDiagnostic: React.FC<InteractiveDiagnosticProps> = ({ onOpenLeadModal }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 2, // Default preset to show interactive state
    2: 1,
    3: 2,
    4: 1
  });

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleReset = () => {
    setAnswers({ 1: 0, 2: 0, 3: 0, 4: 0 });
  };

  const result = calculateDiagnosticResult(answers);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Công cụ tương tác thực nghiệm
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Test nhanh: Các tín hiệu bạn quan sát phản ánh điều gì?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Chọn 4 trạng thái vĩ mô mà bạn đang cảm nhận rõ nhất hiện nay để công cụ tự động đối chiếu với ma trận chu kỳ 5 giai đoạn:
          </p>
        </div>

        {/* The Diagnostic Engine Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          
          <div className="space-y-8">
            {DIAGNOSTIC_QUESTIONS.map((q, qIndex) => {
              const selectedIdx = answers[q.id];
              return (
                <div key={q.id} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start gap-2.5 mb-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-900 text-white text-[11px] font-bold shrink-0 mt-0.5">
                      {qIndex + 1}
                    </span>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {q.question}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {q.hint}
                      </p>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 mt-3 pl-7">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isChosen
                              ? 'border-teal-800 bg-teal-50/80 text-teal-950 font-semibold shadow-2xs ring-1 ring-teal-800/20'
                              : 'border-slate-200 bg-slate-50/40 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isChosen ? 'border-teal-800 bg-teal-900 text-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChosen && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Diagnostic Result Banner */}
          <div className="mt-8 rounded-xl border border-teal-200 bg-gradient-to-br from-teal-950 via-[#0a292d] to-slate-950 p-6 text-white shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-teal-300" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    KẾT QUẢ ĐỐI CHIẾU SƠ BỘ
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-xl sm:text-2xl font-black text-white">
                    Giai đoạn nghiêng về:
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-300 tracking-tight">
                    {result.dominantStage.name} ({result.dominantStage.englishName})
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-teal-100/90 max-w-2xl leading-relaxed">
                  {result.advice}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-200 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Chọn lại</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenLeadModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-teal-950 text-xs sm:text-sm font-bold uppercase tracking-wide transition-all shadow-sm cursor-pointer"
                >
                  <span>MỞ KHÓA BẢN ĐỒ 9 CHỈ BÁO</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
