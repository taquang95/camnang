import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Tài liệu này có thực sự miễn phí 100% không?',
      a: 'Hoàn toàn miễn phí 100%. Đây là tài liệu phi thương mại do Nguyễn Nam BĐS biên soạn và chia sẻ nhằm giúp cộng đồng nhà đầu tư nâng cao năng lực đọc dữ liệu vĩ mô và quản trị rủi ro tài sản.'
    },
    {
      q: 'Tôi không có chuyên môn kinh tế hay tài chính thì có hiểu được không?',
      a: 'Có. Toàn bộ 16 trang của cẩm nang được viết bằng ngôn ngữ thực chiến, trực diện, không lạm dụng công thức toán học hay thuật ngữ hàn lâm. Mọi khái niệm đều được gắn với ví dụ đời thực (như tiền lương, lãi vay mua nhà, giá vật liệu).'
    },
    {
      q: 'Cuốn này khác gì so với cuốn “8 bước mua nhà thế chấp” của Nguyễn Nam BĐS?',
      a: 'Cuốn “8 bước mua nhà thế chấp” tập trung vào kỹ thuật giao dịch an toàn để không bị mất tiền hay vướng pháp lý. Trong khi đó, “Cẩm nang Đọc vị Nền kinh tế” là công cụ chiến lược giúp anh/chị nhận diện bức tranh vĩ mô lớn: Khi nào dòng tiền rẻ? Khi nào chu kỳ tín dụng đảo chiều? và khi nào thị trường BĐS thực sự ấm lên.'
    },
    {
      q: 'Tôi sẽ nhận tài liệu bằng cách nào và mất bao lâu?',
      a: 'Ngay sau khi anh/chị nhập Tên và Email vào form, hệ thống sẽ tự động kích hoạt đường link xem trực tiếp bản chuẩn 16 trang trên trình duyệt và đồng thời gửi file PDF gốc vào hòm thư email của anh/chị trong vòng 30 giây.'
    },
    {
      q: 'Tài liệu có đưa ra dự báo chính xác đỉnh hay đáy của thị trường không?',
      a: 'Không. Tác giả Nguyễn Nam khẳng định ngay từ đầu: Đây là công cụ quan sát chu kỳ và quản trị rủi ro, không phải quả cầu pha lê dự báo hay khuyến nghị giao dịch. Vấn đề không phải là đoán trúng ngày mai tăng hay giảm, mà là hiểu nền kinh tế đang dịch chuyển theo hướng nào để chuẩn bị tâm thế và tài chính vững vàng.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIdx(openIdx === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Giải đáp thắc mắc
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Những câu hỏi thường gặp
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-teal-900 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
