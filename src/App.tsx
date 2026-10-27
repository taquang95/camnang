/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { PainPointsSection } from './components/PainPointsSection.tsx';
import { CycleMapSection } from './components/CycleMapSection.tsx';
import { FourPillarsSection } from './components/FourPillarsSection.tsx';
import { RealEstateMacroSection } from './components/RealEstateMacroSection.tsx';
import { RealEstateSignalsSection } from './components/RealEstateSignalsSection.tsx';
import { MatrixPreviewSection } from './components/MatrixPreviewSection.tsx';
import { AudienceSection } from './components/AudienceSection.tsx';
import { AuthorSection } from './components/AuthorSection.tsx';
import { InteractiveDiagnostic } from './components/InteractiveDiagnostic.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { FinalCtaSection } from './components/FinalCtaSection.tsx';
import { Footer } from './components/Footer.tsx';
import { LeadModal } from './components/LeadModal.tsx';
import { SuccessModal } from './components/SuccessModal.tsx';
import { HandbookReaderModal } from './components/HandbookReaderModal.tsx';
import { ThankYouPage } from './components/ThankYouPage.tsx';
import { EconomicStageId } from './types/index.ts';
import { BookOpen, ArrowRight } from 'lucide-react';
import { submitLeadToMautic } from './services/mautic.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'thank-you'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash.includes('cam-on') || path.startsWith('/cam-on')) {
        return 'thank-you';
      }
    }
    return 'home';
  });
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isReaderModalOpen, setIsReaderModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState<EconomicStageId>('recovery');
  const [leadData, setLeadData] = useState<{ firstname: string; email: string }>({
    firstname: '',
    email: ''
  });

  // Handle URL hash or path routing
  useEffect(() => {
    const handleHashOrPathChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash.includes('cam-on') || path.startsWith('/cam-on')) {
        setCurrentView('thank-you');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    handleHashOrPathChange();
    window.addEventListener('hashchange', handleHashOrPathChange);
    window.addEventListener('popstate', handleHashOrPathChange);
    return () => {
      window.removeEventListener('hashchange', handleHashOrPathChange);
      window.removeEventListener('popstate', handleHashOrPathChange);
    };
  }, []);

  const [isSubmittingGlobal, setIsSubmittingGlobal] = useState(false);

  const handleFormSubmit = async (data: { firstname: string; email: string }) => {
    if (isSubmittingGlobal) return;
    setIsSubmittingGlobal(true);

    try {
      setLeadData({ firstname: data.firstname, email: data.email });
      
      // Connect directly with Mautic CRM: crm.nambds.vn Form ID 21
      await submitLeadToMautic({
        firstname: data.firstname,
        email: data.email,
      });

      setIsLeadModalOpen(false);
      // Transition smoothly to Thank You page
      setCurrentView('thank-you');
      window.location.hash = '#/cam-on';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmittingGlobal(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.location.hash = '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCycleSection = () => {
    const el = document.getElementById('chu-ky');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on Thank You view, render dedicated Thank You page
  if (currentView === 'thank-you') {
    return (
      <>
        <ThankYouPage
          leadData={leadData}
          onBackToHome={handleBackToHome}
          onOpenReader={() => setIsReaderModalOpen(true)}
        />
        <HandbookReaderModal
          isOpen={isReaderModalOpen}
          onClose={() => setIsReaderModalOpen(false)}
        />
      </>
    );
  }

  // Default: Main Landing Page
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
        onOpenReaderModal={() => setIsReaderModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {/* 2. Hero Section */}
        <Hero
          onFormSubmit={handleFormSubmit}
          onSelectStage={(stageId) => {
            setSelectedStage(stageId);
            scrollToCycleSection();
          }}
        />

        {/* 3. Section 2: Nghịch lý thông tin (Pain points ticker & insights) */}
        <PainPointsSection onExploreClick={scrollToCycleSection} />

        {/* 4. Section 3: Bản đồ chu kỳ kinh tế 5 giai đoạn */}
        <CycleMapSection
          initialStage={selectedStage}
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* 5. Section 4: 4 Khối giá trị nhận được */}
        <FourPillarsSection
          onOpenReaderModal={() => setIsReaderModalOpen(true)}
          onOpenLeadModal={() => setIsLeadModalOpen(true)}
        />

        {/* 6. Section 5: GDP tăng, giá nhà có nhất thiết phải tăng? */}
        <RealEstateMacroSection onOpenLeadModal={() => setIsLeadModalOpen(true)} />

        {/* 7. Section 6: Muốn biết thị trường BĐS khỏe hay yếu, đừng chỉ nhìn giá */}
        <RealEstateSignalsSection onOpenLeadModal={() => setIsLeadModalOpen(true)} />

        {/* 8. Section 7: Bảng tra cứu ma trận Trang 16 Preview & Unlock */}
        <MatrixPreviewSection onUnlockClick={() => setIsLeadModalOpen(true)} />

        {/* 9. Section 8: Ai nên tải cuốn này? */}
        <AudienceSection />

        {/* 10. Section 9: Tác giả Nguyễn Nam BĐS */}
        <AuthorSection />

        {/* 11. Interactive Diagnostic Quiz (Test nhanh vị thế kinh tế) */}
        <InteractiveDiagnostic onOpenLeadModal={() => setIsLeadModalOpen(true)} />

        {/* 12. FAQ Section */}
        <FaqSection />

        {/* 13. Final CTA & Conversion Form */}
        <FinalCtaSection onFormSubmit={handleFormSubmit} />
      </main>

      {/* 14. Quiet Clean Footer */}
      <Footer
        onOpenReaderModal={() => setIsReaderModalOpen(true)}
        onOpenLeadModal={() => setIsLeadModalOpen(true)}
      />

      {/* Discreet Mobile Floating Action Strip (Respects 15% mobile viewport cap) */}
      <aside 
        aria-label="Khung nhận tài liệu nhanh"
        className="fixed bottom-0 inset-x-0 z-30 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] bg-white/95 backdrop-blur-md border-t border-slate-200 md:hidden flex items-center justify-between gap-3 shadow-lg"
      >
        <button
          type="button"
          onClick={() => setIsReaderModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5 text-teal-800" />
          <span>Đọc 16 trang</span>
        </button>

        <button
          type="button"
          onClick={() => setIsLeadModalOpen(true)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-teal-900 rounded-lg shadow-sm cursor-pointer"
        >
          <span>Nhận cẩm nang</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </aside>

      {/* Modals */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        onOpenReader={() => setIsReaderModalOpen(true)}
        leadData={leadData}
      />

      <HandbookReaderModal
        isOpen={isReaderModalOpen}
        onClose={() => setIsReaderModalOpen(false)}
      />

    </div>
  );
}
