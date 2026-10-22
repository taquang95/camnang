import React from 'react';
import { Home, Newspaper, Search, Coins, Check } from 'lucide-react';

export const AudienceSection: React.FC = () => {
  const audiences = [
    {
      icon: <Home className="h-6 w-6 text-teal-800" />,
      title: 'Người đầu tư Bất Động Sản',
      focus: 'Muốn hiểu dòng vốn & chu kỳ trước khi xuống tiền',
      description: 'Không muốn bị cuốn vào cơn sốt ảo hay cắt lỗ oan tại đáy. Cần một công cụ để thẩm định thanh khoản, lãi vay và độ trễ nguồn cung của từng phân khúc.',
      benefits: ['Biết khi nào nên dùng đòn bẩy', 'Nhận diện điểm nghẽn thanh khoản']
    },
    {
      icon: <Newspaper className="h-6 w-6 text-teal-800" />,
      title: 'Người thường xuyên đọc tin tức',
      focus: 'Mệt mỏi vì mỗi ngày nghe một thông tin trái chiều',
      description: 'Hôm nay nghe GDP tăng, ngày mai nghe doanh nghiệp đóng cửa; tuần này hạ lãi suất, tuần sau siết tín dụng. Cần một bộ khung để ghép các mảnh tin tức thành bức tranh logic.',
      benefits: ['Lọc sạch tin tức giật gân', 'Hiểu bản chất thay vì nhìn hiện tượng']
    },
    {
      icon: <Search className="h-6 w-6 text-teal-800" />,
      title: 'Người muốn tự đọc thị trường',
      focus: 'Không muốn phụ thuộc vào lời khuyên của người khác',
      description: 'Thay vì phó mặc tài sản cho nhận định chủ quan của môi giới hay "chuyên gia mạng", bạn có năng lực độc lập đọc dữ liệu PMI, IIP, tín dụng và lạm phát.',
      benefits: ['Tự tin ra quyết định tài chính', 'Chủ động quản trị rủi ro danh mục']
    },
    {
      icon: <Coins className="h-6 w-6 text-teal-800" />,
      title: 'Người đang tích lũy tài sản',
      focus: 'Hiểu sự liên hệ giữa lãi suất, việc làm & tiêu dùng',
      description: 'Dù bạn gửi tiết kiệm, đầu tư chứng khoán, mua vàng hay tích lũy mua căn nhà đầu tiên, việc hiểu chu kỳ tiền tệ là chìa khóa bảo vệ sức mua đồng tiền.',
      benefits: ['Bảo toàn giá trị tài sản', 'Chọn đúng thời điểm chuyển dịch vốn']
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Đối tượng phù hợp
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Ai nên đọc cẩm nang này?
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Cuốn tài liệu này được thiết kế không phải để biến bạn thành nhà kinh tế học lý thuyết, mà giúp bạn trở thành một người quan sát thị trường tỉnh táo.
          </p>
        </div>

        {/* 4 Persona Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 mb-4">
                  {aud.icon}
                </div>

                <h3 className="text-base font-bold text-slate-950">
                  {aud.title}
                </h3>
                
                <p className="text-xs font-semibold text-teal-900 mt-1">
                  {aud.focus}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {aud.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                {aud.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <Check className="h-3.5 w-3.5 text-teal-700 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
