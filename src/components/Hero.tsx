import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Sparkles, HelpCircle } from 'lucide-react';
import { ECONOMIC_STAGES, AUTHOR_AVATAR_URL } from '../utils/economicData.ts';
import { EconomicStageId } from '../types/index.ts';

interface HeroProps {
  onFormSubmit: (data: { firstname: string; email: string }) => Promise<void> | void;
  onSelectStage: (stageId: EconomicStageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onFormSubmit, onSelectStage }) => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstname?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeCyclePoint, setActiveCyclePoint] = useState<EconomicStageId>('recovery');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: { firstname?: string; email?: string } = {};

    if (!firstname.trim()) {
      newErrors.firstname = 'Vui lòng nhập họ và tên của anh/chị';
    }
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ (ví dụ: ten@gmail.com)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await onFormSubmit({ firstname, email });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePointClick = (stageId: EconomicStageId) => {
    setActiveCyclePoint(stageId);
    onSelectStage(stageId);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-12 lg:py-20 border-b border-slate-200/60">
      {/* Background architectural grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Copy & High-Intent Conversion Form (7 cols) */}
          <div className="lg:col-span-7">
            {/* Tag / Kicker (Unboxed text with quiet dot, strictly no pills) */}
            <div className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-800 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-700" aria-hidden="true" />
              <span>Tài liệu kinh tế miễn phí từ Nguyễn Nam BĐS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl leading-[1.15] text-balance">
              NỀN KINH TẾ
              <span className="block mt-1 bg-gradient-to-r from-teal-900 via-teal-800 to-teal-700 bg-clip-text text-transparent">
                ĐANG Ở ĐÂU TRONG CHU KỲ?
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl text-balance">
              Nhận miễn phí <strong className="font-semibold text-slate-900">Cẩm nang Đọc vị nền kinh tế</strong> – giúp anh/chị hiểu 5 giai đoạn của chu kỳ và biết cách đọc các tín hiệu như <span className="text-slate-800 font-medium">PMI, sản xuất, tiêu dùng, việc làm, lạm phát, lãi suất, tín dụng và bất động sản</span> theo một hệ thống chuẩn xác.
            </p>

            {/* 3 Core Benefit Markers: unboxed text with typographic separators */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                5 giai đoạn kinh tế
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                9 nhóm chỉ báo vĩ mô
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-teal-900">
                <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                Ứng dụng vào BĐS
              </span>
            </div>

            {/* Lead Capture Form */}
            <div className="mt-8 rounded-2xl border border-teal-900/10 bg-white p-6 sm:p-7 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-teal-950">
                  Nhận cẩm nang miễn phí qua Email
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Điền thông tin bên dưới để tải ngay file PDF 16 trang đầy đủ
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="hero-firstname" className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="hero-firstname"
                      name="firstname"
                      type="text"
                      autoComplete="name"
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                        if (errors.firstname) setErrors((prev) => ({ ...prev, firstname: undefined }));
                      }}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 transition-all ${
                        errors.firstname ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 bg-white hover:border-slate-400 focus:border-teal-700'
                      }`}
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-xs text-rose-600">{errors.firstname}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="hero-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Email nhận tài liệu <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="hero-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="Ví dụ: email@gmail.com"
                      className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700/20 transition-all ${
                        errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 bg-white hover:border-slate-400 focus:border-teal-700'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-teal-950 active:scale-[0.99] disabled:opacity-75 transition-all shadow-md shadow-teal-950/10 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Đang chuẩn bị tài liệu...
                    </span>
                  ) : (
                    <>
                      <span>GỬI CẨM NANG CHO TÔI</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3.5 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
                  Bảo mật thông tin 100% · Không spam
                </span>
                <span className="italic">PDF 16 trang chuẩn gửi trực tiếp qua email</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Handbook Mockup + Interactive Economic Wave (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The 3D Book Container */}
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Floating ambient glow behind handbook */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-teal-800/15 via-teal-600/10 to-transparent blur-2xl" />

              {/* Realistic 3D Book Cover Component */}
              <div className="relative rounded-2xl bg-gradient-to-br from-teal-950 via-[#0a292d] to-slate-950 p-6 text-white shadow-2xl border border-teal-800/30">
                {/* Book Spine Simulation Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-teal-950 via-teal-900 to-transparent rounded-l-2xl border-r border-teal-700/20" />

                <div className="relative pl-3">
                  {/* Top publication header */}
                  <div className="flex items-center justify-between border-b border-teal-800/40 pb-3 text-[11px] tracking-widest text-teal-300 font-mono">
                    <span>ECONOMIC RESEARCH</span>
                    <span>16 TRANG</span>
                  </div>

                  {/* Book Title Typography */}
                  <div className="my-6">
                    <p className="text-xs uppercase tracking-widest text-teal-400 font-medium mb-1">
                      Tài liệu chuyên sâu
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                      CẨM NANG
                      <span className="block text-teal-300 italic font-semibold text-2xl sm:text-3xl tracking-tight mt-0.5">
                        Đọc vị Nền kinh tế
                      </span>
                    </h2>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      Nhận diện chu kỳ, thấu hiểu dữ liệu và giải mã mối liên hệ với thị trường Bất động sản
                    </p>
                  </div>

                  {/* Stylized Sine Curve on the Book Cover with Interactive Hotspots */}
                  <div className="my-5 rounded-xl bg-teal-950/70 p-4 border border-teal-700/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-teal-300">
                        Đường cong chu kỳ 5 giai đoạn
                      </span>
                      <span className="text-[10px] text-teal-200/70">Nhấp để xem tín hiệu</span>
                    </div>

                    <div className="relative h-28 w-full">
                      {/* SVG Wave */}
                      <svg viewBox="0 0 400 120" className="h-full w-full overflow-visible">
                        {/* Guide reference grid */}
                        <line x1="0" y1="60" x2="400" y2="60" stroke="#0d9488" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                        
                        {/* Main Sine Curve */}
                        <path
                          d="M 10 95 C 60 95, 90 85, 120 60 C 160 25, 190 15, 230 18 C 280 22, 320 65, 380 100"
                          fill="none"
                          stroke="url(#wave-gradient)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="25%" stopColor="#2dd4bf" />
                            <stop offset="55%" stopColor="#34d399" />
                            <stop offset="75%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f87171" />
                          </linearGradient>
                        </defs>

                        {/* Node 1: Đáy */}
                        <g 
                          className="cursor-pointer group"
                          onClick={() => handlePointClick('trough')}
                        >
                          <circle cx="20" cy="95" r={activeCyclePoint === 'trough' ? 6 : 4.5} fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                          <text x="20" y="115" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="600">Đáy</text>
                        </g>

                        {/* Node 2: Phục hồi */}
                        <g 
                          className="cursor-pointer group"
                          onClick={() => handlePointClick('recovery')}
                        >
                          <circle cx="115" cy="62" r={activeCyclePoint === 'recovery' ? 6 : 4.5} fill="#2dd4bf" stroke="#ffffff" strokeWidth="2" />
                          <text x="115" y="50" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="600">Phục hồi</text>
                        </g>

                        {/* Node 3: Mở rộng */}
                        <g 
                          className="cursor-pointer group"
                          onClick={() => handlePointClick('expansion')}
                        >
                          <circle cx="195" cy="22" r={activeCyclePoint === 'expansion' ? 6 : 4.5} fill="#34d399" stroke="#ffffff" strokeWidth="2" />
                          <text x="195" y="12" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="600">Mở rộng</text>
                        </g>

                        {/* Node 4: Đỉnh */}
                        <g 
                          className="cursor-pointer group"
                          onClick={() => handlePointClick('peak')}
                        >
                          <circle cx="270" cy="30" r={activeCyclePoint === 'peak' ? 6 : 4.5} fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                          <text x="270" y="18" textAnchor="middle" fill="#fde047" fontSize="10" fontWeight="600">Gần đỉnh</text>
                        </g>

                        {/* Node 5: Thu hẹp */}
                        <g 
                          className="cursor-pointer group"
                          onClick={() => handlePointClick('contraction')}
                        >
                          <circle cx="370" cy="98" r={activeCyclePoint === 'contraction' ? 6 : 4.5} fill="#f87171" stroke="#ffffff" strokeWidth="2" />
                          <text x="370" y="115" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="600">Thu hẹp</text>
                        </g>
                      </svg>
                    </div>

                    {/* Interactive "CHÚNG TA ĐANG Ở ĐÂU?" Callout */}
                    <div className="mt-2 flex items-center justify-between rounded-lg bg-teal-900/80 px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-amber-300 shrink-0" />
                        <span className="font-semibold text-amber-200">
                          Đang chọn: {ECONOMIC_STAGES[activeCyclePoint].name}
                        </span>
                      </div>
                      <span className="text-[10px] text-teal-200/90 truncate max-w-[170px]">
                        {ECONOMIC_STAGES[activeCyclePoint].shortDesc}
                      </span>
                    </div>
                  </div>

                  {/* Author Branding on Mockup Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-teal-800/40 text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={AUTHOR_AVATAR_URL}
                        alt="Nguyễn Nam BĐS"
                        className="h-7 w-7 rounded-full object-cover object-center ring-1 ring-teal-400/40 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-semibold text-white leading-tight">NGUYỄN NAM BĐS</p>
                        <p className="text-[10px] text-teal-300">Phân tích chu kỳ & Cố vấn đầu tư</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 rounded bg-teal-800/80 text-[10px] font-semibold text-teal-200 tracking-wider">
                        BẢN ĐẦY ĐỦ 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom tag preview badge */}
              <div className="mt-4 text-center">
                <span className="text-xs text-slate-500">
                  Tài liệu độc quyền phân phối miễn phí cho cộng đồng nhà đầu tư
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
