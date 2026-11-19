'use client';

import React from 'react';
import Link from 'next/link';

export default function ChinhSachDichVuPage() {
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
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>CHÍNH SÁCH DỊCH VỤ</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide">CHÍNH SÁCH DỊCH VỤ</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-6 text-gray-700 leading-relaxed text-base sm:text-[16.5px]">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] pb-4 border-b border-gray-100">
            Chính Sách Dịch Vụ
          </h2>

          <p>
            Tại <strong>HONEYQUE</strong>, chúng tôi luôn đặt trải nghiệm và sự hài lòng của khách hàng làm trung tâm trong mọi hoạt động. Chính sách dịch vụ được xây dựng nhằm đảm bảo sự minh bạch, chuyên nghiệp và nhất quán trong quá trình phục vụ.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">1. Chính sách đặt hàng</h3>
          <p>
            Khách hàng có thể đặt bánh trực tiếp tại cửa hàng, thông qua website hoặc các kênh bán hàng chính thức của HONEYQUE:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Thông tin sản phẩm được công bố rõ ràng, đầy đủ</li>
            <li>Xác nhận đơn hàng trước khi tiến hành sản xuất</li>
            <li>Hỗ trợ tư vấn lựa chọn bánh phù hợp nhu cầu</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">2. Chính sách thanh toán</h3>
          <p>HONEYQUE cung cấp nhiều phương thức thanh toán linh hoạt nhằm tạo sự thuận tiện cho khách hàng:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Thanh toán tiền mặt hoặc thẻ tại cửa hàng</li>
            <li>Thanh toán khi nhận hàng (COD)</li>
            <li>Chuyển khoản ngân hàng qua mã QR nhanh chóng</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">3. Chính sách giao hàng</h3>
          <p>
            Chúng tôi hỗ trợ giao hàng theo yêu cầu, đảm bảo sản phẩm đến tay khách hàng trong tình trạng tốt nhất:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Thời gian giao hàng đúng thỏa thuận</li>
            <li>Đóng gói cẩn thận, đảm bảo vệ sinh và thẩm mỹ</li>
            <li>Thông báo trước nếu có phát sinh chậm trễ do thời tiết hoặc giao thông</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">4. Chính sách đổi trả &amp; phản hồi</h3>
          <p>HONEYQUE luôn sẵn sàng tiếp nhận ý kiến phản hồi để cải thiện chất lượng dịch vụ:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Hỗ trợ đổi trả trong trường hợp sản phẩm lỗi do kỹ thuật làm bánh hoặc hư hỏng trong quá trình vận chuyển của cửa hàng</li>
            <li>Tiếp nhận phản hồi qua hotline, website hoặc trực tiếp tại quầy</li>
          </ul>

          <p className="pt-6 border-t border-gray-100 text-center font-bold text-[#5D4037] text-sm">
            © 2025 HONEYQUE – Dedicated Service, Sweet Experience
          </p>
        </div>
      </section>
    </div>
  );
}
