import React from 'react';
import { Award, BookOpen, ShieldCheck, CheckCircle2, TrendingUp, Compass } from 'lucide-react';
import { AUTHOR_AVATAR_URL } from '../utils/economicData.ts';

export const AuthorSection: React.FC = () => {
  return (
    <section id="tac-gia" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-teal-50/30 p-8 sm:p-12 lg:p-16 shadow-xs max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Author Portrait & Visual Badge (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Outer Ring */}
                <div className="h-48 w-48 sm:h-56 sm:w-56 rounded-full p-2 bg-gradient-to-tr from-teal-900 via-teal-700 to-teal-400 shadow-xl">
                  {/* Real Author Portrait */}
                  <div className="h-full w-full rounded-full overflow-hidden border-2 border-white shadow-inner bg-slate-900 relative">
                    <img
                      src={AUTHOR_AVATAR_URL}
                      alt="Chân dung Nguyễn Nam BĐS"
                      className="h-full w-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Verified Consultant Badge */}
                <div className="absolute -bottom-2 right-4 flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-bold text-teal-950 shadow-md border border-teal-200">
                  <ShieldCheck className="h-4 w-4 text-teal-700" />
                  <span>Cố vấn thực chiến</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  NGUYỄN NAM BĐS
                </h3>
                <p className="text-xs sm:text-sm font-medium text-teal-900 mt-0.5">
                  Tác giả & Nhà nghiên cứu thị trường Bất động sản
                </p>
              </div>
            </div>

            {/* Author Biography & Philosophy (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  TÔN CHỈ VÀ TRIẾT LÝ NGHIÊN CỨU
                </span>
                <blockquote className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  “Nam không cố dự báo chính xác đỉnh – đáy của thị trường. Mục tiêu của những tài liệu này là giúp anh/chị hiểu dữ liệu, hiểu chu kỳ và có thêm cơ sở trước mỗi quyết định tài chính – bất động sản.”
                </blockquote>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Trong suốt hơn 8 năm quan sát và tư vấn giao dịch bất động sản thực tế, Nam nhận thấy phần lớn tổn thất của nhà đầu tư không đến từ việc họ chọn sai căn nhà, mà đến từ việc họ <strong>xuống tiền sai thời điểm của chu kỳ nợ và tín dụng</strong>.
                </p>
                <p>
                  Nhiều người mua đúng lúc ngân hàng bắt đầu siết room, hoặc bán tháo ngay tại vùng đáy khi lãi suất đã hạ nhiệt chỉ vì quá hoang mang trước tin tức tiêu cực.
                </p>
                <p>
                  Cuốn <strong className="text-slate-900">“Cẩm nang Đọc vị Nền kinh tế”</strong> được Nam đúc kết không mang tính lý thuyết sách giáo khoa, mà chuyển hóa toàn bộ dữ liệu vĩ mô thành các bảng kiểm tra thực tế, dễ hiểu, giúp anh/chị nhìn thấu chuyển động của dòng tiền.
                </p>
              </div>

              {/* 3 Trust Signals */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-teal-700 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Tư duy hệ thống</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-700 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Dữ liệu độc lập</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-teal-700 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800">Miễn phí 100%</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
