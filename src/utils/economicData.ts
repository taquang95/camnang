import { EconomicStage, EconomicStageId, IndicatorGroup, HandbookPage } from '../types/index.ts';

export type { EconomicStageId };

export const AUTHOR_AVATAR_URL = 'https://i.postimg.cc/j5nWg8jz/anh-dai-dien.jpg';

export const ECONOMIC_STAGES: Record<EconomicStageId, EconomicStage> = {
  trough: {
    id: 'trough',
    name: 'Đáy',
    englishName: 'Trough',
    order: 1,
    shortDesc: 'Kinh tế ngừng suy giảm nhưng cảm nhận của số đông vẫn tiêu cực',
    fullDesc: 'Tại vùng đáy, đà rơi tự do của các chỉ số vĩ mô đã chững lại. Một số tín hiệu đi trước (như đơn hàng mới, lợi suất trái phiếu) bắt đầu tạo nền. Tuy nhiên, tin tức truyền thông vẫn tràn ngập sự ảm đạm, tỷ lệ nợ xấu tăng cao và niềm tin người tiêu dùng ở mức thấp nhất.',
    marketSentiment: 'Sợ hãi cực độ, bi quan bao trùm, thanh khoản đóng băng',
    keySignals: [
      'Đơn đặt hàng ngừng giảm thêm và bắt đầu đi ngang',
      'Lãi suất đã được hạ xuống mức thấp kỷ lục bởi Ngân hàng Trung ương',
      'Tín dụng tăng trưởng rất chậm do ngân hàng thận trọng và người vay sợ hãi',
      'Thất nghiệp ở mức cao, tiêu dùng cắt giảm tối đa',
      'BĐS xuất hiện nhiều tài sản phát mãi, cắt lỗ sâu nhưng ít người dám mua'
    ],
    commonTrap: 'Chờ đợi khi mọi tin tức tốt lành xuất hiện mới hành động. Thực tế, khi tin tức trên báo tốt lên thì giá tài sản đã rời xa vùng đáy.',
    bdsReaction: 'Giao dịch trầm lắng, giá chào bán đi ngang hoặc giảm cục bộ ở phân khúc đầu cơ. BĐS dòng tiền thật bắt đầu được gom bởi dòng tiền thông minh.'
  },
  recovery: {
    id: 'recovery',
    name: 'Phục hồi',
    englishName: 'Recovery',
    order: 2,
    shortDesc: 'Đơn hàng, sản xuất, việc làm và tiêu dùng bắt đầu cải thiện',
    fullDesc: 'Lãi suất thấp phát huy tác dụng thẩm thấu vào nền kinh tế thực. Các doanh nghiệp bắt đầu có đơn hàng mới, chỉ số PMI vượt ngưỡng 50 điểm. Việc làm bắt đầu ổn định trở lại, dù tiền lương chưa tăng mạnh.',
    marketSentiment: 'Nghi ngờ, e dè; phần lớn đám đông cho rằng chỉ là cú nảy kỹ thuật',
    keySignals: [
      'PMI tăng trên 50 điểm, số lượng đơn hàng xuất khẩu & nội địa nhích lên',
      'Sản xuất công nghiệp IIP tăng trưởng dương trở lại',
      'Tín dụng bắt đầu ấm lên ở khối sản xuất và thương mại',
      'Tỷ lệ thất nghiệp ngừng tăng và bắt đầu giảm nhẹ',
      'Lạm phát vẫn ở mức thấp, thanh khoản hệ thống ngân hàng dồi dào'
    ],
    commonTrap: 'Nhầm lẫn giữa chứng khoán tăng và kinh tế thực đã khỏe. Lãi suất rẻ có thể kích thích giá tài sản trước khi lợi nhuận doanh nghiệp thực sự tạo ra.',
    bdsReaction: 'Thanh khoản tăng ở phân khúc nhu cầu ở thực (chung cư, nhà phố trung tâm). Phân khúc đất nền vùng ven vẫn chưa có sóng lớn.'
  },
  expansion: {
    id: 'expansion',
    name: 'Mở rộng',
    englishName: 'Expansion',
    order: 3,
    shortDesc: 'Sản xuất, việc làm, thu nhập, đầu tư cùng tăng trưởng mạnh',
    fullDesc: 'Giai đoạn hưng thịnh của chu kỳ. GDP tăng tốc ấn tượng, doanh nghiệp mở rộng nhà máy, tuyển dụng mạnh mẽ. Tiền lương tăng kích thích chi tiêu bán lẻ bùng nổ. Tín dụng mở rộng cho cả tiêu dùng và đầu tư.',
    marketSentiment: 'Lạc quan, tự tin, khẩu vị rủi ro tăng cao trên mọi thị trường',
    keySignals: [
      'GDP tăng trưởng cao vượt mức tiềm năng',
      'Tỷ lệ thất nghiệp ở mức rất thấp, khan hiếm lao động cục bộ',
      'Bán lẻ và tiêu dùng dịch vụ tăng trưởng hai con số',
      'Doanh nghiệp vay vốn tối đa công suất để mở rộng',
      'Lạm phát bắt đầu nhen nhóm tăng do áp lực tổng cầu và giá nguyên liệu'
    ],
    commonTrap: 'Tin rằng sự tăng trưởng này sẽ kéo dài mãi mãi. Quên chuẩn bị cho giai đoạn thắt chặt chính sách khi lạm phát vượt trần.',
    bdsReaction: 'Thị trường sôi động toàn diện. Giá tăng trên diện rộng từ trung tâm ra vùng ven. Tín dụng BĐS giải ngân ồ ạt, đòn bẩy tài chính phổ biến.'
  },
  peak: {
    id: 'peak',
    name: 'Gần đỉnh',
    englishName: 'Late Cycle / Peak',
    order: 4,
    shortDesc: 'Số liệu vẫn đẹp nhưng một số động lực cốt lõi bắt đầu suy yếu',
    fullDesc: 'Bề ngoài nền kinh tế vẫn rất rực rỡ với các báo cáo GDP kỷ lục và lợi nhuận khủng. Tuy nhiên, lạm phát đã vượt ngưỡng mục tiêu, buộc Ngân hàng Trung ương phải tăng lãi suất và siết trần tín dụng. Chi phí vốn đắt đỏ bắt đầu bào mòn biên lợi nhuận.',
    marketSentiment: 'Hưng phấn tột độ xen lẫn hoài nghi; tâm lý FOMO chi phối các nhà đầu tư cá nhân',
    keySignals: [
      'Lãi suất điều hành tăng liên tục để chống lạm phát',
      'Tín dụng bị siết lại, room cho vay bất động sản và chứng khoán bị khóa',
      'Đơn đặt hàng mới bắt đầu suy giảm dù sản lượng hiện tại vẫn cao (do trả đơn cũ)',
      'Lợi suất trái phiếu đảo ngược hoặc tăng dựng đứng',
      'Giá tài sản neo ở mức không tưởng so với thu nhập thực tế'
    ],
    commonTrap: 'Nhìn vào báo cáo GDP và lợi nhuận quá khứ (chỉ báo đi sau) để đưa ra quyết định mà bỏ qua sự đảo chiều của lãi suất và tín dụng (chỉ báo đi trước).',
    bdsReaction: 'Giá chào bán vẫn neo cao ngất ngưởng nhưng thanh khoản thực sụt giảm nghiêm trọng. Xuất hiện tình trạng nghẽn vốn, khó thoát hàng.'
  },
  contraction: {
    id: 'contraction',
    name: 'Thu hẹp',
    englishName: 'Contraction',
    order: 5,
    shortDesc: 'Sự suy yếu lan rộng sang sản xuất, thu nhập, tiêu dùng và việc làm',
    fullDesc: 'Hệ quả tất yếu sau chu kỳ thắt chặt tiền tệ. Doanh nghiệp cắt giảm lao động, thu hẹp quy mô hoặc phá sản. Thu nhập người dân sụt giảm kéo theo tổng mức bán lẻ lao dốc. Tín dụng tăng trưởng âm hoặc đình trệ do nợ xấu gia tăng.',
    marketSentiment: 'Lo lắng, thất vọng, co cụm phòng thủ, ưu tiên giữ tiền mặt',
    keySignals: [
      'PMI rơi sâu dưới 50 điểm trong nhiều tháng liên tiếp',
      'GDP tăng trưởng âm hoặc suy giảm tốc độ mạnh mẽ',
      'Làn sóng sa thải nhân sự lan rộng trên nhiều ngành',
      'Nợ xấu ngân hàng tăng nhanh, tài sản bảo đảm bị phong tỏa',
      'Tiêu dùng đóng băng, người dân chỉ chi tiêu cho các nhu cầu thiết yếu'
    ],
    commonTrap: 'Bán tháo tài sản tốt ở mức giá rẻ mạt khi chu kỳ thắt chặt đã đi gần đến hồi kết.',
    bdsReaction: 'Áp lực trả nợ lãi vay đè nặng. Nhiều nhà đầu tư dùng đòn bẩy cao phải bán tháo tài sản. Giá thứ cấp giảm mạnh, thị trường sơ cấp vắng bóng người mua.'
  }
};

export const STAGES_LIST: EconomicStage[] = [
  ECONOMIC_STAGES.trough,
  ECONOMIC_STAGES.recovery,
  ECONOMIC_STAGES.expansion,
  ECONOMIC_STAGES.peak,
  ECONOMIC_STAGES.contraction,
];

// 9 Macro Indicators Matrix (Page 16 of Handbook)
export const INDICATOR_GROUPS: IndicatorGroup[] = [
  {
    id: 'orders_pmi',
    name: 'Đơn hàng mới & PMI',
    shortCode: 'PMI / Orders',
    timing: 'leading',
    timingLabel: 'Chỉ báo đi trước',
    description: 'Chỉ số nhà quản trị mua hàng phản ánh kỳ vọng sản xuất và đơn hàng tương lai.',
    whatItMeasures: 'Sức khỏe đơn hàng sản xuất và ý định mở rộng kinh doanh trong 3-6 tháng tới.',
    cautionNote: 'Có thể tạo tín hiệu giả nếu chịu ảnh hưởng bởi yếu tố mùa vụ hoặc gián đoạn chuỗi cung ứng ngắn hạn.',
    stagesData: {
      trough: 'Ngừng giảm thêm, bắt đầu đi ngang ở vùng thấp (46-48 điểm)',
      recovery: 'Vượt ngưỡng 50 điểm, đơn hàng mới xuất hiện trở lại',
      expansion: 'Duy trì ở mức cao bền vững (52-56 điểm), đơn đặt hàng dồi dào',
      peak: 'Bắt đầu có dấu hiệu chững lại và đảo chiều giảm dù vẫn >50',
      contraction: 'Rơi thẳng xuống dưới 50 điểm, đơn hàng mới sụt giảm mạnh'
    }
  },
  {
    id: 'production_iip',
    name: 'Sản xuất công nghiệp (IIP)',
    shortCode: 'IIP',
    timing: 'coincident',
    timingLabel: 'Chỉ báo đồng thời',
    description: 'Đo lường khối lượng sản phẩm vật chất thực tế được nhà máy sản xuất ra trong kỳ.',
    whatItMeasures: 'Mức độ vận hành công suất thực tế của nền kinh tế tại thời điểm hiện tại.',
    cautionNote: 'Bị trễ 1 tháng so với thực tế và chịu biến động lịch nghỉ lễ.',
    stagesData: {
      trough: 'Tăng trưởng âm hoặc chạm đáy đi ngang',
      recovery: 'Tăng trưởng dương trở lại ở các ngành xuất khẩu và hàng thiết yếu',
      expansion: 'Tăng tốc mạnh mẽ, công suất nhà máy hoạt động gần 100%',
      peak: 'Duy trì ở mức rất cao nhờ xử lý nốt các đơn hàng cũ tồn đọng',
      contraction: 'Cắt giảm ca kíp, sản lượng giảm nhanh chóng'
    }
  },
  {
    id: 'retail_consumption',
    name: 'Bán lẻ & Tiêu dùng cá nhân',
    shortCode: 'Retail / CPI',
    timing: 'coincident',
    timingLabel: 'Chỉ báo đồng thời',
    description: 'Tổng mức bán lẻ hàng hóa và doanh thu dịch vụ tiêu dùng.',
    whatItMeasures: 'Sức mua thực tế từ túi tiền của đại chúng.',
    cautionNote: 'Cần loại trừ yếu tố tăng giá (lạm phát) để tính ra sức mua thực tế.',
    stagesData: {
      trough: 'Tăng trưởng yếu ớt, người dân chỉ mua hàng thiết yếu cơ bản',
      recovery: 'Nhích nhẹ trở lại nhưng người tiêu dùng vẫn rất nhạy cảm về giá',
      expansion: 'Tăng trưởng bùng nổ, chi tiêu mạnh tay cho dịch vụ, du lịch, xa xỉ',
      peak: 'Tăng trưởng chậm lại do giá cả leo thang bào mòn thu nhập khả dụng',
      contraction: 'Sụt giảm nghiêm trọng, người tiêu dùng thắt chặt chi tiêu tối đa'
    }
  },
  {
    id: 'gdp_growth',
    name: 'Tăng trưởng GDP thực tế',
    shortCode: 'Real GDP',
    timing: 'lagging',
    timingLabel: 'Chỉ báo đi sau',
    description: 'Tổng sản phẩm quốc nội tổng hợp toàn bộ giá trị gia tăng tạo ra trong quý.',
    whatItMeasures: 'Quy mô tổng thể nền kinh tế đã vận hành trong 3 tháng qua.',
    cautionNote: 'Được công bố chậm theo quý, thường chỉ xác nhận những gì đã xảy ra.',
    stagesData: {
      trough: 'Chạm đáy chu kỳ, tốc độ tăng trưởng thấp nhất trong nhiều năm',
      recovery: 'Bắt đầu tăng tốc nhẹ từ mức nền thấp của quý trước',
      expansion: 'Đạt đỉnh cao độ, vượt mục tiêu kế hoạch của chính phủ',
      peak: 'Vẫn báo cáo con số rất đẹp do quán tính của các quý trước',
      contraction: 'Tăng trưởng chậm lại rõ rệt hoặc suy thoái kỹ thuật'
    }
  },
  {
    id: 'employment_job',
    name: 'Việc làm & Thất nghiệp',
    shortCode: 'Jobs / Unemployment',
    timing: 'lagging',
    timingLabel: 'Chỉ báo đi sau',
    description: 'Tỷ lệ người có việc làm, tỷ lệ thất nghiệp và nhu cầu tuyển dụng.',
    whatItMeasures: 'Mức độ hấp thụ nhân lực của thị trường doanh nghiệp.',
    cautionNote: 'Doanh nghiệp thường sa thải sau khi doanh thu đã giảm và tuyển dụng sau khi đơn hàng đã tăng ổn định.',
    stagesData: {
      trough: 'Tỷ lệ thất nghiệp ở mức đỉnh, tuyển dụng đóng băng',
      recovery: 'Thất nghiệp ngừng tăng, bắt đầu tuyển dụng lại nhân sự chủ chốt',
      expansion: 'Tỷ lệ việc làm cao kỷ lục, cạnh tranh thu hút nhân tài gay gắt',
      peak: 'Thất nghiệp chạm đáy tuyệt đối, lương danh nghĩa bị đẩy lên cao',
      contraction: 'Làn sóng cắt giảm nhân sự, đóng cửa chi nhánh diễn ra trên diện rộng'
    }
  },
  {
    id: 'income_wages',
    name: 'Thu nhập & Tiền lương thực tế',
    shortCode: 'Wages',
    timing: 'lagging',
    timingLabel: 'Chỉ báo đi sau',
    description: 'Mức tăng trưởng thu nhập bình quân của người lao động sau khi trừ lạm phát.',
    whatItMeasures: 'Sức chịu đựng tài chính và khả năng tích lũy của hộ gia đình.',
    cautionNote: 'Tăng lương thường có độ trễ lớn so với chu kỳ lạm phát.',
    stagesData: {
      trough: 'Thu nhập suy giảm, lương thưởng bị cắt giảm hoặc đóng băng',
      recovery: 'Ổn định trở lại, giờ làm thêm bắt đầu xuất hiện',
      expansion: 'Tăng trưởng tốt cả về lương cơ bản lẫn thưởng doanh số',
      peak: 'Chi phí lương tăng cao gây áp lực lên lợi nhuận doanh nghiệp',
      contraction: 'Cắt giảm thưởng, giảm giờ làm, nợ lương xảy ra ở nhiều nơi'
    }
  },
  {
    id: 'inflation_cpi',
    name: 'Lạm phát (CPI)',
    shortCode: 'CPI / Inflation',
    timing: 'lagging',
    timingLabel: 'Chỉ báo đi sau',
    description: 'Chỉ số giá tiêu dùng đo lường mức độ biến động giá của rổ hàng hóa đại diện.',
    whatItMeasures: 'Áp lực chi phí sinh hoạt và sức ép lên chính sách tiền tệ.',
    cautionNote: 'Lạm phát thấp không có nghĩa kinh tế khỏe, có thể là dấu hiệu giảm phát/suy yếu tổng cầu.',
    stagesData: {
      trough: 'Rất thấp hoặc có nguy cơ giảm phát do tổng cầu kiệt quệ',
      recovery: 'Bắt đầu ấm dần lên trong biên độ kiểm soát an toàn (2-3%)',
      expansion: 'Tăng đều đặn theo sự phục hồi của sức cầu tiêu dùng và đầu tư',
      peak: 'Vượt trần mục tiêu kiểm soát, gây áp lực tăng lãi suất khẩn cấp',
      contraction: 'Duy trì ở mức cao giai đoạn đầu, sau đó hạ nhiệt dần khi sức mua tắt'
    }
  },
  {
    id: 'interest_rates',
    name: 'Lãi suất điều hành & Lợi suất TPCP',
    shortCode: 'Interest Rates',
    timing: 'leading',
    timingLabel: 'Chỉ báo đi trước',
    description: 'Chi phí vốn của toàn bộ nền kinh tế do Ngân hàng Nhà nước ấn định.',
    whatItMeasures: 'Định hướng chính sách thắt chặt hay nới lỏng dòng tiền.',
    cautionNote: 'Lãi suất thấp không tự động tạo ra phục hồi nếu kênh truyền dẫn tín dụng bị nghẽn.',
    stagesData: {
      trough: 'Duy trì ở mức thấp kỷ lục để kích thích nền kinh tế',
      recovery: 'Tiếp tục giữ ở mức thấp và hỗ trợ thanh khoản hệ thống',
      expansion: 'Bắt đầu được điều chỉnh nhích nhẹ để phòng ngừa bong bóng tài sản',
      peak: 'Tăng mạnh mẽ liên tục, chính sách tiền tệ đảo chiều sang thắt chặt gắt gao',
      contraction: 'Neo cao ở đỉnh đợt đầu, sau đó buộc phải hạ dần khi kinh tế suy kiệt'
    }
  },
  {
    id: 'credit_m2',
    name: 'Tín dụng & Cung tiền M2',
    shortCode: 'Credit / M2',
    timing: 'leading',
    timingLabel: 'Chỉ báo đi trước',
    description: 'Tốc độ bơm tiền vào nền kinh tế và khả năng tiếp cận vốn vay ngân hàng.',
    whatItMeasures: 'Nhiên liệu vận hành toàn bộ hoạt động đầu tư và thanh khoản tài sản.',
    cautionNote: 'Tín dụng tăng nhưng chạy vào đầu cơ phi sản xuất sẽ tạo rủi ro nợ xấu lớn.',
    stagesData: {
      trough: 'Tăng trưởng rất thấp, ngân hàng thừa thanh khoản nhưng sợ nợ xấu',
      recovery: 'Bắt đầu tăng trưởng trở lại ở các hạn mức vay sản xuất kinh doanh',
      expansion: 'Bùng nổ mạnh mẽ, dòng vốn chảy sang cả tiêu dùng và bất động sản',
      peak: 'Bị siết trần chỉ tiêu (room tín dụng), kiểm soát gắt gao các lĩnh vực rủi ro',
      contraction: 'Tăng trưởng tín dụng đình trệ, nợ xấu tăng cao, thu hồi nợ ráo riết'
    }
  }
];

// Real Estate 4 Transmission Drivers (Page 14)
export const REAL_ESTATE_TRANSMISSION_DRIVERS = [
  {
    id: 'credit_interest',
    title: 'Tín dụng & Lãi suất',
    subtitle: 'Nhiên liệu và chi phí đòn bẩy',
    desc: 'BĐS là tài sản giá trị lớn, phụ thuộc rất nặng vào vốn vay. Khi lãi suất rẻ và room tín dụng mở, dòng tiền lập tức tìm đến BĐS. Ngược lại, khi lãi suất tăng, chi phí cơ hội và gánh nặng trả nợ sẽ bóp nghẹt thanh khoản.',
    formula: 'Lãi suất ↓ & Tín dụng mở → Dòng tiền kích hoạt',
    iconName: 'CreditCard'
  },
  {
    id: 'supply_legal',
    title: 'Nguồn cung & Pháp lý',
    subtitle: 'Độ trễ dự án và độ co giãn cung',
    desc: 'Không thể xây một khu đô thị hay tòa chung cư chỉ sau một đêm. Chu kỳ hoàn thiện pháp lý và xây dựng mất 2-5 năm. Do đó, ngay cả khi kinh tế phục hồi, nguồn cung mới thường phản ứng rất chậm, tạo sự lệch pha cung - cầu.',
    formula: 'Thời gian pháp lý 2-5 năm → Nguồn cung trễ pha',
    iconName: 'Building'
  },
  {
    id: 'buyer_income',
    title: 'Thu nhập người mua',
    subtitle: 'Sức cầu thực của xã hội',
    desc: 'Giá nhà không thể neo vĩnh viễn trên trời nếu không có thu nhập thực tế của người mua ở thật hỗ trợ. Sự cải thiện về việc làm và tiền lương là nền tảng duy nhất giúp thị trường giữ được mặt bằng giá bền vững.',
    formula: 'Thu nhập thực ↑ → Sức mua ở thật bền vững',
    iconName: 'Wallet'
  },
  {
    id: 'investor_sentiment',
    title: 'Kỳ vọng nhà đầu tư',
    subtitle: 'Tâm lý thị trường & phòng hộ lạm phát',
    desc: 'Tâm lý đóng vai trò khuếch đại. Khi nhà đầu tư kỳ vọng giá còn tăng hoặc lo ngại tiền mất giá, họ sẵn sàng chấp nhận định giá cao. Nhưng khi kỳ vọng đảo chiều, hiệu ứng tuyết lở sẽ khiến người mua rút lui đồng loạt.',
    formula: 'Kỳ vọng đảo chiều → Thanh khoản biến mất trước giá',
    iconName: 'TrendingUp'
  }
];

// Real Estate 4 Health Checks (Page 15)
export const REAL_ESTATE_HEALTH_PILLARS = [
  {
    number: '01',
    title: 'TÍN DỤNG',
    question: 'Tiền có dễ tiếp cận không?',
    explanation: 'Đừng chỉ nhìn lãi suất niêm yết trên biển quảng cáo. Hãy xem ngân hàng có thực sự giải ngân hồ sơ vay mua nhà không, hạn mức tín dụng còn dồi dào hay đã chạm trần?',
    redFlag: 'Cảnh báo: Lãi suất hạ nhưng điều kiện thẩm định siết chặt, người mua khó giải ngân.'
  },
  {
    number: '02',
    title: 'THANH KHOẢN',
    question: 'Có bao nhiêu giao dịch thực?',
    explanation: 'Thanh khoản là mạch máu của thị trường. Một bất động sản rao giá bao nhiêu không quan trọng bằng việc mất bao lâu để chuyển nhượng thành tiền mặt ở mức giá đó.',
    redFlag: 'Cảnh báo: Giá rao không giảm nhưng không có người mua trong suốt 6-12 tháng.'
  },
  {
    number: '03',
    title: 'NGUỒN CUNG',
    question: 'Thị trường có thêm sản phẩm không?',
    explanation: 'Kiểm tra số lượng dự án mới được cấp phép mở bán, lượng hàng tồn kho của các chủ đầu tư lớn và mức độ sẵn sàng của hàng thứ cấp trên thị trường.',
    redFlag: 'Cảnh báo: Nguồn cung mới tắc nghẽn đẩy giá cục bộ nhưng sức hấp thụ suy yếu.'
  },
  {
    number: '04',
    title: 'GIÁ THỰC TẾ',
    question: 'Giá niêm yết hay giá giao dịch thực?',
    explanation: 'Phân biệt rõ ràng giữa giá chào bán (Asking Price) trên các trang tin tức và giá giao dịch công chứng thực tế (Transaction Price) sau khi đã trừ chiết khấu, quà tặng và hỗ trợ lãi suất.',
    redFlag: 'Cảnh báo: Chủ đầu tư giữ nguyên giá niêm yết nhưng tăng chiết khấu tiền mặt lên tới 30-40%.'
  }
];

// Detailed 16-page content structure of the original handbook
export const HANDBOOK_PAGES: HandbookPage[] = [
  {
    pageNumber: 1,
    title: 'Trang bìa & Tôn chỉ tài liệu',
    category: 'Khởi đầu',
    summary: 'Nhận biết nền kinh tế đang ở đâu trong chu kỳ để quản trị rủi ro và nhận diện cơ hội.',
    content: [
      'Chào mừng bạn đến với Cẩm nang Đọc vị Nền kinh tế của Nguyễn Nam BĐS.',
      'Mục tiêu duy nhất của tài liệu này: Giúp người đọc xây dựng một lăng kính quan sát vĩ mô có hệ thống, thay vì bị dẫn dắt bởi những bản tin giật gân hàng ngày.',
      'Kinh tế học không dành riêng cho các chuyên gia trong phòng máy lạnh. Nó ảnh hưởng trực tiếp đến lãi vay căn nhà của bạn, cơ hội việc làm của gia đình bạn và giá trị tài sản bạn đang nắm giữ.'
    ],
    keyQuote: 'Một vài con số hoặc tin tức đơn lẻ không đủ để kết luận nền kinh tế đang ở giai đoạn nào.'
  },
  {
    pageNumber: 2,
    title: 'Mục lục & Bản đồ cấu trúc',
    category: 'Tổng quan',
    summary: 'Lộ trình 4 phần: Khung tư duy chu kỳ -> 9 nhóm chỉ báo -> Ứng dụng BĐS -> Bảng tra cứu thực chiến.',
    content: [
      'Phần 1: Tư duy chu kỳ - Vì sao mọi nền kinh tế đều trải qua thăng trầm?',
      'Phần 2: 5 giai đoạn kinh điển: Đáy - Phục hồi - Mở rộng - Gần đỉnh - Thu hẹp.',
      'Phần 3: Phân loại chỉ báo Đi trước, Đồng thời và Đi sau.',
      'Phần 4: 9 nhóm chỉ báo vĩ mô cốt lõi mà bất kỳ ai cũng có thể theo dõi.',
      'Phần 5: Mối quan hệ giữa GDP, Lãi suất và Thị trường Bất động sản.',
      'Phần 6: Bảng tra cứu ma trận 9 chỉ báo x 5 giai đoạn.'
    ]
  },
  {
    pageNumber: 3,
    title: 'Bẫy thông tin: Vì sao đọc tin mỗi ngày vẫn hoang mang?',
    category: 'Nỗi đau',
    summary: 'Tại sao các con số vĩ mô thường khiến người đọc cảm thấy mâu thuẫn?',
    content: [
      'Hôm nay báo đăng GDP tăng trưởng 7%, ngày mai lại thấy bài viết hàng nghìn doanh nghiệp giải thể.',
      'Ngân hàng hạ lãi suất nhưng bạn đi vay vẫn thấy khó khăn. Chứng khoán tăng điểm nhưng quán cà phê đầu ngõ vẫn vắng khách.',
      'Sự hoang mang này không phải do bạn dốt, mà vì bạn đang nhìn từng mảnh ghép rời rạc mà không có bức tranh toàn cảnh.'
    ],
    callout: 'Tin tức mô tả hiện tượng. Hệ thống chỉ báo mới giải thích được bản chất.'
  },
  {
    pageNumber: 4,
    title: 'Nguyên lý chu kỳ kinh tế',
    category: 'Bản chất',
    summary: 'Bản chất của chu kỳ kinh tế là chu kỳ của nợ, tín dụng và tâm lý con người.',
    content: [
      'Nền kinh tế không vận hành theo một đường thẳng tắp đi lên. Nó vận hành theo hình sin uốn lượn.',
      'Khi tín dụng dễ dãi, chi tiêu tăng lên, thu nhập của người này là chi tiêu của người khác, nền kinh tế bùng nổ.',
      'Nhưng khi nợ tích tụ quá nhiều so với khả năng trả nợ, chu kỳ buộc phải tự điều chỉnh để thanh lọc.'
    ]
  },
  {
    pageNumber: 5,
    title: 'Giai đoạn 1: Đáy (Trough)',
    category: '5 Giai đoạn',
    summary: 'Điểm khởi đầu của một vòng đời mới khi sự suy giảm đã ngừng lại.',
    content: [
      'Đặc điểm nổi bật: Kinh tế ngừng rơi tự do, nhưng tâm lý xã hội vẫn đang ở đáy của sự bi quan.',
      'Truyền thông vẫn liên tục đưa tin xấu. Doanh nghiệp yếu kém đã bị thanh lọc.',
      'Chính sách tiền tệ nới lỏng tối đa để cứu vớt thanh khoản hệ thống.'
    ]
  },
  {
    pageNumber: 6,
    title: 'Giai đoạn 2: Phục hồi (Recovery)',
    category: '5 Giai đoạn',
    summary: 'Mầm xanh nhú lên từ tro tàn: Đơn hàng mới và sản xuất khởi sắc.',
    content: [
      'Dấu hiệu đầu tiên: Chỉ số PMI vượt 50 điểm, báo hiệu các nhà máy bắt đầu nhận thêm đơn hàng.',
      'Thất nghiệp ngừng tăng. Tiền bắt đầu thẩm thấu vào khu vực kinh tế thực.',
      'Đa số mọi người vẫn nghi ngờ và cho rằng đây chỉ là sự hồi phục nhất thời.'
    ]
  },
  {
    pageNumber: 7,
    title: 'Giai đoạn 3: Mở rộng (Expansion)',
    category: '5 Giai đoạn',
    summary: 'Mùa xuân kinh tế: GDP bùng nổ, việc làm dồi dào, thu nhập tăng vọt.',
    content: [
      'Tất cả các chỉ số đều đồng thuận: GDP tăng mạnh, doanh thu bán lẻ tăng cao, tuyển dụng mở rộng.',
      'Tâm lý tự tin lan tỏa khắp xã hội. Mọi người sẵn sàng vay nợ để đầu tư và nâng cao mức sống.',
      'Cảnh giác: Lạm phát bắt đầu nhen nhóm ở cuối giai đoạn này.'
    ]
  },
  {
    pageNumber: 8,
    title: 'Giai đoạn 4: Gần đỉnh (Late Cycle / Peak)',
    category: '5 Giai đoạn',
    summary: 'Bề ngoài rực rỡ nhưng bên trong đã bắt đầu rạn nứt vì chi phí vốn.',
    content: [
      'Số liệu GDP báo cáo vẫn rất đẹp vì quán tính của quá khứ.',
      'Tuy nhiên, lạm phát đã vượt ngưỡng, buộc Ngân hàng Trung ương phải tăng lãi suất và siết room tín dụng.',
      'Đơn hàng mới giảm xuống. Chi phí vay đắt đỏ khiến các dự án đầu tư mới bị đình trệ.'
    ],
    keyQuote: 'Đỉnh không phải là một thời điểm, đỉnh là một quá trình phân phối.'
  },
  {
    pageNumber: 9,
    title: 'Giai đoạn 5: Thu hẹp (Contraction)',
    category: '5 Giai đoạn',
    summary: 'Thanh lọc và giảm đòn bẩy: Sự suy yếu lan rộng khắp các ngành nghề.',
    content: [
      'Hậu quả của lãi suất cao bắt đầu hiện rõ: sa thải nhân sự, cắt giảm ngân sách, doanh số bán lẻ lao dốc.',
      'Nợ xấu ngân hàng gia tăng. Người giữ đòn bẩy tài chính cao đối mặt với áp lực thanh khoản nghẹt thở.',
      'Tiền mặt trở thành vua (Cash is King).'
    ]
  },
  {
    pageNumber: 10,
    title: 'Khái niệm: Chỉ báo Đi trước, Đồng thời và Đi sau',
    category: 'Phương pháp',
    summary: 'Hiểu đúng vai trò của từng loại dữ liệu để không bị đánh lừa bởi thời gian.',
    content: [
      'Chỉ báo đi trước (Leading): Đơn hàng PMI, Lãi suất, Cung tiền M2 -> Cho biết xu hướng sắp tới.',
      'Chỉ báo đồng thời (Coincident): IIP, Tiêu dùng bán lẻ -> Cho biết nền kinh tế thực đang vận hành thế nào hôm nay.',
      'Chỉ báo đi sau (Lagging): GDP, Tỷ lệ thất nghiệp, Lạm phát CPI -> Xác nhận kết quả của những gì đã xảy ra trong quá khứ.'
    ],
    callout: 'Sai lầm chết người là dùng chỉ báo đi sau (như GDP vừa công bố) để đưa ra quyết định cho tương lai!'
  },
  {
    pageNumber: 11,
    title: 'Bộ 9 chỉ báo vĩ mô cần theo dõi (Phần 1)',
    category: 'Công cụ',
    summary: 'Chi tiết về Đơn hàng PMI, IIP, Bán lẻ tiêu dùng và GDP.',
    content: [
      '1. PMI: Mốc 50 điểm là ranh giới sống còn giữa mở rộng và suy giảm.',
      '2. IIP: Khối lượng hàng hóa thực tế rời khỏi nhà máy.',
      '3. Bán lẻ: Thước đo sự tự tin trong túi tiền của người dân.',
      '4. GDP: Bức tranh tổng kết sau cùng của quý.'
    ]
  },
  {
    pageNumber: 12,
    title: 'Bộ 9 chỉ báo vĩ mô cần theo dõi (Phần 2)',
    category: 'Công cụ',
    summary: 'Chi tiết về Việc làm, Thu nhập, CPI, Lãi suất và Tín dụng M2.',
    content: [
      '5. Việc làm: Doanh nghiệp chỉ sa thải khi không còn chịu đựng được và tuyển dụng khi đơn hàng đã chắc chắn.',
      '6. Thu nhập: Nền tảng mua nhà và chi tiêu.',
      '7. Lạm phát CPI: Kẻ thù của sức mua và ngòi nổ siết tiền tệ.',
      '8. Lãi suất: Van điều tiết lưu lượng máu của nền kinh tế.',
      '9. Tín dụng M2: Độ dồi dào của tiền mặt trong lưu thông.'
    ]
  },
  {
    pageNumber: 13,
    title: 'GDP tăng, giá nhà có nhất thiết phải tăng?',
    category: 'Bất động sản',
    summary: 'Phá vỡ ngụy biện phổ biến nhất giữa tăng trưởng GDP và thị trường địa ốc.',
    content: [
      'Câu trả lời thẳng thắn: KHÔNG.',
      'GDP phản ánh tổng sản lượng hàng hóa và dịch vụ được tạo ra. Nó có thể được kéo bởi xuất khẩu FDI trong khi thị trường nội địa vẫn trầm lắng.',
      'BĐS không chỉ phụ thuộc vào GDP mà chịu tác động trực tiếp bởi 4 van dẫn: Tín dụng, Nguồn cung, Thu nhập và Kỳ vọng.'
    ]
  },
  {
    pageNumber: 14,
    title: '4 Kênh truyền dẫn vĩ mô đến thị trường BĐS',
    category: 'Bất động sản',
    summary: 'Vì sao BĐS phản ứng lệch pha so với chu kỳ kinh tế chung.',
    content: [
      'Kênh 1: Tín dụng & Lãi suất - Chi phí đòn bẩy.',
      'Kênh 2: Nguồn cung & Pháp lý - Độ trễ 2-5 năm của dự án.',
      'Kênh 3: Thu nhập người mua - Sức cầu thực chống đỡ giá.',
      'Kênh 4: Kỳ vọng nhà đầu tư - Hiệu ứng tâm lý bầy đàn.'
    ]
  },
  {
    pageNumber: 15,
    title: 'Muốn biết thị trường BĐS khỏe hay yếu, đừng chỉ nhìn giá',
    category: 'Thực chiến BĐS',
    summary: '4 lăng kính kiểm tra sức khỏe thực chất của thị trường địa ốc.',
    content: [
      'Tín dụng: Tiền vay có thực sự giải ngân được không?',
      'Thanh khoản: Mất bao lâu để bán một căn nhà ở mức giá thị trường?',
      'Nguồn cung: Có sản phẩm mới gia nhập không hay hàng tồn kho ứ đọng?',
      'Giá thực: Đừng nhầm lẫn giữa giá niêm yết trên bảng hiệu và giá tiền mặt chốt hợp đồng.'
    ],
    keyQuote: 'Giá chào bán đứng yên không có nghĩa thanh khoản không đổi.'
  },
  {
    pageNumber: 16,
    title: 'Bảng tra cứu thực chiến: Nền kinh tế đang ở đâu?',
    category: 'Ma trận tra cứu',
    summary: 'Ma trận tổng hợp 9 nhóm chỉ báo qua 5 giai đoạn của chu kỳ kinh tế.',
    content: [
      'Bảng tra cứu trắc nghiệm vĩ mô giúp bạn đối chiếu dữ liệu thực tế tại bất kỳ thời điểm nào.',
      'Khi 6/9 chỉ báo cùng rơi vào một cột, xác suất cao nền kinh tế đang vận hành trong giai đoạn đó.',
      'Sử dụng bảng này định kỳ hàng quý trước khi ra các quyết định giải ngân tài sản lớn.'
    ],
    callout: 'Bảng này là công cụ định vị vị thế, không phải quả cầu pha lê đoán ngày mai thị trường sập hay tăng trần!'
  }
];

// Interactive Diagnostic Quiz questions
export interface QuizQuestion {
  id: number;
  question: string;
  hint: string;
  options: {
    label: string;
    stageBias: EconomicStageId;
    points: number;
    explanation: string;
  }[];
}

export const DIAGNOSTIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Chỉ số PMI và số lượng đơn hàng mới của các nhà máy sản xuất hiện tại đang như thế nào?',
    hint: 'Chỉ báo đi trước phản ánh kỳ vọng 3-6 tháng tới.',
    options: [
      {
        label: 'Dưới 50 điểm, đơn hàng sụt giảm, doanh nghiệp cắt giảm sản lượng',
        stageBias: 'contraction',
        points: 1,
        explanation: 'Dấu hiệu rõ ràng của giai đoạn Thu hẹp/Suy giảm sản xuất.'
      },
      {
        label: 'Ngừng rơi thêm, đi ngang ở vùng thấp sau thời gian dài ảm đạm',
        stageBias: 'trough',
        points: 2,
        explanation: 'Tín hiệu tạo nền đặc trưng của vùng Đáy chu kỳ.'
      },
      {
        label: 'Vừa vượt qua mốc 50 điểm, đơn đặt hàng xuất khẩu bắt đầu nhích tăng',
        stageBias: 'recovery',
        points: 3,
        explanation: 'Mầm xanh của giai đoạn Phục hồi đang lan tỏa.'
      },
      {
        label: 'Ở mức cao ổn định (52-55 điểm), nhà máy hoạt động hết công suất',
        stageBias: 'expansion',
        points: 4,
        explanation: 'Nền kinh tế đang trong giai đoạn Mở rộng hưng thịnh.'
      },
      {
        label: 'Vẫn cao nhưng tốc độ đơn hàng mới bắt đầu có dấu hiệu chững lại',
        stageBias: 'peak',
        points: 5,
        explanation: 'Tín hiệu cảnh báo điển hình của vùng Gần đỉnh.'
      }
    ]
  },
  {
    id: 2,
    question: 'Mặt bằng lãi suất cho vay và định hướng chính sách tiền tệ đang ra sao?',
    hint: 'Chỉ số chi phí vốn chi phối đòn bẩy tài chính.',
    options: [
      {
        label: 'Lãi suất duy trì ở mức rất thấp, Ngân hàng Nhà nước liên tục bơm thanh khoản',
        stageBias: 'trough',
        points: 2,
        explanation: 'Chính sách tiền tệ nới lỏng tối đa hỗ trợ vực dậy nền kinh tế.'
      },
      {
        label: 'Lãi suất vẫn thấp, dòng tiền bắt đầu giải ngân vào sản xuất kinh doanh',
        stageBias: 'recovery',
        points: 3,
        explanation: 'Kênh dẫn vốn hoạt động hiệu quả trong pha Phục hồi.'
      },
      {
        label: 'Lãi suất ổn định ở mức trung bình, tín dụng tăng trưởng hai con số',
        stageBias: 'expansion',
        points: 4,
        explanation: 'Tín dụng mở rộng phục vụ đà tăng trưởng của pha Mở rộng.'
      },
      {
        label: 'Lãi suất tăng cao liên tục, room tín dụng bị siết chặt để kiềm chế lạm phát',
        stageBias: 'peak',
        points: 5,
        explanation: 'Động thái thắt chặt tiền tệ điển hình ở vùng Đỉnh chu kỳ.'
      },
      {
        label: 'Lãi suất neo ở mức cao, ngân hàng siết chặt điều kiện cho vay vì sợ nợ xấu',
        stageBias: 'contraction',
        points: 1,
        explanation: 'Thị trường tín dụng đóng băng trong giai đoạn Thu hẹp.'
      }
    ]
  },
  {
    id: 3,
    question: 'Tình hình việc làm và tuyển dụng của các doanh nghiệp xung quanh bạn thế nào?',
    hint: 'Chỉ báo đi sau thể hiện sức khỏe tích lũy thực tế.',
    options: [
      {
        label: 'Làn sóng sa thải, cắt giảm chi phí diễn ra rầm rộ trên nhiều ngành',
        stageBias: 'contraction',
        points: 1,
        explanation: 'Doanh nghiệp cắt giảm quy mô tối đa để sinh tồn.'
      },
      {
        label: 'Thất nghiệp cao nhưng không còn tăng thêm, thị trường tuyển dụng im ắng',
        stageBias: 'trough',
        points: 2,
        explanation: 'Vùng đáy của thị trường lao động.'
      },
      {
        label: 'Bắt đầu có nhu cầu tuyển dụng lại các vị trí then chốt, việc làm bán thời gian tăng',
        stageBias: 'recovery',
        points: 3,
        explanation: 'Thị trường việc làm bắt đầu rục rịch khởi sắc.'
      },
      {
        label: 'Tuyển dụng sôi động, các công ty cạnh tranh nhân lực, lương thưởng tăng tốt',
        stageBias: 'expansion',
        points: 4,
        explanation: 'Sức hấp thụ lao động đạt đỉnh điểm trong pha Mở rộng.'
      },
      {
        label: 'Thất nghiệp rất thấp nhưng doanh nghiệp bắt đầu dừng tuyển mở rộng vì chi phí cao',
        stageBias: 'peak',
        points: 5,
        explanation: 'Thị trường lao động quá nhiệt ở vùng Gần đỉnh.'
      }
    ]
  },
  {
    id: 4,
    question: 'Thanh khoản và tâm lý người mua trên thị trường Bất Động Sản hiện tại?',
    hint: 'Phản ánh sự kết hợp giữa tín dụng, thu nhập và kỳ vọng.',
    options: [
      {
        label: 'Đóng băng hoàn toàn, nhiều nhà đầu cơ vỡ nợ bán tháo cắt lỗ sâu',
        stageBias: 'trough',
        points: 2,
        explanation: 'Tâm lý bi quan cùng cực tại vùng đáy BĐS.'
      },
      {
        label: 'Thanh khoản nhích nhẹ ở phân khúc nhà ở thực, chung cư trung tâm',
        stageBias: 'recovery',
        points: 3,
        explanation: 'Dòng tiền thông minh bắt đầu gom tài sản giá trị thật.'
      },
      {
        label: 'Giao dịch sôi động khắp nơi, từ trung tâm đến đất nền vùng ven, giá tăng liên tục',
        stageBias: 'expansion',
        points: 4,
        explanation: 'Cơn sốt đất diện rộng trong pha Mở rộng kinh tế.'
      },
      {
        label: 'Giá rao vẫn neo cao ngất ngưởng nhưng không có giao dịch, thanh khoản sụt giảm',
        stageBias: 'peak',
        points: 5,
        explanation: 'Hiện tượng nghẽn thanh khoản nguy hiểm ở vùng Đỉnh.'
      },
      {
        label: 'Áp lực lãi vay đè nặng, thanh khoản kiệt quệ, bắt đầu xuất hiện làn sóng bán hạ giá',
        stageBias: 'contraction',
        points: 1,
        explanation: 'Pha giảm đòn bẩy và điều chỉnh sâu của chu kỳ BĐS.'
      }
    ]
  }
];

// Helper to calculate diagnostic result
export function calculateDiagnosticResult(answers: Record<number, number>): {
  dominantStage: EconomicStage;
  stageDistribution: Record<EconomicStageId, number>;
  advice: string;
} {
  const counts: Record<EconomicStageId, number> = {
    trough: 0,
    recovery: 0,
    expansion: 0,
    peak: 0,
    contraction: 0
  };

  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const q = DIAGNOSTIC_QUESTIONS.find((item) => item.id === Number(questionId));
    if (q && q.options[optionIndex]) {
      const bias = q.options[optionIndex].stageBias;
      counts[bias] += 1;
    }
  });

  let maxStage: EconomicStageId = 'recovery';
  let maxCount = -1;

  for (const stageId of Object.keys(counts) as EconomicStageId[]) {
    if (counts[stageId] > maxCount) {
      maxCount = counts[stageId];
      maxStage = stageId;
    }
  }

  const dominantStage = ECONOMIC_STAGES[maxStage];

  let advice = '';
  switch (maxStage as EconomicStageId) {
    case 'trough':
      advice = 'Nền kinh tế đang nằm ở vùng Đáy hoặc chuyển tiếp sang Phục hồi sớm. Đây là thời điểm vàng để tích lũy tài sản tốt của những người có tiền mặt và tầm nhìn dài hạn.';
      break;
    case 'recovery':
      advice = 'Nền kinh tế đang trong pha Phục hồi. Hãy tập trung vào các tài sản có dòng tiền thật, nhu cầu ở thực và các doanh nghiệp có đơn hàng cải thiện trước.';
      break;
    case 'expansion':
      advice = 'Pha Mở rộng mang lại cơ hội sinh lời mạnh mẽ, nhưng hãy chú ý đến điểm uốn lạm phát và lãi suất ở cuối giai đoạn để không bị kẹt đỉnh.';
      break;
    case 'peak':
      advice = 'Tín hiệu Gần đỉnh đòi hỏi chiến lược phòng thủ nghiêm ngặt: hạ đòn bẩy vay nợ, cơ cấu lại danh mục tài sản kém thanh khoản và tăng tỷ trọng tiền mặt.';
      break;
    case 'contraction':
      advice = 'Giai đoạn Thu hẹp đòi hỏi bảo toàn vốn tối đa. Đừng vội vàng bắt dao rơi, hãy theo dõi sát sao điểm dừng của lãi suất và PMI để nhận diện vùng đáy.';
      break;
  }

  return {
    dominantStage,
    stageDistribution: counts,
    advice
  };
}
