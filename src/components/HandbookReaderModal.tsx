import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Download, 
  Printer, 
  Check, 
  Compass, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { HANDBOOK_PAGES, INDICATOR_GROUPS, STAGES_LIST } from '../utils/economicData.ts';
import { EconomicStageId } from '../types/index.ts';

interface HandbookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPage?: number;
}

export const HandbookReaderModal: React.FC<HandbookReaderModalProps> = ({
  isOpen,
  onClose,
  initialPage = 1,
}) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(initialPage);

  if (!isOpen) return null;

  const currentPage = HANDBOOK_PAGES.find((p) => p.pageNumber === currentPageNum) || HANDBOOK_PAGES[0];

  const handleNext = () => {
    if (currentPageNum < HANDBOOK_PAGES.length) {
      setCurrentPageNum(currentPageNum + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl h-[90vh] max-h-[850px] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label="Cẩm nang Đọc vị Nền kinh tế Reader"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-900 text-white text-xs font-bold">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                CẨM NANG ĐỌC VỊ NỀN KINH TẾ
              </h3>
              <p className="text-[11px] text-teal-800 font-medium">
                Nguyễn Nam BĐS · Bản đầy đủ 16 trang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer"
              title="In hoặc lưu PDF"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span className="hidden sm:inline">In / Lưu PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ đọc"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Reader Area with Sidebar & Page Canvas */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chapter Selector Navigation (Hidden on tiny screens) */}
          <div className="w-56 border-r border-slate-200 bg-slate-50/50 p-3 overflow-y-auto hidden md:block shrink-0">
            <p className="text-xs font-bold tracking-wide text-slate-500 mb-2 px-2">
              Mục lục 16 trang
            </p>
            <div className="space-y-0.5">
              {HANDBOOK_PAGES.map((page) => {
                const isActive = page.pageNumber === currentPageNum;
                return (
                  <button
                    key={page.pageNumber}
                    type="button"
                    onClick={() => setCurrentPageNum(page.pageNumber)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isActive 
                        ? 'bg-teal-900 text-white font-bold shadow-2xs' 
                        : 'text-slate-700 hover:bg-slate-200/60'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-[10px] opacity-75 mr-1.5">
                        {String(page.pageNumber).padStart(2, '0')}.
                      </span>
                      {page.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Page Display Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 bg-white">
            <div className="max-w-2xl mx-auto space-y-5 sm:space-y-6">
              
              {/* Mobile Quick Chapter Selector Dropdown */}
              <div className="md:hidden pb-3 border-b border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                  Chuyển trang:
                </span>
                <select
                  value={currentPageNum}
                  onChange={(e) => setCurrentPageNum(Number(e.target.value))}
                  className="flex-1 text-xs py-1.5 px-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-teal-700"
                >
                  {HANDBOOK_PAGES.map((p) => (
                    <option key={p.pageNumber} value={p.pageNumber}>
                      Trang {p.pageNumber}: {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Page Header */}
              <div className="border-b border-slate-100 pb-3 sm:pb-4 flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-teal-800">
                  Phân mục: {currentPage.category}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  TRANG {currentPage.pageNumber} / 16
                </span>
              </div>

              {/* Page Title */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  {currentPage.title}
                </h2>
                <p className="mt-2 text-sm sm:text-base font-semibold text-teal-900 bg-teal-50/70 border border-teal-200/60 p-3.5 rounded-xl">
                  {currentPage.summary}
                </p>
              </div>

              {/* Special View for Page 16: Complete Full Interactive Matrix Table! */}
              {currentPage.pageNumber === 16 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900 text-white">
                        <tr>
                          <th className="py-3 px-3 font-bold w-36">Chỉ báo</th>
                          {STAGES_LIST.map((st) => (
                            <th key={st.id} className="py-3 px-2 text-center">
                              {st.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[11px]">
                        {INDICATOR_GROUPS.map((ind) => (
                          <tr key={ind.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-slate-900 border-r border-slate-100">
                              {ind.name}
                            </td>
                            {(['trough', 'recovery', 'expansion', 'peak', 'contraction'] as EconomicStageId[]).map((sid) => (
                              <td key={sid} className="py-2.5 px-2 text-slate-700 border-r border-slate-100 leading-snug">
                                {ind.stagesData[sid]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Bảng tra cứu trang 16 được thiết kế độc quyền bởi Nguyễn Nam BĐS để hỗ trợ độc giả đánh giá nhanh vĩ mô mỗi quý.
                  </p>
                </div>
              ) : (
                /* Standard Page Content */
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                  {currentPage.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Optional Highlight Quote */}
              {currentPage.keyQuote && (
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 text-teal-950 italic text-base leading-relaxed">
                  “{currentPage.keyQuote}”
                </div>
              )}

              {/* Optional Callout */}
              {currentPage.callout && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs sm:text-sm text-amber-950 font-medium">
                  💡 {currentPage.callout}
                </div>
              )}

              {/* Bottom Navigation Hints */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Tài liệu chia sẻ miễn phí bởi Nguyễn Nam BĐS</span>
                <span>Bản quyền nội dung © 2026</span>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Pagination Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentPageNum === 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Trang trước</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-700">
            Trang {currentPageNum} / 16
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={currentPageNum === HANDBOOK_PAGES.length}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-teal-950 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer font-bold"
          >
            <span>Trang sau</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
