'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistPage() {
  const { openWishlist, count } = useWishlist();

  useEffect(() => {
    openWishlist();
  }, [openWishlist]);

  return (
    <div className="bg-[#fcfaf7] min-h-[70vh] flex flex-col items-center justify-center p-8 text-center pt-28">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-2xl">
          <i className="fa-solid fa-heart"></i>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] mb-3">Danh Sách Yêu Thích</h2>
        <p className="text-base text-gray-700 mb-6 leading-relaxed">
          {count > 0
            ? `Bạn đang có ${count} sản phẩm trong danh sách yêu thích. Khung yêu thích đã được mở ở góc phải.`
            : 'Danh sách yêu thích của bạn đang trống.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={openWishlist}
            className="bg-[#5D4037] hover:bg-[#3e2723] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow"
          >
            Mở lại yêu thích
          </button>
          <Link
            href="/sanpham"
            className="bg-[#c58a1c] hover:bg-[#b07812] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow"
          >
            Khám phá thực đơn
          </Link>
        </div>
      </div>
    </div>
  );
}
