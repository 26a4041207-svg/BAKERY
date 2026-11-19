'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/ProductCard';

export const ProductDetail: React.FC<{ productId?: string }> = ({ productId: propId }) => {
  const searchParams = useSearchParams();
  const id = propId || searchParams.get('id') || '001';

  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'guide'>('desc');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5169/api/products/' + id)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setSelectedImg(data.images[0]);
        }
        fetch(`http://localhost:5169/api/products/${id}/related?limit=4`)
          .then(r => r.ok ? r.json() : [])
          .then(rel => setRelatedProducts(rel))
          .catch(() => {});
      })
      .catch(() => {
        // Fallback to product.json
        fetch('/product.json')
          .then(res => res.json())
          .then(data => {
            const numId = parseInt(id, 10);
            const found = data.find((p: any) => p.id === numId || p.id === id);
            if (found) {
              setProduct(found);
              setSelectedImg(found.images?.[0] || '');
              // Related products
              const related = data
                .filter((p: any) => (p.category === found.category || p.categoryName === found.categoryName) && p.id !== found.id)
                .slice(0, 4);
              setRelatedProducts(related);
            }
          });
      });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fcfaf7]">
        <div className="text-center text-gray-500">
          <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-[#5D4037]"></i>
          <p className="text-sm">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    );
  }

  const numId = typeof product.id === 'string' ? parseInt(product.id, 10) || 1 : product.id;
  const isLiked = isInWishlist(numId);
  const images = product.images && product.images.length > 0
    ? product.images
    : ['/assets/img/Products/Bánh Kem/Carrot Cake 1.webp'];
  const currentImg = selectedImg || images[0];

  const handleAddToCart = () => {
    addToCart(
      {
        id: numId,
        name: product.name,
        price: product.price,
        images: images,
        description: product.description || '',
        category: product.category || 'Bánh',
        categoryId: 1,
        isBestSeller: false,
        isNew: false
      },
      quantity
    );
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    openCart();
  };

  const handleToggleLike = () => {
    toggleWishlist({
      id: numId,
      name: product.name,
      price: product.price,
      images: images,
      description: product.description || '',
      category: product.category || 'Bánh',
      categoryId: 1,
      isBestSeller: false,
      isNew: false
    });
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* BREADCRUMB */}
        <nav className="text-sm font-medium text-gray-500 py-3 mb-4">
          <Link href="/" className="hover:text-[#5D4037]"><i className="fa-solid fa-house mr-1"></i> Trang chủ</Link>
          <span className="mx-2">&gt;</span>
          <Link href="/sanpham" className="hover:text-[#5D4037]">Sản phẩm</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-800 font-semibold">{product.name}</span>
        </nav>

        {/* 2-COLUMN MAIN PRODUCT */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: GALLERY */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner mb-4 relative group">
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      currentImg === img ? 'border-[#5D4037] shadow' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <span className="bg-amber-100 text-[#5D4037] text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category || 'Bánh tươi mỗi ngày'}
                </span>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check"></i> Còn hàng
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold font-serif text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* PRICE */}
              <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-gray-100">
                <span className="text-3xl sm:text-4xl font-bold text-[#c58a1c]">
                  {(product.price || 0).toLocaleString()}₫
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()}₫
                  </span>
                )}
              </div>

              {/* SHORT DESCRIPTION */}
              <p className="text-base text-gray-700 leading-relaxed mb-6">
                {product.description ||
                  'Bánh được làm từ các nguyên liệu hảo hạng nhất, bơ thơm béo kết hợp cùng cốt bánh mềm ẩm, xốp nhẹ và kem tươi tinh khiết theo tiêu chuẩn tiệm bánh kiểu Pháp.'}
              </p>

              {/* QUANTITY PICKER */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-bold text-gray-700 uppercase">Số lượng:</span>
                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-base font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#5D4037] hover:bg-[#3e2723] text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#c58a1c] hover:bg-[#b07812] text-white py-3.5 px-6 rounded-xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleToggleLike}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl transition-colors ${
                    isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                  title={isLiked ? 'Bỏ yêu thích' : 'Yêu thích'}
                >
                  <i className={isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i>
                </button>
              </div>

              {/* TOAST ALERT */}
              {addedToast && (
                <div className="mb-4 p-3.5 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
                  <i className="fa-solid fa-circle-check text-green-500 text-base"></i>
                  <span>Đã thêm {quantity} x <strong>{product.name}</strong> vào giỏ hàng thành công!</span>
                </div>
              )}
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100 text-center text-xs sm:text-sm text-gray-700 font-medium">
              <div className="p-2.5 bg-[#fcfaf7] rounded-xl">
                <i className="fa-solid fa-seedling text-[#5D4037] text-lg mb-1.5 block"></i>
                <span>Nông sản sạch Việt</span>
              </div>
              <div className="p-2.5 bg-[#fcfaf7] rounded-xl">
                <i className="fa-solid fa-temperature-arrow-down text-[#5D4037] text-lg mb-1.5 block"></i>
                <span>Bảo quản lạnh chuẩn</span>
              </div>
              <div className="p-2.5 bg-[#fcfaf7] rounded-xl">
                <i className="fa-solid fa-truck-fast text-[#5D4037] text-lg mb-1.5 block"></i>
                <span>Giao nhanh trong 2h</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setActiveTab('desc')}
              className={`px-6 sm:px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'desc'
                  ? 'border-b-2 border-[#5D4037] text-[#5D4037] bg-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Mô tả chi tiết
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`px-6 sm:px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'nutrition'
                  ? 'border-b-2 border-[#5D4037] text-[#5D4037] bg-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Thành phần &amp; Dinh dưỡng
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-6 sm:px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider transition-colors ${
                activeTab === 'guide'
                  ? 'border-b-2 border-[#5D4037] text-[#5D4037] bg-white'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Hướng dẫn bảo quản
            </button>
          </div>

          <div className="p-6 sm:p-8 text-base text-gray-700 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>
                  Mỗi chiếc bánh <strong>{product.name}</strong> tại HONEYQUE là kết tinh của sự tận tâm từ những người thợ làm bánh lành nghề. Chúng tôi lựa chọn kỹ lưỡng từng nguyên liệu từ bột mì hảo hạng, bơ lạt nguyên chất đến trái cây tươi ngon theo mùa.
                </p>
                <p>
                  Sản phẩm thích hợp cho các buổi tiệc trà chiều, sinh nhật ấm cúng, làm quà tặng người thân hoặc đơn giản là tự thưởng cho mình một khoảnh khắc ngọt ngào sau những giờ làm việc mệt mỏi.
                </p>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 text-lg">Thành phần chính:</p>
                <ul className="list-disc pl-5 space-y-2 text-base">
                  <li>Bột mì cao cấp nhập khẩu</li>
                  <li>Bơ động vật nguyên chất, sữa tươi tiệt trùng</li>
                  <li>Trứng gà tươi tuyển chọn trong ngày</li>
                  <li>Đường mía tự nhiên, lượng ngọt vừa phải (Less Sugar)</li>
                </ul>
              </div>
            )}

            {activeTab === 'guide' && (
              <div className="space-y-3">
                <p className="font-semibold text-gray-900 text-lg">Cách bảo quản bánh thơm ngon nhất:</p>
                <ul className="list-disc pl-5 space-y-2 text-base">
                  <li>Bảo quản trong ngăn mát tủ lạnh ở nhiệt độ từ 2°C – 6°C.</li>
                  <li>Nên sử dụng ngon nhất trong vòng 24h – 48h kể từ khi nhận bánh.</li>
                  <li>Tránh để bánh ở nơi có ánh nắng trực tiếp hoặc nhiệt độ cao.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#5D4037] mb-6">
              Sản phẩm cùng loại bạn có thể thích
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
