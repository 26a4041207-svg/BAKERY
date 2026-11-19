'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  category?: string;
  originalPrice?: number;
}

export const ProductCard: React.FC<{ product: ProductCardProps }> = ({ product }) => {
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const numId = typeof product.id === 'string' ? parseInt(product.id, 10) || 1 : product.id;
  const isLiked = isInWishlist(numId);
  const imgSrc = product.image || product.images?.[0] || '/assets/img/Products/Bánh Kem/Carrot Cake 1.webp';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      {
        id: numId,
        name: product.name,
        price: product.price,
        images: product.images || [imgSrc],
        description: '',
        category: product.category || 'Bánh',
        categoryId: 1,
        isBestSeller: false,
        isNew: false
      },
      1
    );
    openCart();
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: numId,
      name: product.name,
      price: product.price,
      images: product.images || [imgSrc],
      description: '',
      category: product.category || 'Bánh',
      categoryId: 1,
      isBestSeller: false,
      isNew: false
    });
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-amber-50 flex flex-col h-full">
      {/* IMAGE & BADGES */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link href={`/product2?id=${product.id}`}>
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* WISHLIST BUTTON */}
        <button
          onClick={handleToggleLike}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow flex items-center justify-center transition-all z-10"
          title={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
          aria-label="Wishlist"
        >
          <i className={`${isLiked ? 'fa-solid fa-heart text-red-500' : 'fa-regular fa-heart'} text-sm`}></i>
        </button>

        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
            Giảm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* INFO */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {product.category && (
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1.5">
              {product.category}
            </span>
          )}
          <Link href={`/product2?id=${product.id}`}>
            <h3 className="font-semibold text-gray-800 text-[15px] sm:text-base hover:text-[#5D4037] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="font-bold text-[#c58a1c] text-base sm:text-lg">
              {product.price.toLocaleString()}₫
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}₫
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#5D4037] hover:bg-[#3e2723] text-white w-10 h-10 rounded-lg flex items-center justify-center text-base shadow hover:scale-105 transition-all flex-shrink-0"
            title="Thêm vào giỏ"
            aria-label="Add to cart"
          >
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
