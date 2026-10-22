import React, { useState } from 'react';
import { REAL_ESTATE_TRANSMISSION_DRIVERS } from '../utils/economicData.ts';
import { ArrowDown, CreditCard, Building, Wallet, TrendingUp, HelpCircle } from 'lucide-react';

interface RealEstateMacroSectionProps {
  onOpenLeadModal: () => void;
}

export const RealEstateMacroSection: React.FC<RealEstateMacroSectionProps> = ({ onOpenLeadModal }) => {
  const [selectedDriver, setSelectedDriver] = useState<string>('credit_interest');

  const getDriverIcon = (id: string) => {
    switch (id) {
      case 'credit_interest': return <CreditCard className="h-5 w-5" />;
      case 'supply_legal': return <Building className="h-5 w-5" />;
      case 'buyer_income': return <Wallet className="h-5 w-5" />;
      case 'investor_sentiment': return <TrendingUp className="h-5 w-5" />;
      default: return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <section id="ung-dung-bds" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2">
            Giải mã liên kết BĐS & Vĩ mô
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight text-balance">
            GDP tăng, giá nhà có nhất thiết phải tăng?
          </h2>
          <div className="mt-3 inline-block">
            <span className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight">
              Không.
            </span>
          </div>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed text-balance">
            Bất động sản không vận động đơn thuần theo chỉ số GDP danh nghĩa. Đây là tài sản có giá trị lớn, phụ thuộc nặng nề vào chi phí vốn và có nguồn cung điều chỉnh chậm, tạo ra sự lệch pha đặc thù.
          </p>
        </div>

        {/* Transmission Mechanism Diagram */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:p-10 shadow-xs mb-12 max-w-5xl mx-auto">
          
          {/* Top Level: Economy & Flow */}
          <div className="text-center max-w-md mx-auto mb-6">
            <div className="rounded-xl border border-slate-300 bg-white py-3 px-6 shadow-2xs font-bold text-slate-900 text-sm sm:text-base">
              NỀN KINH TẾ CHUNG (GDP, SẢN XUẤT, THƯƠNG MẠI)
            </div>
            
            <div className="flex flex-col items-center justify-center my-3">
              <span className="text-xs font-semibold text-slate-500 mb-1">
                Không tác động trực tiếp ngay lập tức
              </span>
              <ArrowDown className="h-5 w-5 text-teal-700 animate-bounce" />
            </div>

            <div className="text-xs sm:text-sm font-semibold text-teal-900 bg-teal-50 border border-teal-200/80 py-2 px-4 rounded-lg">
              Phải thông qua 4 VAN DẪN TRUYỀN sau:
            </div>
          </div>

          {/* 4 Transmission Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {REAL_ESTATE_TRANSMISSION_DRIVERS.map((driver) => {
              const isSelected = selectedDriver === driver.id;
              return (
                <div
                  key={driver.id}
                  onClick={() => setSelectedDriver(driver.id)}
                  className={`rounded-xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-teal-800 shadow-md ring-1 ring-teal-800/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-teal-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {getDriverIcon(driver.id)}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">VAN 0{driver.id === 'credit_interest' ? '1' : driver.id === 'supply_legal' ? '2' : driver.id === 'buyer_income' ? '3' : '4'}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {driver.title}
                    </h4>
                    <p className="text-[11px] font-medium text-teal-800 mt-0.5">
                      {driver.subtitle}
                    </p>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {driver.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-teal-950">
                    {driver.formula}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Destination: Real Estate Market */}
          <div className="mt-8 text-center max-w-md mx-auto">
            <div className="flex items-center justify-center my-3">
              <ArrowDown className="h-5 w-5 text-teal-700" />
            </div>
            <div className="rounded-xl border border-teal-900 bg-teal-950 py-3 px-6 text-white shadow-sm font-bold text-sm sm:text-base">
              THỊ TRƯỜNG BẤT ĐỘNG SẢN THỰC TẾ
              <span className="block text-xs font-normal text-teal-200 mt-0.5">
                (Phản ứng sớm hơn, muộn hơn hoặc lệch pha so với GDP)
              </span>
            </div>
          </div>

        </div>

        {/* Deep Dive Note From Page 14 */}
        <div className="max-w-3xl mx-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xs text-xs sm:text-sm text-slate-700 space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <HelpCircle className="h-4 w-4 text-teal-700 shrink-0" />
            <span>Tại sao sự phân tích này giúp anh/chị bảo vệ tài sản?</span>
          </div>
          <p className="leading-relaxed">
            Nếu chỉ nghe theo truyền thông rằng “GDP năm nay đạt 6.5% – 7% nên mua BĐS ngay”, anh/chị rất dễ rơi vào bẫy nghẽn thanh khoản nếu năm đó <strong>Room tín dụng bị siết</strong> hoặc <strong>Mặt bằng lãi suất vay lên đến 13-14%</strong>. 
          </p>
          <p className="leading-relaxed">
            Tài liệu của Nguyễn Nam BĐS nối thẳng chuỗi logic: <strong className="text-slate-900">Kinh tế → Tiền tệ → Tín dụng & Pháp lý → Thanh khoản BĐS</strong>. Nhờ đó, anh/chị nhìn thấy trước những khúc cua mà người khác không để ý.
          </p>
        </div>

      </div>
    </section>
  );
};
