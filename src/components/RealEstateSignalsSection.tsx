import React from 'react';
import { REAL_ESTATE_HEALTH_PILLARS } from '../utils/economicData.ts';
import { ArrowRight, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface RealEstateSignalsSectionProps {
  onOpenLeadModal: () => void;
}

export const RealEstateSignalsSection: React.FC<RealEstateSignalsSectionProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Nguyên lý thẩm định thị trường thực chiến (Trang 15)
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Muốn biết thị trường BĐS khỏe hay yếu, đừng chỉ nhìn giá
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Giá niêm yết chỉ là ý chí chủ quan của người bán. Muốn biết sức khỏe thật của thị trường, một nhà đầu tư thông minh luôn kiểm tra đồng thời 4 thước đo:
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {REAL_ESTATE_HEALTH_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black font-mono text-teal-800/80">
                    {pillar.number}
                  </span>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                    THƯỚC ĐO
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  {pillar.title}
                </h3>
                <p className="text-sm font-semibold text-teal-900 mt-1">
                  {pillar.question}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.explanation}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50/70 p-3 rounded-lg border border-rose-100">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-snug">{pillar.redFlag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlighted Executive Box */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-teal-950 via-teal-900 to-slate-950 p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono font-bold tracking-widest text-teal-300 uppercase">
                LUẬT BẤT THÀNH VĂN TRÊN THỊ TRƯỜNG ĐỊA ỐC
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                “Giá chào bán đứng yên không có nghĩa thanh khoản không đổi.”
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/80 max-w-xl">
                Nhiều thị trường rơi vào trạng thái đóng băng cả năm trời mà giá bảng hiệu không hạ. Nếu không biết đọc thanh khoản và tín dụng, anh/chị sẽ nhầm tưởng thị trường vẫn đang rất khỏe.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenLeadModal}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-950 hover:bg-teal-50 active:scale-[0.99] transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>NHẬN CẨM NANG ĐỂ XEM ĐẦY ĐỦ</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
