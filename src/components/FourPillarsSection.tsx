import React, { useState } from 'react';
import { 
  Compass, 
  BarChart3, 
  ArrowRightLeft, 
  Building2, 
  Check, 
  ArrowRight,
  Clock,
  Activity,
  History
} from 'lucide-react';

interface FourPillarsSectionProps {
  onOpenReaderModal: () => void;
  onOpenLeadModal: () => void;
}

export const FourPillarsSection: React.FC<FourPillarsSectionProps> = ({ 
  onOpenReaderModal, 
  onOpenLeadModal 
}) => {
  const [activeTimingTab, setActiveTimingTab] = useState<'leading' | 'coincident' | 'lagging'>('leading');

  return (
    <section id="9-chi-bao" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Cấu trúc giá trị cẩm nang
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            16 trang nhưng anh/chị sẽ có một “bản đồ” để đọc kinh tế
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Không phải là giáo trình hàn lâm khô khan, toàn bộ nội dung được tinh gọn thành 4 khối kiến thức thực chiến mà bất kỳ nhà đầu tư nào cũng có thể áp dụng ngay.
          </p>
        </div>

        {/* 4 Value Blocks Grid (Asymmetric Bento layout with clean hairline borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
          
          {/* KHỐI 01 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                  KHỐI 01 · BẢN NGUYÊN
                </span>
                <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                  <Compass className="h-4 w-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                Hiểu 5 giai đoạn của chu kỳ kinh tế
              </h3>
              
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Biết cách phân biệt bản chất từng chặng đường mà nền kinh tế phải đi qua. Nhận biết khi nào thị trường đang ở vùng tạo nền và khi nào đang bước vào pha phân phối rủi ro cao.
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900 mb-2">Nắm rõ đặc điểm của:</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-700">
                  <span className="text-teal-900 font-bold">Đáy</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-teal-900 font-bold">Phục hồi</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-teal-900 font-bold">Mở rộng</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-teal-900 font-bold">Gần đỉnh</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-teal-900 font-bold">Thu hẹp</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 text-xs text-slate-500 italic">
              Chi tiết tại Trang 4 – 9 của cẩm nang
            </div>
          </div>

          {/* KHỐI 02 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                  KHỐI 02 · CÔNG CỤ
                </span>
                <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                  <BarChart3 className="h-4 w-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                Biết chỉ báo nào cần nhìn & cách lọc nhiễu
              </h3>
              
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Không cần theo dõi hàng trăm tin tức vụn vặt. Toàn bộ sức khỏe kinh tế được quy tụ vào 9 nhóm chỉ báo trọng yếu có tính liên kết chặt chẽ với nhau.
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900 mb-2">9 nhóm chỉ báo cốt lõi:</p>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-700">
                  <span>PMI / Đơn hàng</span>
                  <span>Sản xuất IIP</span>
                  <span>Bán lẻ tiêu dùng</span>
                  <span>GDP thực tế</span>
                  <span>Việc làm & Thất nghiệp</span>
                  <span>Thu nhập & Lương</span>
                  <span>Lạm phát CPI</span>
                  <span>Lãi suất điều hành</span>
                  <span>Tín dụng & M2</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 text-xs text-slate-500 italic">
              Chi tiết tại Trang 11 – 12 của cẩm nang
            </div>
          </div>

          {/* KHỐI 03: Interactive 3 Tiers of Timing */}
          <div className="rounded-2xl border border-teal-200/80 bg-white p-7 shadow-xs hover:border-teal-400 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                  KHỐI 03 · PHƯƠNG PHÁP LUẬN ĐỈNH CAO
                </span>
                <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                  <ArrowRightLeft className="h-4 w-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                Phân loại: Đi trước – Đồng thời – Đi sau
              </h3>
              
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Điểm khác biệt lớn nhất giữa một chuyên gia và người đọc tin thông thường: Biết đâu là tín hiệu cảnh báo sớm, đâu là thực trạng hiện hữu và đâu là con số đã muộn.
              </p>

              {/* Timing Tabs Selector */}
              <div className="mt-4 flex gap-1 p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTimingTab('leading')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    activeTimingTab === 'leading' ? 'bg-teal-900 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đi trước (Leading)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTimingTab('coincident')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    activeTimingTab === 'coincident' ? 'bg-teal-900 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đồng thời (Coincident)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTimingTab('lagging')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    activeTimingTab === 'lagging' ? 'bg-teal-900 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Đi sau (Lagging)
                </button>
              </div>

              {/* Dynamic Timing Content Box */}
              <div className="mt-3 rounded-lg bg-slate-50 p-3.5 border border-slate-200/80 text-xs">
                {activeTimingTab === 'leading' && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-teal-900 mb-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>ĐI TRƯỚC: Điều gì có thể sắp thay đổi?</span>
                    </div>
                    <p className="text-slate-600">
                      Gồm <strong>PMI đơn hàng mới, Lãi suất điều hành, Cung tiền M2</strong>. Giúp nhận biết điểm đảo chiều trước khi số đông nhận ra.
                    </p>
                    <p className="mt-1 text-slate-500 italic">
                      Lưu ý: Có thể báo sai trong ngắn hạn nếu có cú sốc bên ngoài.
                    </p>
                  </div>
                )}

                {activeTimingTab === 'coincident' && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-teal-900 mb-1">
                      <Activity className="h-3.5 w-3.5" />
                      <span>ĐỒNG THỜI: Kinh tế thực đang diễn ra thế nào?</span>
                    </div>
                    <p className="text-slate-600">
                      Gồm <strong>Sản xuất công nghiệp IIP, Tổng mức bán lẻ tiêu dùng</strong>. Phản ánh đúng nhiệt độ nền kinh tế tại thời điểm hiện tại.
                    </p>
                    <p className="mt-1 text-slate-500 italic">
                      Lưu ý: Thường công bố trễ khoảng 1 tháng so với thời gian thực.
                    </p>
                  </div>
                )}

                {activeTimingTab === 'lagging' && (
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-teal-900 mb-1">
                      <History className="h-3.5 w-3.5" />
                      <span>ĐI SAU: Hậu quả đang thể hiện ra sao?</span>
                    </div>
                    <p className="text-slate-600">
                      Gồm <strong>Tăng trưởng GDP, Tỷ lệ thất nghiệp, Lạm phát CPI</strong>. Là sự xác nhận kết quả của những gì đã vận hành từ quý trước.
                    </p>
                    <p className="mt-1 text-slate-500 italic">
                      Cảnh báo: Dùng chỉ báo đi sau để dự báo tương lai là bẫy lớn nhất!
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 text-xs text-slate-500 italic">
              Chi tiết tại Trang 10 của cẩm nang
            </div>
          </div>

          {/* KHỐI 04 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                  KHỐI 04 · THỰC CHIẾN
                </span>
                <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-800">
                  <Building2 className="h-4 w-4" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-950 tracking-tight">
                Ứng dụng vào thị trường Bất Động Sản
              </h3>
              
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Thương hiệu Nguyễn Nam BĐS đúc kết: BĐS là cuộc chơi của vốn và pháp lý. Học cách giải mã mối quan hệ giữa vĩ mô, lãi vay, độ trễ nguồn cung và thanh khoản thực.
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-900 mb-2">4 câu hỏi cốt lõi:</p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-teal-700" />
                    <span>Vì sao GDP tăng nhưng giá nhà chưa chắc tăng?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-teal-700" />
                    <span>Cách phân biệt giá rao bán ảo và giá giao dịch thực?</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-teal-700" />
                    <span>Độ trễ 2-5 năm của pháp lý ảnh hưởng nguồn cung ra sao?</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-3 text-xs text-slate-500 italic">
              Chi tiết tại Trang 13 – 15 của cẩm nang
            </div>
          </div>

        </div>

        {/* Action strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={onOpenReaderModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-teal-900 bg-white border border-teal-200 rounded-lg hover:bg-teal-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>Mở xem trước nội dung 16 trang</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={onOpenLeadModal}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-teal-900 rounded-lg hover:bg-teal-950 transition-colors shadow-xs cursor-pointer"
          >
            <span>Nhận trọn bộ cẩm nang PDF qua Email</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
