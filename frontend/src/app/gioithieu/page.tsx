'use client';

import React from 'react';
import Link from 'next/link';

export default function GioiThieuPage() {
  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      {/* HERO BANNER */}
      <section className="relative h-64 sm:h-80 w-full overflow-hidden">
        <img
          src="/assets/img/Banner/banner bánh ngọt.png"
          alt="Banner Giới thiệu"
          className="w-full h-full object-cover filter brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-xs uppercase tracking-widest text-amber-200 mb-2">
            <Link href="/" className="hover:underline">Trang chủ</Link> &gt; <span>Giới Thiệu</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-wide">Giới Thiệu</h1>
        </div>
      </section>

      {/* MOTTO SECTION */}
      <section className="py-14 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-xs font-bold text-[#c58a1c] tracking-[0.25em] uppercase mb-3">VỀ HONEYQUE</h2>
        <div className="w-16 h-0.5 bg-[#5D4037] mx-auto mb-6"></div>
        <p className="text-xs md:text-sm font-semibold text-gray-500 tracking-widest uppercase mb-2">
          A PIECE OF CAKE, A PART OF WHOLE LIFE
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#5D4037]">
          BÁNH SẺ CHIA, TRỌN CUỘC SỐNG
        </h2>
        <div className="w-24 h-0.5 bg-[#c58a1c] mx-auto mt-6"></div>
      </section>

      {/* SỨ MỆNH */}
      <section className="py-12 max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-justify">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037]">
              SỨ MỆNH CỦA HONEYQUE
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Honeyque mang trong mình sứ mệnh tạo ra những chiếc bánh chất lượng, an toàn và đầy cảm xúc. 
              Chúng tôi tin rằng mỗi chiếc bánh không chỉ là món ăn, mà là một khoảnh khắc sẻ chia – nơi sự 
              ngọt ngào có thể kết nối con người, mang lại niềm vui và làm cho những dịp đặc biệt trở nên trọn vẹn hơn.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Với Honeyque, mỗi sản phẩm đều được làm từ nguyên liệu tinh khiết, quy trình chuẩn mực và sự tỉ mỉ của 
              những người thợ yêu nghề. Chúng tôi không chỉ chú trọng hương vị, mà còn quan tâm đến sức khỏe, sự an tâm 
              và trải nghiệm của khách hàng.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Chúng tôi tin rằng khi một chiếc bánh được làm bằng cả sự yêu thương và trách nhiệm, 
              nó sẽ trở thành món quà ý nghĩa mà khách hàng luôn muốn quay trở lại.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="/assets/img/Banner/Logo đồ uống.jpg"
              alt="Mission"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* CÂU CHUYỆN THƯƠNG HIỆU */}
      <section className="py-12 bg-white border-y border-amber-50">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="/assets/img/Gioithieu/cauchuyen.png"
              alt="Honeyque Story"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-4 text-justify">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037]">
              CÂU CHUYỆN VỀ HONEYQUE
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Honeyque ra đời từ những khoảnh khắc bình dị: mùi bánh nướng trong căn bếp nhỏ, những buổi tối quây quần bên gia đình và niềm vui khi trao chiếc bánh đầu tiên cho người thân yêu. 
              Từ đó, chúng tôi bắt đầu hành trình biến niềm đam mê làm bánh thành một nơi để mọi người tìm về — nơi có sự tinh tế, yêu thương và chân thật trong từng hương vị.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Trong nhịp sống hiện đại gấp gáp, Honeyque mong muốn mang đến một khoảng lắng nhẹ giữa bộn bề. 
              Chúng tôi không chỉ làm bánh mà còn tạo ra không gian để khách hàng cảm nhận sự an yên: từ tiếng lách cách của dụng cụ cho đến mùi bơ thơm tan trong không khí.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Mỗi chiếc bánh là một câu chuyện về sự tỉ mỉ, kiên nhẫn và tận tâm. Chúng tôi tin rằng, một chiếc bánh ngon không chỉ từ bột, đường, bơ mà còn từ cảm xúc của người làm và niềm vui của người nhận.
            </p>
          </div>
        </div>
      </section>

      {/* GIÁ TRỊ CỐT LÕI */}
      <section className="py-16 max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037] mb-12">
          GIÁ TRỊ CỐT LÕI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="h-44 rounded-xl overflow-hidden mb-4">
              <img
                src="/assets/img/Gioithieu/Giatricotloi1.png"
                alt="Chất lượng"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Chất lượng đặt lên hàng đầu</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nguyên liệu chọn lọc, tiêu chuẩn chế biến nghiêm ngặt và quy trình kiểm soát chất lượng nhiều lớp.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="h-44 rounded-xl overflow-hidden mb-4">
              <img
                src="/assets/img/Gioithieu/Giatricotloi2.png"
                alt="Tự nhiên"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Hương vị thuần khiết</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Nói không với phụ gia có hại, giữ trọn sự tinh tế từ nguyên liệu tự nhiên.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
            <div className="h-44 rounded-xl overflow-hidden mb-4">
              <img
                src="/assets/img/Gioithieu/Giatricotloi3.png"
                alt="Tận tâm"
                className="w-full h-full object-contain hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Sự tận tâm trong từng sản phẩm</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mỗi chiếc bánh là kết tinh của tâm huyết và tỉ mỉ trong từng công đoạn nhỏ nhất.
            </p>
          </div>
        </div>
      </section>

      {/* QUY TRÌNH TẠO RA SẢN PHẨM */}
      <section className="py-12 bg-white border-y border-amber-50">
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-justify">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037]">
              QUY TRÌNH TẠO RA SẢN PHẨM HONEYQUE
            </h2>
            <p className="text-base text-gray-700 leading-relaxed">
              Tại Honeyque, hành trình tạo nên mỗi chiếc bánh bắt đầu từ việc chọn lựa những nguyên liệu tươi mới nhất.
              Chúng tôi tin rằng chất lượng nguyên liệu là nền tảng quyết định hương vị và độ hoàn thiện của sản phẩm.
            </p>
            <p className="text-base text-gray-700 leading-relaxed">
              Toàn bộ quá trình được thực hiện thủ công theo các bước chuẩn mực, từ chuẩn bị, pha trộn đến tạo hình
              và hoàn thiện. Mỗi công đoạn đều được thực hiện một cách tỉ mỉ nhằm giữ trọn sự tinh tế và phong cách đặc trưng.
            </p>
            <div className="pt-2 space-y-2.5 text-sm sm:text-base font-semibold text-[#5D4037]">
              <p className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Chọn lọc nguyên liệu chất lượng cao</p>
              <p className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Quy trình thủ công chuẩn mực</p>
              <p className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Kiểm định chất lượng trước khi hoàn thiện</p>
              <p className="flex items-center gap-2"><i className="fa-solid fa-check text-green-600"></i> Đảm bảo an toàn – vệ sinh – độ tươi mới tuyệt đối</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <img
              src="/assets/img/Products/Bánh Kem/Chocolate Cake 3.webp"
              alt="Process"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* SẢN PHẨM HONEYQUE GALLERY */}
      <section className="py-16 max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#5D4037] mb-10">
          SẢN PHẨM HONEYQUE
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          <Link href="/danhmucsp-banhkem" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Bánh Kem/Macaron Fraisier Cake 1.webp" alt="Bánh Kem" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Bánh Kem</span>
          </Link>
          <Link href="/danhmucsp-banhnuong" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Bánh Nướng/Croissant 1.webp" alt="Bánh Nướng" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Bánh Nướng</span>
          </Link>
          <Link href="/danhmucsp-banhmousse" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Bánh Mousse/Tiramisu De Caramel Socola 1.png" alt="Bánh Mousse" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Bánh Mousse</span>
          </Link>
          <Link href="/danhmucsp-banhngot" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Bánh Ngọt/Fruit pastry.jpg" alt="Bánh Ngọt" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Bánh Ngọt</span>
          </Link>
          <Link href="/danhmucsp-banhquy" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Bánh Quy/matcha crinkle 1.jpg" alt="Bánh Quy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Bánh Quy</span>
          </Link>
          <Link href="/danhmucsp-douong" className="group block text-center">
            <div className="aspect-square rounded-xl overflow-hidden shadow-sm mb-2.5 border border-gray-100 bg-white">
              <img src="/assets/img/Products/Đồ Uống/Kodemari Matcha Latte 2.webp" alt="Đồ Uống" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[#5D4037]">Đồ Uống</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
