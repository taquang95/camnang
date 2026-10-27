import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

interface FinalCtaSectionProps {
  onFormSubmit: (data: { firstname: string; email: string }) => Promise<void> | void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onFormSubmit }) => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstname?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.email = 'Email không hợp lệ (ví dụ: email@gmail.com)';
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-[#072428] to-slate-950 py-20 lg:py-28 text-white">
      {/* Stylized Sine Curve Watermark in Background */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <path
            d="M 0 300 Q 300 0, 600 200 T 1200 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Kicker */}
        <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-teal-300 uppercase">
          <span>TÀI LIỆU CHIẾN LƯỢC CHO NHÀ ĐẦU TƯ BẤT ĐỘNG SẢN & TÀI SẢN</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance max-w-4xl mx-auto">
          Đừng cố đoán thị trường từ một vài bản tin.
          <span className="block mt-2 text-teal-300">
            Hãy học cách đọc cả bức tranh.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-teal-100/90 max-w-2xl mx-auto leading-relaxed text-balance">
          Nhận miễn phí <strong>Cẩm nang Đọc vị nền kinh tế</strong> và bảng tra cứu <strong>9 chỉ báo × 5 giai đoạn của chu kỳ</strong> biên soạn bởi Nguyễn Nam BĐS.
        </p>

        {/* Form Container */}
        <div className="mt-10 max-w-xl mx-auto rounded-2xl border border-teal-700/40 bg-teal-900/50 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="final-firstname" className="block text-xs font-semibold text-teal-200 mb-1">
                Họ và tên <span className="text-rose-400">*</span>
              </label>
              <input
                id="final-firstname"
                name="firstname"
                type="text"
                autoComplete="name"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                  if (errors.firstname) setErrors((prev) => ({ ...prev, firstname: undefined }));
                }}
                placeholder="Ví dụ: Nguyễn Văn A"
                className={`w-full rounded-lg border px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${
                  errors.firstname ? 'border-rose-400 ring-1 ring-rose-400' : 'border-teal-700/50'
                }`}
              />
              {errors.firstname && <p className="mt-1 text-xs text-rose-300">{errors.firstname}</p>}
            </div>

            <div>
              <label htmlFor="final-email" className="block text-xs font-semibold text-teal-200 mb-1">
                Email nhận tài liệu <span className="text-rose-400">*</span>
              </label>
              <input
                id="final-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                placeholder="Ví dụ: email@gmail.com"
                className={`w-full rounded-lg border px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all ${
                  errors.email ? 'border-rose-400 ring-1 ring-rose-400' : 'border-teal-700/50'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-rose-300">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-teal-950 hover:bg-teal-50 active:scale-[0.99] disabled:opacity-75 transition-all shadow-xl cursor-pointer"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-teal-950" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  ĐANG GỬI TÀI LIỆU...
                </span>
              ) : (
                <>
                  <span>GỬI CẨM NANG CHO TÔI →</span>
                </>
              )}
            </button>
          </form>

          {/* Micro assurances */}
          <div className="mt-4 pt-3 border-t border-teal-800/60 flex items-center justify-center gap-3 text-xs text-teal-200">
            <span>PDF miễn phí</span>
            <span>·</span>
            <span>16 trang nguyên bản</span>
            <span>·</span>
            <span>Gửi trực tiếp qua email</span>
          </div>
        </div>

      </div>
    </section>
  );
};
