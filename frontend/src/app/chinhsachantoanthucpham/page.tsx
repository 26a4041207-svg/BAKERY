'use client';

import React from 'react';
import Link from 'next/link';

export default function ChinhSachAnToanThucPhamPage() {
  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      {/* HERO BANNER */}
      <section className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src="/assets/img/Banner/banner bánh ngọt.png"
          alt="Banner bánh ngọt"
          className="w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-widest text-amber-200 mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>CHÍNH SÁCH AN TOÀN THỰC PHẨM</span>
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide text-center">
            CHÍNH SÁCH AN TOÀN THỰC PHẨM
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-6 text-gray-700 leading-relaxed text-base sm:text-[16.5px]">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] pb-4 border-b border-gray-100">
            Chính Sách An Toàn Thực Phẩm
          </h2>

          <p>
            Tại <strong>HONEYQUE</strong>, an toàn thực phẩm là giá trị cốt lõi xuyên suốt toàn bộ quá trình sản xuất và kinh doanh. Chúng tôi cam kết mang đến những sản phẩm bánh ngọt đạt tiêu chuẩn chất lượng cao, an toàn và minh bạch cho người tiêu dùng.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">1. Nguồn nguyên liệu</h3>
          <p>
            Nguyên liệu đầu vào được lựa chọn kỹ lưỡng từ các nhà cung cấp uy tín, có chứng nhận an toàn thực phẩm và nguồn gốc xuất xứ rõ ràng:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Nguyên liệu tươi mới, kiểm tra nghiêm ngặt trước khi đưa vào sản xuất</li>
            <li>Nói không với nguyên liệu quá hạn hoặc không rõ nguồn gốc</li>
            <li>Ưu tiên nguyên liệu tự nhiên, hạn chế tối đa phụ gia</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">2. Quy trình sản xuất</h3>
          <p>
            HONEYQUE áp dụng quy trình sản xuất khép kín, đảm bảo vệ sinh trong từng công đoạn:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Khu vực chế biến được khử trùng và vệ sinh định kỳ hằng ngày</li>
            <li>Thiết bị, dụng cụ làm bánh đạt tiêu chuẩn inox thực phẩm</li>
            <li>Đội ngũ thợ làm bánh được đào tạo kiến thức ATTP chuyên sâu</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">3. Bảo quản &amp; Vận chuyển</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Đóng gói trong hộp chuyên dụng sạch sẽ, hạn chế va đập và nhiễm chéo</li>
            <li>Vận chuyển trong túi giữ nhiệt đảm bảo nhiệt độ chuẩn cho bánh kem</li>
          </ul>

          <div className="bg-amber-50 p-4 rounded-xl border-l-4 border-[#c58a1c] text-sm text-amber-900 leading-relaxed">
            <strong>Lưu ý:</strong> Quý khách vui lòng bảo quản và sử dụng sản phẩm theo đúng hướng dẫn in trên bao bì hoặc tư vấn của nhân viên tiệm.
          </div>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">4. Cam kết với khách hàng</h3>
          <p>
            HONEYQUE tuân thủ đầy đủ các quy định của pháp luật Việt Nam về an toàn vệ sinh thực phẩm và luôn sẵn sàng tiếp nhận mọi phản hồi từ quý khách hàng.
          </p>

          <p className="pt-6 border-t border-gray-100 text-center font-bold text-[#5D4037] text-sm">
            © 2025 HONEYQUE – Sweet with Safety &amp; Quality
          </p>
        </div>
      </section>
    </div>
  );
}
