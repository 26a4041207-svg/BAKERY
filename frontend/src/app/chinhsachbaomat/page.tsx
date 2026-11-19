'use client';

import React from 'react';
import Link from 'next/link';

export default function ChinhSachBaoMatPage() {
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
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>CHÍNH SÁCH BẢO MẬT</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide">CHÍNH SÁCH BẢO MẬT</h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 max-w-4xl mx-auto px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-6 text-gray-700 leading-relaxed text-base sm:text-[16.5px]">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] pb-4 border-b border-gray-100">
            Chính Sách Bảo Mật
          </h2>

          <p>
            <strong>HONEYQUE</strong> cam kết bảo vệ tuyệt đối quyền riêng tư và thông tin cá nhân của khách hàng khi truy cập và sử dụng các dịch vụ trên website. Chính sách bảo mật này được xây dựng nhằm giúp khách hàng hiểu rõ cách chúng tôi thu thập, sử dụng và bảo vệ thông tin.
          </p>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">1. Phạm vi thu thập thông tin</h3>
          <p>
            Khi khách hàng truy cập website hoặc sử dụng dịch vụ của HONEYQUE, chúng tôi có thể thu thập một số thông tin cần thiết nhằm phục vụ quá trình mua bán và chăm sóc khách hàng:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Họ tên, số điện thoại, địa chỉ giao hàng</li>
            <li>Email liên hệ</li>
            <li>Thông tin đơn hàng và lịch sử mua sắm</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">2. Mục đích sử dụng thông tin</h3>
          <p>Thông tin thu thập từ khách hàng chỉ được sử dụng cho các mục đích hợp pháp sau:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Xử lý và hoàn tất đơn đặt hàng</li>
            <li>Giao hàng đúng địa chỉ và thời gian yêu cầu</li>
            <li>Liên hệ xác nhận đơn hàng hoặc xử lý sự cố phát sinh</li>
            <li>Gửi thông tin khuyến mãi, ưu đãi (nếu khách hàng đồng ý)</li>
            <li>Nâng cao chất lượng sản phẩm và trải nghiệm dịch vụ</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">3. Bảo mật và lưu trữ thông tin</h3>
          <p>
            HONEYQUE áp dụng các biện pháp kỹ thuật và an ninh phù hợp nhằm ngăn chặn việc truy cập trái phép, mất mát hoặc phá hủy dữ liệu cá nhân:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Dữ liệu được lưu trữ an toàn trong hệ thống nội bộ</li>
            <li>Chỉ nhân sự có thẩm quyền mới được tiếp cận thông tin</li>
            <li>Không chia sẻ, trao đổi hoặc bán thông tin cho bên thứ ba vì mục đích thương mại</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">4. Chia sẻ thông tin với bên thứ ba</h3>
          <p>HONEYQUE chỉ cung cấp thông tin khách hàng cho bên thứ ba trong các trường hợp thật sự cần thiết:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Đơn vị vận chuyển đối tác để thực hiện giao hàng</li>
            <li>Khi có yêu cầu từ cơ quan pháp luật có thẩm quyền</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">5. Quyền của khách hàng đối với thông tin cá nhân</h3>
          <p>Khách hàng có toàn quyền:</p>
          <ul className="list-disc pl-6 space-y-2 text-base">
            <li>Yêu cầu kiểm tra, cập nhật hoặc điều chỉnh thông tin cá nhân</li>
            <li>Yêu cầu xóa hoặc ngừng sử dụng dữ liệu cá nhân khi cần thiết</li>
            <li>Từ chối nhận các thông tin quảng cáo, khuyến mại bất kỳ lúc nào</li>
          </ul>

          <h3 className="text-xl font-bold text-[#5D4037] pt-4">6. Cam kết bảo mật</h3>
          <p>
            HONEYQUE cam kết nỗ lực tối đa để bảo vệ thông tin cá nhân của bạn, mang lại môi trường mua sắm an toàn, tin cậy và minh bạch.
          </p>

          <p className="pt-6 border-t border-gray-100 text-center font-bold text-[#5D4037] text-sm">
            © 2025 HONEYQUE – Sweet, Safe &amp; Trusted
          </p>
        </div>
      </section>
    </div>
  );
}
