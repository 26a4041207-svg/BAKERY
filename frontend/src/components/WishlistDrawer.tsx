'use client';

import React from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, removeFromWishlist, isOpen, closeWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  const handleClearAll = () => {
    wishlist.forEach(p => removeFromWishlist(p.id));
  };

  const handleAddAllToCart = () => {
    wishlist.forEach(p => addToCart(p, 1));
    closeWishlist();
    openCart();
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 z-[1200] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeWishlist}
      />

      {/* WISHLIST DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[1201] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="bg-[#5D4037] text-white px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-heart text-amber-300"></i>
            <h3 className="font-bold text-base tracking-wider uppercase">Danh Sách Yêu Thích</h3>
          </div>
          <button
            onClick={closeWishlist}
            className="text-white/80 hover:text-white text-2xl leading-none p-1 focus:outline-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <i className="fa-regular fa-heart text-4xl mb-3 text-gray-300 block"></i>
              <p className="text-sm">Bạn chưa có sản phẩm yêu thích nào.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map(p => (
                <div key={p.id} className="flex gap-3 pt-3 first:pt-0 items-center">
                  <img
                    src={p.images?.[0] || '/assets/img/Products/Bánh Kem/Carrot Cake 1.webp'}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-md border border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate mb-1">{p.name}</h4>
                    <div className="text-sm font-bold text-[#c58a1c] mb-2">{(p.price || 0).toLocaleString()}₫</div>
                    <button
                      onClick={() => {
                        addToCart(p, 1);
                        closeWishlist();
                        openCart();
                      }}
                      className="bg-[#c58a1c] hover:bg-[#b07812] text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="text-gray-400 hover:text-red-500 text-xl leading-none p-1 self-start"
                    title="Xóa khỏi yêu thích"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {wishlist.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-[#faf6f3] flex-shrink-0 flex gap-2">
            <button
              onClick={handleClearAll}
              className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 rounded-lg text-sm font-bold uppercase transition-colors"
            >
              Xóa tất cả
            </button>
            <button
              onClick={handleAddAllToCart}
              className="flex-1 bg-[#5D4037] hover:bg-[#3e2723] text-white py-3 rounded-lg text-sm font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-basket-shopping"></i> Thêm hết vào giỏ
            </button>
          </div>
        )}
      </div>
    </>
  );
};
