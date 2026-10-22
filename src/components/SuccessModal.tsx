import React from 'react';
import { CheckCircle2, BookOpen, Download, Mail, ArrowRight, X, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReader: () => void;
  leadData: {
    firstname: string;
    email: string;
  };
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  onOpenReader,
  leadData
}) => {
  if (!isOpen) return null;

  const handleDownloadSummary = () => {
    // Generate text/markdown executive summary file
    const content = `CẨM NANG ĐỌC VỊ NỀN KINH TẾ - NGUYỄN NAM BĐS
Tóm tắt chiến lược cho: ${leadData.firstname} (${leadData.email})

1. BẢN ĐỒ 5 GIAI ĐOẠN CHU KỲ:
- Đáy: Ngừng suy giảm, tin xấu tràn ngập, thanh khoản đóng băng.
- Phục hồi: Đơn hàng mới & PMI > 50, sản xuất IIP tăng trưởng dương.
- Mở rộng: GDP bùng nổ, việc làm dồi dào, thu nhập tăng, chi tiêu bán lẻ mạnh.
- Gần đỉnh: GDP vẫn đẹp nhưng lãi suất tăng, room tín dụng bị siết, đơn hàng chững lại.
- Thu hẹp: Làn sóng sa thải, doanh thu bán lẻ giảm, nợ xấu tăng, tiền mặt là vua.

2. BẢNG 9 NHÓM CHỈ BÁO VĨ MÔ CỐT LÕI (TRANG 16):
- Đi trước (Leading): Đơn hàng PMI, Lãi suất điều hành, Cung tiền M2 & Tín dụng.
- Đồng thời (Coincident): Sản xuất công nghiệp IIP, Tổng mức bán lẻ tiêu dùng.
- Đi sau (Lagging): Tăng trưởng GDP, Việc làm & Thất nghiệp, Thu nhập, Lạm phát CPI.

3. NGUYÊN LÝ BẤT ĐỘNG SẢN:
- GDP tăng, giá nhà KHÔNG nhất thiết tăng.
- BĐS chịu chi phối bởi 4 van: Tín dụng & Lãi suất, Nguồn cung & Pháp lý, Thu nhập người mua, Kỳ vọng nhà đầu tư.
- Giá chào bán đứng yên không có nghĩa thanh khoản không đổi!

Tác giả: Nguyễn Nam BĐS
Trân trọng cảm ơn anh/chị đã quan tâm và đồng hành!`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tom_Tat_Doc_Vi_Nen_Kinh_Te_Nguyen_Nam.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-teal-200 text-center"
        role="dialog"
        aria-modal="true"
        aria-label="Đăng ký thành công"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-teal-800 shadow-xs mb-4">
          <CheckCircle2 className="h-8 w-8 text-teal-700" />
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
          Gửi tài liệu thành công!
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Cảm ơn anh/chị <strong className="text-slate-900">{leadData.firstname}</strong>. Cẩm nang bản PDF 16 trang đã được gửi tới hòm thư:
        </p>

        <div className="my-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-teal-50 border border-teal-200/80 text-xs sm:text-sm font-mono font-bold text-teal-950">
          <Mail className="h-4 w-4 text-teal-700" />
          <span>{leadData.email}</span>
        </div>

        {/* Mautic Form ID 21 & Automation Tag Information */}
        <div className="text-[11px] text-slate-500 mb-6 flex flex-col items-center gap-1">
          <span>Đã đồng bộ CRM Mautic (<strong className="text-teal-900">crm.nambds.vn</strong> · Form ID <strong className="text-teal-900">21</strong>)</span>
          <span>Tag chiến dịch: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono font-semibold">DA_NHAN_QUA_DOC_VI_KINH_TE</code></span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenReader();
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:bg-teal-950 active:scale-[0.99] transition-all shadow-md cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-teal-200" />
            <span>ĐỌC NGAY BẢN ĐẦY ĐỦ (16 TRANG)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSummary}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Tải bản tóm tắt nhanh ma trận 9 chỉ báo</span>
          </button>
        </div>

        {/* Pro-Tip Box */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs text-slate-600">
          <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-teal-700" />
            Gợi ý từ tác giả Nguyễn Nam:
          </p>
          <p>
            Anh/chị nên đọc ngay <strong>Trang 10</strong> (Phân loại chỉ báo Đi trước – Đồng thời – Đi sau) và <strong>Trang 16</strong> (Bảng tra cứu ma trận 9 chỉ báo) để có ngay cái nhìn tổng quát nhất!
          </p>
        </div>
      </div>
    </div>
  );
};
