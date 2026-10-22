import React from 'react';
import { ArrowRight, HelpCircle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface PainPointsSectionProps {
  onExploreClick: () => void;
}

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ onExploreClick }) => {
  const signalCards = [
    { label: 'GDP', value: '↑', text: 'Tăng trưởng', trend: 'up', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { label: 'Lãi suất', value: '↓', text: 'Hạ nhiệt', trend: 'down', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    { label: 'Tín dụng', value: '↑', text: 'Mở room', trend: 'up', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    { label: 'PMI', value: '↓', text: 'Dưới 50', trend: 'down', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { label: 'Giá nhà', value: '↑', text: 'Neo cao', trend: 'up', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { label: 'Thanh khoản', value: '↓', text: 'Đóng băng', trend: 'down', color: 'text-slate-700 bg-slate-100 border-slate-300' },
    { label: 'CPI', value: '↑', text: 'Áp lực', trend: 'up', color: 'text-orange-700 bg-orange-50 border-orange-200' },
  ];

  const paradoxPoints = [
    {
      statement: 'GDP tăng chưa chắc giá nhà tăng.',
      detail: 'GDP đo lường tổng sản lượng và có thể được kéo bởi khu vực FDI, trong khi thị trường nội địa và sức mua thực tế của người dân vẫn trầm lắng.'
    },
    {
      statement: 'Lãi suất giảm chưa chắc kinh tế đã phục hồi.',
      detail: 'Lãi suất rẻ chỉ là điều kiện cần. Nếu ngân hàng sợ nợ xấu không dám giải ngân hoặc doanh nghiệp không có đơn hàng thì dòng tiền vẫn nghẽn lại trong kho bạc.'
    },
    {
      statement: 'Chứng khoán tăng chưa chắc kinh tế thực đã khỏe.',
      detail: 'Thị trường tài chính thường phản ứng theo kỳ vọng và thanh khoản dư thừa, trong khi các doanh nghiệp sản xuất bên dưới vẫn đang chật vật tồn tại.'
    },
    {
      statement: 'Giá BĐS chưa giảm cũng chưa chắc thị trường đang khỏe.',
      detail: 'Giá chào bán niêm yết có thể đứng yên do tâm lý găm hàng của chủ sở hữu, nhưng nếu không có giao dịch thực tế thì thanh khoản đã chết lâm sàng.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Nghịch lý thông tin mỗi ngày
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            Mỗi ngày anh/chị đều nghe những con số này…
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Báo chí và mạng xã hội ngập tràn các chỉ số vĩ mô trái chiều khiến nhà đầu tư dễ rơi vào trạng thái nhiễu loạn thông tin.
          </p>
        </div>

        {/* Ticker / Signals Grid (Clean cards with clear typography, no pill slop) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {signalCards.map((card, idx) => (
            <div 
              key={idx}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border ${card.color} shadow-2xs transition-transform hover:-translate-y-0.5`}
            >
              <span className="text-xs font-semibold text-slate-700">{card.label}</span>
              <div className="flex items-center gap-1 my-1">
                <span className="text-2xl font-black tabular-nums">{card.value}</span>
                {card.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 shrink-0 opacity-80" />
                ) : (
                  <TrendingDown className="h-4 w-4 shrink-0 opacity-80" />
                )}
              </div>
              <span className="text-[11px] font-medium text-slate-600">{card.text}</span>
            </div>
          ))}
        </div>

        {/* The Central Question & Deep Paradox Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              Nhưng chúng đang kể câu chuyện gì?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg mx-auto">
              Nhìn vào một vài tin tức đơn lẻ rất dễ đưa ra quyết định sai lầm. Tài liệu chỉ ra 4 sự thật cốt lõi:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paradoxPoints.map((item, index) => (
              <div 
                key={index}
                className="relative rounded-xl border border-slate-100 bg-slate-50/60 p-5 hover:border-teal-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-900 text-white text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.statement}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insight Quote & CTA */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-semibold text-teal-950">
                “Một vài con số đơn lẻ không đủ để kết luận nền kinh tế đang ở giai đoạn nào.”
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Trích dẫn từ trang 3 — Cẩm nang Đọc vị Nền kinh tế
              </p>
            </div>

            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-900 hover:text-teal-700 transition-colors shrink-0 group cursor-pointer"
            >
              <span>Tôi muốn hiểu các tín hiệu này</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
