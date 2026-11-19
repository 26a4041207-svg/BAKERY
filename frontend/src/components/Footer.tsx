'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#4e342e] text-white pt-14 pb-8 relative font-sans">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.2fr_1.1fr_1.1fr_1.3fr_1.8fr] gap-8 lg:gap-10">
        {/* CỘT 1: LOGO & GIỚI THIỆU */}
        <div>
          <Link href="/" className="inline-block mb-4" title="Về trang chủ">
            <img
              src="/assets/img/Logo/logo-honeyque.png"
              alt="HONEYQUE"
              className="w-44 h-auto object-contain hover:opacity-85 transition-opacity"
            />
          </Link>
          <p className="text-white/85 text-sm sm:text-[15px] leading-relaxed text-justify">
            Honeyque mang trong mình sứ mệnh tạo ra những chiếc bánh chất lượng, thơm ngon và đầy cảm xúc. 
            Chúng tôi tin rằng mỗi chiếc bánh không chỉ là món ăn, mà là một khoảnh khắc sẻ chia – nơi sự 
            ngọt ngào có thể kết nối con người, mang lại niềm vui và làm cho những dịp đặc biệt trở nên trọn vẹn hơn.
          </p>
        </div>

        {/* CỘT 2: VỀ HONEYQUE */}
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base tracking-wider uppercase mb-5">VỀ HONEYQUE</h3>
          <ul className="space-y-3 text-sm sm:text-[15px] text-white/85">
            <li><Link href="/gioithieu" className="hover:text-white hover:underline transition-colors">Giới Thiệu</Link></li>
            <li><Link href="/tintuc" className="hover:text-white hover:underline transition-colors">Tin Tức</Link></li>
            <li><Link href="/chinhsachantoanthucpham" className="hover:text-white hover:underline transition-colors">Chính Sách An Toàn Thực Phẩm</Link></li>
            <li><Link href="/chinhsachdichvu" className="hover:text-white hover:underline transition-colors">Chính Sách Dịch Vụ</Link></li>
            <li><Link href="/chinhsachbaomat" className="hover:text-white hover:underline transition-colors">Chính Sách Bảo Mật</Link></li>
            <li><Link href="/khachhangthanthiet" className="hover:text-white hover:underline transition-colors">Khách Hàng Thân Thiết</Link></li>
          </ul>
        </div>

        {/* CỘT 3: THƯỞNG THỨC */}
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base tracking-wider uppercase mb-5">THƯỞNG THỨC</h3>
          <ul className="space-y-3 text-sm sm:text-[15px] text-white/85">
            <li><Link href="/danhmucsp-banhkem" className="hover:text-white hover:underline transition-colors">Bánh Kem</Link></li>
            <li><Link href="/danhmucsp-banhnuong" className="hover:text-white hover:underline transition-colors">Bánh Nướng</Link></li>
            <li><Link href="/danhmucsp-banhngot" className="hover:text-white hover:underline transition-colors">Bánh Ngọt</Link></li>
            <li><Link href="/danhmucsp-banhquy" className="hover:text-white hover:underline transition-colors">Bánh Quy</Link></li>
            <li><Link href="/danhmucsp-banhmousse" className="hover:text-white hover:underline transition-colors">Bánh Mousse</Link></li>
            <li><Link href="/danhmucsp-douong" className="hover:text-white hover:underline transition-colors">Đồ Uống</Link></li>
          </ul>
        </div>

        {/* CỘT 4: LIÊN HỆ */}
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base tracking-wider uppercase mb-5">LIÊN HỆ</h3>
          <ul className="space-y-3 text-sm sm:text-[15px] text-white/85">
            <li>
              <Link href="/lienhe" className="hover:text-white hover:underline transition-colors">
                Liên Hệ Với Chúng Tôi
              </Link>
            </li>
            <li className="flex items-start gap-2.5 pt-1">
              <i className="fa-solid fa-location-dot text-white mt-1 shrink-0 text-sm"></i>
              <span className="leading-snug">Số 1 Tô Vĩnh Diện, Khương Đình, Hà Nội</span>
            </li>
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-phone text-white shrink-0 text-sm"></i>
              <a href="tel:0837180651" className="hover:text-white hover:underline transition-colors">
                0837180651
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <i className="fa-solid fa-clock text-white shrink-0 text-sm"></i>
              <span>8h – 22h (Thứ 2 – CN)</span>
            </li>
          </ul>
        </div>

        {/* CỘT 5: ĐĂNG KÝ NHẬN TIN */}
        <div>
          <h3 className="text-white font-bold text-sm sm:text-base tracking-wider uppercase mb-5">ĐĂNG KÝ NHẬN TIN</h3>
          
          {!submitted ? (
            <form onSubmit={handleNewsletterSubmit} className="relative flex items-center mt-2 border-b border-white/40 hover:border-white focus-within:border-white transition-colors pb-1.5">
              <input
                type="email"
                placeholder="Nhập email vào đây..."
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/60 text-sm sm:text-base pr-8 py-2 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:opacity-80 transition-opacity p-1"
                aria-label="Đăng ký nhận tin"
                title="Đăng ký nhận tin"
              >
                <i className="fa-solid fa-paper-plane text-white text-base"></i>
              </button>
            </form>
          ) : (
            <div className="bg-white/10 p-3.5 rounded border border-white/20 text-sm text-white mt-2">
              <p className="mb-2">Cảm ơn bạn! Yêu cầu đăng ký đã thành công.</p>
              <button
                onClick={() => { setSubmitted(false); setEmailInput(''); }}
                className="text-white hover:underline flex items-center gap-1.5 font-medium"
              >
                <i className="fa-solid fa-rotate-left text-white"></i> Đăng ký email khác
              </button>
            </div>
          )}

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-3 mt-6">
            <a
              href="https://www.facebook.com/people/Honeyque/61585324114002/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
              title="Facebook"
            >
              <i className="fa-brands fa-facebook-f text-white text-sm"></i>
            </a>
            <a
              href="https://www.instagram.com/honeyquebakery/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all hover:-translate-y-0.5"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram text-white text-base"></i>
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/20 mt-14 pt-6 text-center text-sm text-white/80">
        <p>Copyright © 2025 Honeyque Pte Ltd. All rights reserved.</p>
      </div>

      {/* SCROLL TO TOP FLOATING BUTTON */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#4e342e] border-2 border-white hover:bg-white text-white hover:text-[#4e342e] shadow-xl flex items-center justify-center transition-all hover:scale-105 z-40"
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
      >
        <i className="fa-solid fa-chevron-up text-sm"></i>
      </button>
    </footer>
  );
};
