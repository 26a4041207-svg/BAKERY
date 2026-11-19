'use client';

import React from 'react';
import Link from 'next/link';

export default function KhachHangThanThietPage() {
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
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>KHÁCH HÀNG THÂN THIẾT</span>
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide text-center">
            KHÁCH HÀNG THÂN THIẾT
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-6 text-gray-700 leading-relaxed text-base sm:text-[16.5px]">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] pb-4 border-b border-gray-100">
            Khách Hàng Thân Thiết
          </h2>

          <p>
            Nhằm tri ân sự tin tưởng và đồng hành của khách hàng, <strong>HONEYQUE</strong> xây dựng chương trình <strong>Khách hàng Thân thiết</strong> với nhiều ưu đãi hấp dẫn, mang đến trải nghiệm mua sắm ngọt ngào và tiết kiệm hơn mỗi ngày.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">1. Đối tượng áp dụng</h3>
          <p>
            Chương trình áp dụng cho tất cả khách hàng mua sắm trực tiếp tại cửa hàng hoặc đặt hàng thông qua website và các kênh bán hàng chính thức của HONEYQUE:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Khách hàng cá nhân mua sắm bánh thưởng thức mỗi ngày</li>
            <li>Khách hàng thành viên thân thiết mua thường xuyên</li>
            <li>Khách hàng đặt bánh cho sự kiện, sinh nhật, tiệc công ty, lễ kỷ niệm</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">2. Cách thức tích điểm</h3>
          <p>Mỗi đơn hàng thành công sẽ được quy đổi thành điểm tích lũy theo giá trị thanh toán:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>1.000 VNĐ = 1 điểm tích lũy</li>
            <li>Điểm được cộng ngay vào tài khoản sau khi đơn hàng hoàn tất</li>
            <li>Áp dụng đồng bộ cho cả mua trực tiếp tại quầy và đặt online qua website</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">3. Quyền lợi thành viên</h3>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Giảm giá trực tiếp theo các mốc điểm thưởng trên mỗi đơn hàng</li>
            <li>Ưu đãi quà tặng độc quyền dành cho thành viên VIP</li>
            <li>Ưu tiên nhận thông báo và nếm thử các bộ sưu tập bánh mới</li>
            <li>Ưu đãi nhân đôi điểm tích lũy trong các dịp lễ đặc biệt</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">4. Ưu đãi sinh nhật</h3>
          <p>HONEYQUE gửi tặng ưu đãi sinh nhật dành riêng cho khách hàng thân thiết:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Voucher giảm 15% áp dụng cho toàn bộ menu bánh kem sinh nhật</li>
            <li>Tặng kèm thiệp chúc mừng thiết kế riêng và nến sinh nhật cao cấp</li>
          </ul>

          <p className="pt-6 border-t border-gray-100 text-center font-bold text-[#5D4037] text-sm">
            © 2025 HONEYQUE – Sweet Loyalty, Sweet Rewards
          </p>
        </div>
      </section>
    </div>
  );
}
