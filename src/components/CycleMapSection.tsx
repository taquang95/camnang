import React, { useState } from 'react';
import { ECONOMIC_STAGES, STAGES_LIST } from '../utils/economicData.ts';
import { EconomicStageId } from '../types/index.ts';
import { ArrowRight, CheckCircle2, AlertTriangle, Eye, ShieldAlert, Sparkles } from 'lucide-react';

interface CycleMapSectionProps {
  initialStage?: EconomicStageId;
  onOpenLeadModal: () => void;
}

export const CycleMapSection: React.FC<CycleMapSectionProps> = ({ initialStage = 'recovery', onOpenLeadModal }) => {
  const [activeStageId, setActiveStageId] = useState<EconomicStageId>(initialStage);
  const activeStage = ECONOMIC_STAGES[activeStageId];

  return (
    <section id="chu-ky" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Bản đồ cốt lõi từ cẩm nang
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Một nền kinh tế thường vận động qua 5 giai đoạn
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Hiểu đúng bản chất từng giai đoạn giúp anh/chị định vị vị thế tài sản, tránh tâm lý FOMO tại vùng đỉnh và vượt qua nỗi sợ hãi tê liệt tại vùng đáy.
          </p>
        </div>

        {/* 5-Stage Interactive Progression Tabs / Stepper (Zero-pill, clean structural segmented buttons) */}
        <div className="mb-8 sm:mb-10 grid grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-xl bg-slate-100 border border-slate-200">
          {STAGES_LIST.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`relative flex flex-col items-center justify-center py-2 sm:py-3 px-1 sm:px-2 rounded-lg text-center transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-teal-900 text-white shadow-sm' 
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
                aria-pressed={isActive}
              >
                <span className="text-[10px] font-mono font-medium opacity-75">
                  0{stage.order}
                </span>
                <span className="text-[11px] sm:text-sm font-bold tracking-tight mt-0.5 whitespace-nowrap">
                  {stage.name}
                </span>
                <span className="text-[10px] opacity-70 hidden md:block truncate max-w-full">
                  {stage.englishName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Deep Dive Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-10 shadow-xs mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Stage Left Summary (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 tracking-wider">
                  <span>GIAI ĐOẠN 0{activeStage.order} TRONG CHU KỲ</span>
                  <span>·</span>
                  <span className="uppercase">{activeStage.englishName}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
                  {activeStage.name}
                </h3>
                <p className="text-sm sm:text-base font-medium text-teal-900 mt-2 bg-teal-50 border border-teal-200/60 p-3 rounded-lg">
                  {activeStage.shortDesc}
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {activeStage.fullDesc}
                </p>
              </div>

              {/* Key Macro Signals List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-700" />
                  Dấu hiệu nhận biết điển hình:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {activeStage.keySignals.map((sig: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-700 mt-2 shrink-0" />
                      <span>{sig}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stage Right: Traps, Market Sentiment & Real Estate Impact (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Market Sentiment Box */}
              <div className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xs">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Tâm lý số đông thị trường
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {activeStage.marketSentiment}
                </p>
              </div>

              {/* Common Mental Trap */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4.5">
                <div className="flex items-center gap-2 text-amber-900 text-xs font-bold mb-1">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Bẫy tâm lý phổ biến cần tránh</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  {activeStage.commonTrap}
                </p>
              </div>

              {/* Real Estate Reaction */}
              <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4.5">
                <div className="flex items-center gap-2 text-teal-950 text-xs font-bold mb-1">
                  <Sparkles className="h-4 w-4 text-teal-700 shrink-0" />
                  <span>Thị trường Bất Động Sản phản ứng ra sao?</span>
                </div>
                <p className="text-xs sm:text-sm text-teal-950 leading-relaxed">
                  {activeStage.bdsReaction}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* 5-Stage Comparative Summary Matrix Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Bảng so sánh 5 giai đoạn chu kỳ vận động
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tóm tắt trích xuất trực tiếp từ Phần 2 của Cẩm nang Đọc vị Nền kinh tế
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/75 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-semibold w-32">Giai đoạn</th>
                  <th className="py-3 px-4 font-semibold">Điều thường xảy ra</th>
                  <th className="py-3 px-4 font-semibold w-48 hidden sm:table-cell">Tâm lý đám đông</th>
                  <th className="py-3 px-4 font-semibold w-44 text-right">Hành động khuyến nghị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {STAGES_LIST.map((stage) => (
                  <tr 
                    key={stage.id} 
                    className={`hover:bg-teal-50/40 transition-colors ${stage.id === activeStageId ? 'bg-teal-50/70 font-medium' : ''}`}
                    onClick={() => setActiveStageId(stage.id)}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-950 whitespace-nowrap">
                      {stage.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      {stage.shortDesc}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 hidden sm:table-cell">
                      {stage.marketSentiment}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveStageId(stage.id);
                        }}
                        className="text-xs font-semibold text-teal-800 hover:text-teal-950 underline underline-offset-2 cursor-pointer"
                      >
                        Chi tiết tín hiệu →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section Key Conclusion Statement */}
        <div className="mt-12 rounded-2xl bg-teal-950 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <p className="text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-teal-100">
              “Vấn đề không phải là đoán chính xác ngày đỉnh hay đáy. Quan trọng là nhận ra nền kinh tế đang thay đổi theo hướng nào.”
            </p>
            <p className="text-xs text-teal-300">
              Khi anh/chị nhận diện được hướng dịch chuyển của dòng tiền, mọi quyết định mua, bán hay giữ tiền đều có cơ sở khoa học vững vàng.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenLeadModal}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-teal-950 hover:bg-teal-50 transition-colors cursor-pointer shadow-sm"
              >
                <span>Nhận cẩm nang để xem trọn bộ phân tích</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
