import React from 'react';
import { ArrowUp, BookOpen, ShieldCheck } from 'lucide-react';
import { AUTHOR_AVATAR_URL } from '../utils/economicData.ts';

interface FooterProps {
  onOpenReaderModal: () => void;
  onOpenLeadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReaderModal, onOpenLeadModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-12 lg:py-16 text-slate-600 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={AUTHOR_AVATAR_URL}
                alt="Nguyễn Nam BĐS"
                className="h-8 w-8 rounded-full object-cover object-center ring-1 ring-slate-300 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-bold text-slate-950 tracking-tight">
                NGUYỄN NAM BĐS
              </span>
            </div>
            
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Cẩm nang Đọc vị Nền kinh tế — Tài liệu phân tích chu kỳ, giải mã 9 nhóm chỉ báo vĩ mô và liên kết thực tiễn đến thị trường bất động sản Việt Nam.
            </p>

            <div className="pt-2 text-xs text-slate-400">
              Biên soạn độc lập bởi Nguyễn Nam BĐS · Bản cập nhật 2026
            </div>
          </div>

          {/* Navigation Links Mirror (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3">
              DANH MỤC TRỌNG TÂM
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#chu-ky" className="hover:text-teal-900 transition-colors">
                  5 Giai đoạn chu kỳ kinh tế
                </a>
              </li>
              <li>
                <a href="#9-chi-bao" className="hover:text-teal-900 transition-colors">
                  9 Nhóm chỉ báo vĩ mô cốt lõi
                </a>
              </li>
              <li>
                <a href="#ung-dung-bds" className="hover:text-teal-900 transition-colors">
                  4 Kênh truyền dẫn vĩ mô đến BĐS
                </a>
              </li>
              <li>
                <a href="#bang-tra-cuu" className="hover:text-teal-900 transition-colors">
                  Bảng tra cứu ma trận Trang 16
                </a>
              </li>
              <li>
                <a href="#tac-gia" className="hover:text-teal-900 transition-colors">
                  Về tác giả Nguyễn Nam BĐS
                </a>
              </li>
            </ul>
          </div>

          {/* Actions & Reader Quick Link (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-3">
              TÀI LIỆU CẨM NANG
            </p>
            
            <button
              type="button"
              onClick={onOpenReaderModal}
              className="w-full text-left inline-flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-teal-50 hover:border-teal-200 transition-colors text-xs font-semibold text-slate-800 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-teal-700 shrink-0" />
              <span>Xem trực tuyến 16 trang</span>
            </button>

            <button
              type="button"
              onClick={onOpenLeadModal}
              className="w-full text-left inline-flex items-center gap-2 p-2.5 rounded-lg bg-teal-900 hover:bg-teal-950 transition-colors text-xs font-bold text-white cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-teal-300 shrink-0" />
              <span>Nhận file PDF qua Email</span>
            </button>
          </div>

        </div>

        {/* Legal Disclaimer & Bottom Line */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left text-[11px] leading-relaxed max-w-2xl">
            <strong>Tuyên bố miễn trừ trách nhiệm:</strong> Nội dung cẩm nang mang tính chất thông tin và nghiên cứu thị trường, không phải là lời khuyên đầu tư tài chính hay bảo đảm kết quả kinh doanh. Người đọc hoàn toàn chịu trách nhiệm cho các quyết định phân bổ vốn của mình.
          </p>

          <div className="flex items-center gap-4 shrink-0">
            <span>© 2026 Nguyễn Nam BĐS</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-950 font-medium transition-colors cursor-pointer"
              aria-label="Về đầu trang"
            >
              <span>Đầu trang</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
