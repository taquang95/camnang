import React, { useState } from 'react';
import { ArrowRight, BookOpen, Menu, X } from 'lucide-react';
import { AUTHOR_AVATAR_URL } from '../utils/economicData.ts';

interface NavbarProps {
  onOpenLeadModal: () => void;
  onOpenReaderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal, onOpenReaderModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#chu-ky', label: '5 Giai đoạn chu kỳ' },
    { href: '#9-chi-bao', label: '9 Nhóm chỉ báo' },
    { href: '#ung-dung-bds', label: 'BĐS & Kinh tế' },
    { href: '#bang-tra-cuu', label: 'Bảng tra cứu trang 16' },
    { href: '#tac-gia', label: 'Về tác giả' },
  ];

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark with brand avatar */}
        <a 
          href="#" 
          className="group flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-slate-900 transition-colors whitespace-nowrap shrink-0"
        >
          <img 
            src={AUTHOR_AVATAR_URL} 
            alt="Nguyễn Nam BĐS" 
            className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover object-center ring-2 ring-teal-800/20 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <span className="font-semibold text-slate-900 group-hover:text-teal-800 transition-colors">
            NGUYỄN NAM BĐS
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action on desktop + mobile menu hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenReaderModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-900 bg-teal-50 border border-teal-200/60 rounded-lg hover:bg-teal-100/70 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Xem trước nội dung 16 trang"
          >
            <BookOpen className="h-3.5 w-3.5 text-teal-700" />
            <span>Xem trước 16 trang</span>
          </button>
          
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-900 rounded-lg hover:bg-teal-950 active:scale-[0.99] transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            aria-label="Nhận cẩm nang miễn phí"
          >
            <span>Nhận cẩm nang</span>
            <ArrowRight className="h-3.5 w-3.5 text-teal-200" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-expanded={isMobileMenuOpen}
            aria-label="Mở danh mục điều hướng"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleMobileNavClick(link.href)}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-900 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenReaderModal();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-teal-900 bg-teal-50 border border-teal-200 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Xem trước bản PDF 16 trang</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
