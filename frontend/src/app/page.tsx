'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = 3;
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesCount);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slidesCount) % slidesCount);
  };

  const scrollCategory = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#fcfaf7]">
      {/* 1. HERO SLIDER */}
      <section className="relative w-full h-[650px] lg:h-[800px] overflow-hidden bg-black">
        {/* PREV / NEXT ARROWS */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-20 text-white/70 hover:text-white text-3xl md:text-5xl p-2 transition-all hover:scale-110 focus:outline-none"
          aria-label="Previous Slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-20 text-white/70 hover:text-white text-3xl md:text-5xl p-2 transition-all hover:scale-110 focus:outline-none"
          aria-label="Next Slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* SLIDE 0: VIDEO */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 0 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <video
            className="w-full h-full object-cover filter brightness-[65%]"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/assets/img/Banner/slide1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10">
            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-amber-200 mb-3 animate-pulse">
              HONEYQUE
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif tracking-normal md:tracking-wide mb-4 drop-shadow-md">
              CẦU TIẾN &amp; SÁNG TẠO
            </h1>
            <p className="max-w-2xl text-sm md:text-lg text-gray-200 leading-relaxed drop-shadow">
              HONEYQUE không ngừng nghiên cứu và phát triển sản phẩm trong quá trình kinh doanh, mang đến những giá trị mới từ nông sản Việt.
            </p>
          </div>
        </div>

        {/* SLIDE 1: IMAGE */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentSlide === 1 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026')"
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10">
            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-amber-200 mb-3">
              TIỆM BÁNH PHÁP
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif tracking-normal md:tracking-wide mb-4 drop-shadow-md">
              HƯƠNG VỊ PHÁP
            </h1>
            <p className="max-w-xl text-base md:text-xl text-gray-200 leading-relaxed drop-shadow">
              Thưởng thức những chiếc bánh Croissant ngàn lớp giòn tan, thơm lừng bơ.
            </p>
          </div>
        </div>

        {/* SLIDE 2: BANNER */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            currentSlide === 2 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            backgroundImage: "url('/assets/img/Banner/Banner bánh kem.webp')"
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white z-10">
            <p className="text-sm md:text-base font-bold tracking-[0.3em] uppercase text-amber-200 mb-3">
              NGHỆ THUẬT BÁNH KEM
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-serif tracking-normal md:tracking-wide mb-4 drop-shadow-md">
              NGỌT NGÀO YÊU THƯƠNG
            </h1>
            <p className="max-w-xl text-base md:text-xl text-gray-200 leading-relaxed drop-shadow">
              Những chiếc bánh kem tinh tế dành tặng cho người thân yêu nhất.
            </p>
          </div>
        </div>

        {/* SLIDER DOTS */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-3 z-20">
          {[0, 1, 2].map(idx => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-[#c58a1c]' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. BRAND STORY SECTION */}
      <section className="py-20 lg:py-28 max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* IMAGES COMPOSITION */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/assets/img/Banner/brand-story.webp"
                alt="Thợ làm bánh"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-[160px] sm:h-[200px] rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/assets/img/Banner/brand-story 1.webp"
                  alt="Bánh nướng"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <div className="h-[160px] sm:h-[200px] rounded-2xl overflow-hidden shadow-md">
                <img
                  src="/assets/img/Banner/brand-story 2.webp"
                  alt="Lò nướng"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1586985289688-ca3cfd7d3ce0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* STORY CONTENT */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5D4037] leading-tight">
              HONEYQUE:<br />Tiệm bánh kiểu Pháp Châu Á
            </h2>

            <span className="inline-block text-sm font-bold text-[#c58a1c] uppercase tracking-widest">
              CÂU CHUYỆN CỦA CHÚNG TÔI
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Bánh nướng tươi mỗi ngày
            </h3>

            <p className="text-base text-gray-700 leading-relaxed text-justify">
              Với cam kết chỉ sử dụng những nguyên liệu tốt nhất, sản phẩm của chúng tôi nổi tiếng với hương vị độc đáo và chất lượng tốt cho sức khỏe. Những người thợ làm bánh lành nghề của chúng tôi tạo ra nhiều loại bánh ngon được nướng tươi mỗi ngày, sẵn sàng phục vụ những khách hàng tìm kiếm hương vị và chất lượng tuyệt hảo.
            </p>

            <div className="pt-2">
              <Link
                href="/gioithieu"
                className="inline-block bg-[#5D4037] hover:bg-[#3e2723] text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow hover:shadow-lg"
              >
                Đọc Câu Chuyện Của Chúng Tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE PRODUCTS CAROUSEL */}
      <section className="py-16 bg-white border-y border-amber-50">
        <div className="max-w-[1200px] mx-auto px-5 relative">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-widest text-[#c58a1c]">Thực đơn tuyển chọn</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037] mt-1">
              Honeyque Mời Bạn Thưởng Thức
            </h2>
          </div>

          {/* PREV / NEXT BUTTONS */}
          <button
            onClick={() => scrollCategory('left')}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg text-[#5D4037] hover:bg-[#5D4037] hover:text-white flex items-center justify-center transition-all z-10 border border-gray-100"
            aria-label="Scroll Left"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>

          <button
            onClick={() => scrollCategory('right')}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg text-[#5D4037] hover:bg-[#5D4037] hover:text-white flex items-center justify-center transition-all z-10 border border-gray-100"
            aria-label="Scroll Right"
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>

          {/* SLIDER WRAPPER */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-8 py-2"
          >
            <Link
              href="/danhmucsp-banhkem"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Products/Bánh Kem/Chocolate Macaron Cake 1.jpg"
                  alt="Bánh Kem"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Bánh Kem
              </h3>
            </Link>

            <Link
              href="/danhmucsp-banhngot"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Products/Bánh Ngọt/Strawberry Croissant.jpg"
                  alt="Bánh Ngọt"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Bánh Ngọt
              </h3>
            </Link>

            <Link
              href="/danhmucsp-banhnuong"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Products/Bánh Nướng/Banana Chocolate Almond Croissant 1.webp"
                  alt="Bánh Nướng"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Bánh Nướng
              </h3>
            </Link>

            <Link
              href="/danhmucsp-banhquy"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Banner/cookie.avif"
                  alt="Bánh Quy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Bánh Quy
              </h3>
            </Link>

            <Link
              href="/danhmucsp-banhmousse"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Products/Bánh Mousse/Berry Fruit Vanilla 1.jpg"
                  alt="Bánh Mousse"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Bánh Mousse
              </h3>
            </Link>

            <Link
              href="/danhmucsp-douong"
              className="group flex-shrink-0 w-44 sm:w-52 text-center"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-300 mb-3 bg-amber-50 border border-amber-100/50">
                <img
                  src="/assets/img/Banner/douong.avif"
                  alt="Đồ Uống"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-[#5D4037] transition-colors">
                Đồ Uống
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section className="py-20 max-w-[1200px] mx-auto px-5">
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-[#c58a1c]">Giá trị cốt lõi</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037] mt-1">
            Lý Do Nên Chọn Honeyque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-[#5D4037]">
              <i className="fa-solid fa-crown text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Chất Lượng Hàng Đầu</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cam kết mang đến những tiêu chuẩn cao nhất trong từng nguyên liệu và quy trình làm bánh.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-[#5D4037]">
              <i className="fa-solid fa-heart text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Đam Mê Bánh Ngọt</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bánh được nướng mới mỗi ngày bằng tất cả sự tận tâm và nhiệt huyết của người thợ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-[#5D4037]">
              <i className="fa-solid fa-wheat-awn text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Hương Vị Truyền Thống</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Giữ trọn vẹn hương vị tinh tế, kết hợp giữa công thức cổ điển và sự sáng tạo hiện đại.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4 text-[#5D4037]">
              <i className="fa-solid fa-award text-2xl"></i>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Thương Hiệu Uy Tín</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Được thành lập từ niềm tin và sự yêu mến của khách hàng, luôn đồng hành cùng bạn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
