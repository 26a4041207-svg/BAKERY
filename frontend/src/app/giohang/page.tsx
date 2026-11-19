'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { openCart, items } = useCart();

  useEffect(() => {
    openCart();
  }, [openCart]);

  return (
    <div className="bg-[#fcfaf7] min-h-[70vh] flex flex-col items-center justify-center p-8 text-center pt-28">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-lg w-full">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#5D4037] flex items-center justify-center mx-auto mb-4 text-2xl">
          <i className="fa-solid fa-basket-shopping"></i>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#5D4037] mb-3">Giỏ Hàng HONEYQUE</h2>
        <p className="text-base text-gray-700 mb-6 leading-relaxed">
          {items.length > 0
            ? `Bạn đang có ${items.length} món bánh trong giỏ hàng. Khung giỏ hàng đã được mở ở góc phải màn hình.`
            : 'Giỏ hàng của bạn đang trống.'}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={openCart}
            className="bg-[#5D4037] hover:bg-[#3e2723] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow"
          >
            Mở lại giỏ hàng
          </button>
          <Link
            href="/sanpham"
            className="bg-[#c58a1c] hover:bg-[#b07812] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors shadow"
          >
            Tiếp tục mua bánh
          </Link>
        </div>
      </div>
    </div>
  );
}
