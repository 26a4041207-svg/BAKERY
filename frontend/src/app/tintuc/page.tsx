'use client';

import React from 'react';
import Link from 'next/link';

export default function TinTucPage() {
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
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>TIN TỨC</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide">TIN TỨC</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-6 text-gray-700 leading-relaxed text-base sm:text-[16.5px]">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] pb-4 border-b border-gray-100">
            Tin tức &amp; Cập nhật từ HONEYQUE
          </h2>

          <p>
            Chuyên mục <strong>Tin tức</strong> của HONEYQUE là nơi cập nhật những thông tin mới nhất về sản phẩm, chương trình ưu đãi, hoạt động nội bộ cũng như các câu chuyện xoay quanh hành trình tạo nên những chiếc bánh ngọt chất lượng.
          </p>

          <p>
            Chúng tôi tin rằng mỗi chiếc bánh không chỉ đơn thuần là món ăn, mà còn là sự kết hợp giữa tâm huyết, nguyên liệu chọn lọc và mong muốn mang đến trải nghiệm ngọt ngào cho khách hàng.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">1. Cập nhật sản phẩm &amp; bộ sưu tập bánh mới</h3>
          <p>
            HONEYQUE liên tục nghiên cứu và phát triển các dòng bánh mới nhằm đáp ứng nhu cầu đa dạng của khách hàng. Các sản phẩm được xây dựng dựa trên xu hướng ẩm thực hiện đại nhưng vẫn giữ trọn hương vị truyền thống.
          </p>
          <p>
            Mỗi bộ sưu tập bánh đều được lựa chọn kỹ lưỡng từ nguyên liệu, công thức cho đến hình thức trang trí, phù hợp cho các dịp sinh nhật, lễ kỷ niệm, tiệc gia đình và sự kiện đặc biệt.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">2. Chương trình khuyến mãi &amp; ưu đãi đặc biệt</h3>
          <p>
            Nhằm tri ân khách hàng, HONEYQUE thường xuyên triển khai các chương trình ưu đãi hấp dẫn theo từng thời điểm trong năm:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Khuyến mãi theo mùa, ngày lễ và sự kiện đặc biệt</li>
            <li>Ưu đãi dành cho khách hàng thân thiết</li>
            <li>Chương trình giảm giá khi đặt bánh số lượng lớn</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">3. Chia sẻ kiến thức &amp; mẹo thưởng thức bánh</h3>
          <p>
            Bên cạnh sản phẩm, chúng tôi còn chia sẻ những mẹo nhỏ giúp bạn bảo quản bánh đúng cách, lựa chọn bánh phù hợp với khẩu vị và cách kết hợp bánh cùng các loại đồ uống để trải nghiệm thêm trọn vẹn.
          </p>
        </div>
      </section>
    </div>
  );
}
