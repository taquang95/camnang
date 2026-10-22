/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, BookOpen, Download } from 'lucide-react';
import { AUTHOR_AVATAR_URL } from '../utils/economicData.ts';

interface ThankYouPageProps {
  leadData: {
    firstname: string;
    email: string;
  };
  onBackToHome: () => void;
  onOpenReader: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  leadData,
  onBackToHome,
  onOpenReader,
}) => {
  const handleDownloadSummary = () => {
    const content = `CẨM NANG ĐỌC VỊ NỀN KINH TẾ - NGUYỄN NAM BĐS
Tài liệu gửi tới: ${leadData.firstname || 'Nhà đầu tư'} (${leadData.email || 'email@gmail.com'})

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
    <div className="min-h-screen flex flex-col bg-[#fafaf9] text-slate-900">
      {/* Top minimal bar with author branding */}
      <header className="border-b border-gray-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <img
              src={AUTHOR_AVATAR_URL}
              alt="Nguyễn Nam BĐS"
              className="h-9 w-9 rounded-full object-cover object-center ring-2 ring-teal-800/10"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-950 tracking-tight group-hover:text-teal-900 transition-colors">
                NGUYỄN NAM BĐS
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Cẩm nang Đọc vị Nền kinh tế
              </p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenReader}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-teal-50 border border-teal-200 px-3.5 py-2 text-xs font-bold text-teal-900 hover:bg-teal-100 transition-colors cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-teal-700" />
              <span>Đọc ngay 16 trang</span>
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Về trang chủ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main thank you content following exact requested layout */}
      <main className="flex-1 flex flex-col items-center py-6 md:py-10 px-4">
        <div className="max-w-7xl w-full text-center space-y-6 md:space-y-8">
          
          {/* Header Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-[#E11D48] tracking-tighter uppercase leading-none">
              ĐÃ GỬI EMAIL!
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-bold italic">
              Hãy làm theo hướng dẫn bên dưới
            </p>
            {leadData.email && (
              <div className="pt-2 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs sm:text-sm font-semibold text-rose-900">
                  <Mail className="h-4 w-4 text-[#E11D48]" />
                  <span>Hệ thống đã gửi tài liệu tới: <strong className="font-bold underline">{leadData.email}</strong></span>
                </span>
              </div>
            )}
          </div>

          {/* 3 Steps Cards Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
              
              {/* Step 1 */}
              <div className="flex flex-col group h-full">
                <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col">
                  <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                    <img
                      alt="Check Inbox"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      src="https://i.postimg.cc/GmP1Y4KN/Bu_o_c_1.png"
                    />
                  </div>
                  <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                    <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl">
                      Kiểm tra hộp thư <span className="text-[#E11D48]">Inbox (Chính)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col group h-full">
                <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col">
                  <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                    <img
                      alt="Check Promotions"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      src="https://i.postimg.cc/XYK0FrLt/Bu_o_c_2.png"
                    />
                  </div>
                  <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                    <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl">
                      Kiểm tra tab <span className="text-[#E11D48]">Thư rác (Spam)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 (Featured highlight) */}
              <div className="flex flex-col group h-full">
                <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col border-b-[8px] border-b-red-500">
                  <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                    <img
                      alt="Check Spam"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                      src="https://i.postimg.cc/wvh1tXMV/Bu-o-c_3-new.png"
                    />
                  </div>
                  <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                    <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl uppercase">
                      BẤM <span className="text-[#E11D48]">"NOT SPAM"</span> ĐỂ NHẬN TÀI LIỆU
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed instruction box */}
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="bg-white border border-blue-50 rounded-[2rem] shadow-lg overflow-hidden text-left">
              <div className="p-6 md:p-8 space-y-6">
                
                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
                    1
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed pt-1">
                    Kiểm tra hộp thư <span className="font-bold text-gray-900">Inbox (Hộp thư đến)</span> hoặc tab <span className="font-bold text-gray-900">Promotions (Quảng cáo)</span>.
                  </p>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
                    2
                  </div>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed pt-1">
                    Nếu không thấy, vui lòng kiểm tra mục <span className="font-bold text-gray-900">Spam (Thư rác)</span>.
                  </p>
                </div>

                <div className="h-px bg-gray-100 w-full" />

                <div className="flex items-start gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-[#F43F5E] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
                    3
                  </div>
                  <div className="space-y-2 pt-1">
                    <p className="text-[#F43F5E] font-black text-xl md:text-2xl uppercase tracking-tight">
                      QUAN TRỌNG:
                    </p>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                      Nếu mail nằm trong Spam, hãy bấm nút <span className="font-bold text-gray-900">"Report not spam"</span> để đảm bảo bạn nhận được tài liệu từ Nguyễn Nam.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <p className="text-gray-400 text-base md:text-lg italic font-bold">
              * Email tự động có thể mất 30s để đến hộp thư của bạn.
            </p>
          </div>

          {/* Quick Instant Reading Buttons */}
          <div className="max-w-md mx-auto pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenReader}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-900 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-teal-950 active:scale-[0.99] transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-teal-200" />
              <span>Đọc online 16 trang ngay</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadSummary}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Tải file tóm tắt nhanh</span>
            </button>
          </div>

          {/* Return link and Trust Badge */}
          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors font-bold text-xl cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Quay lại trang chính</span>
            </button>

            <div className="flex items-center gap-2 text-[12px] text-gray-300 font-bold uppercase tracking-[0.4em]">
              <ShieldCheck className="w-5 h-5 text-gray-400" />
              <span>BẢO MẬT & HỖ TRỢ 24/7</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
