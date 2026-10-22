import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, BookOpen, CheckCircle2 } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { firstname: string; email: string }) => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ firstname?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { firstname?: string; email?: string } = {};

    if (!firstname.trim()) newErrors.firstname = 'Vui lòng nhập họ và tên của anh/chị';
    if (!email.trim()) newErrors.email = 'Vui lòng nhập địa chỉ email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ (ví dụ: email@gmail.com)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({ firstname, email });
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label="Đăng ký nhận cẩm nang"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-900 text-white text-sm font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950">
              Nhận Cẩm nang Đọc vị Nền kinh tế
            </h3>
            <p className="text-xs text-teal-800 font-medium">
              Bản PDF 16 trang chuẩn + Bảng tra cứu chu kỳ kinh tế
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div>
            <label htmlFor="modal-firstname" className="block text-xs font-semibold text-slate-700 mb-1">
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              id="modal-firstname"
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
                errors.firstname ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 hover:border-slate-400 focus:border-teal-700'
              }`}
            />
            {errors.firstname && <p className="mt-1 text-xs text-rose-600">{errors.firstname}</p>}
          </div>

          <div>
            <label htmlFor="modal-email" className="block text-xs font-semibold text-slate-700 mb-1">
              Email nhận tài liệu <span className="text-rose-500">*</span>
            </label>
            <input
              id="modal-email"
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
                errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300 hover:border-slate-400 focus:border-teal-700'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-teal-900 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-teal-950 active:scale-[0.99] disabled:opacity-75 transition-all shadow-md cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                ĐANG GỬI TÀI LIỆU...
              </span>
            ) : (
              <>
                <span>GỬI CẨM NANG CHO TÔI</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
            Bảo mật thông tin tuyệt đối
          </span>
          <span className="italic">PDF gửi trực tiếp qua email</span>
        </div>
      </div>
    </div>
  );
};
