import React, { useState } from 'react';
import { INDICATOR_GROUPS, STAGES_LIST } from '../utils/economicData.ts';
import { EconomicStageId } from '../types/index.ts';
import { Lock, Eye, Download, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface MatrixPreviewSectionProps {
  onUnlockClick: () => void;
}

export const MatrixPreviewSection: React.FC<MatrixPreviewSectionProps> = ({ onUnlockClick }) => {
  const [filterTiming, setFilterTiming] = useState<'all' | 'leading' | 'coincident' | 'lagging'>('all');

  const filteredIndicators = INDICATOR_GROUPS.filter((item) => {
    if (filterTiming === 'all') return true;
    return item.timing === filterTiming;
  });

  return (
    <section id="bang-tra-cuu" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Vũ khí tra cứu quan trọng nhất (Trang 16)
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Tặng kèm bảng tra cứu: “Nền kinh tế đang ở đâu?”
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Ma trận đối chiếu toàn diện <strong>9 nhóm chỉ báo vĩ mô × 5 giai đoạn chu kỳ</strong>. Chỉ cần mở bảng này ra mỗi quý, anh/chị sẽ ngay lập tức định vị được vị thế thị trường mà không cần nghe ngóng chuyên gia.
          </p>

          {/* Interactive Filter Controls (Zero-pill segmented buttons) */}
          <div className="mt-6 inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setFilterTiming('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                filterTiming === 'all' ? 'bg-white text-slate-950 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Tất cả 9 chỉ báo
            </button>
            <button
              type="button"
              onClick={() => setFilterTiming('leading')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                filterTiming === 'leading' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Chỉ báo Đi trước (3)
            </button>
            <button
              type="button"
              onClick={() => setFilterTiming('coincident')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                filterTiming === 'coincident' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Chỉ báo Đồng thời (2)
            </button>
            <button
              type="button"
              onClick={() => setFilterTiming('lagging')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                filterTiming === 'lagging' ? 'bg-white text-teal-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Chỉ báo Đi sau (4)
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scroll Hint */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-xs text-teal-900 bg-teal-50 border border-teal-200/60 py-1.5 px-3 rounded-lg mb-4 mx-auto w-fit font-medium">
          <span>👉 Vuốt ngang bảng để xem đủ 5 giai đoạn</span>
        </div>

        {/* Matrix Container with Preview Lock / Blur Overlay */}
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-4 font-bold uppercase tracking-wider w-48 sticky left-0 bg-slate-900 z-10 border-r border-slate-800">
                    Nhóm chỉ báo
                  </th>
                  {STAGES_LIST.map((stage) => (
                    <th key={stage.id} className="py-4 px-3 font-bold uppercase tracking-wider text-center border-r border-slate-800 last:border-r-0">
                      <span className="block text-teal-300 font-mono text-[10px]">0{stage.order}</span>
                      <span className="text-white text-xs">{stage.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredIndicators.map((item, index) => {
                  const isVisibleRow = index < 3; // First 3 rows visible, rest semi-blurred
                  return (
                    <tr 
                      key={item.id} 
                      className={`transition-colors ${isVisibleRow ? 'hover:bg-teal-50/30' : 'opacity-40 filter blur-[1.5px] select-none'}`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-950 sticky left-0 bg-white z-10 border-r border-slate-200">
                        <div>
                          <span>{item.name}</span>
                          <span className="block text-[10px] text-teal-700 font-medium">
                            {item.timingLabel}
                          </span>
                        </div>
                      </td>

                      {(['trough', 'recovery', 'expansion', 'peak', 'contraction'] as EconomicStageId[]).map((stageId) => (
                        <td key={stageId} className="py-3.5 px-3 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
                          {isVisibleRow ? (
                            item.stagesData[stageId]
                          ) : (
                            <span className="text-slate-400 text-[11px]">Dữ liệu chi tiết tại trang 16...</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Frosted Glass Overlay Over Lower Half */}
          <div className="absolute inset-x-0 bottom-0 top-36 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col items-center justify-end pb-10 px-4 text-center pointer-events-none">
            <div className="pointer-events-auto max-w-md rounded-2xl border border-teal-200 bg-white/95 p-6 shadow-xl backdrop-blur-md">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-teal-900 text-white shadow-sm mb-3">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-950">
                Mở khóa toàn bộ Bảng tra cứu 16 trang
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Bao gồm đầy đủ 9 nhóm chỉ báo, các mốc tham chiếu định lượng và bảng kiểm tra tín hiệu vĩ mô hàng quý.
              </p>

              <button
                type="button"
                onClick={onUnlockClick}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-900 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:bg-teal-950 active:scale-[0.99] transition-all shadow-md cursor-pointer"
              >
                <span>MỞ KHÓA BẢNG TRA CỨU MIỄN PHÍ</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-2 text-[11px] text-slate-400">
                Nhận tức thì qua email · Đọc trực tuyến hoặc tải file PDF
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
