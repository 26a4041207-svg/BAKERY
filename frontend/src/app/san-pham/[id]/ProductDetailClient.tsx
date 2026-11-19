'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Plus, Minus, Truck, ShieldCheck, Clock, Share2, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface Props {
  product: Product;
}

export const ProductDetailClient: React.FC<Props> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || '/assets/img/Products/Bánh Kem/Carrot Cake 1.webp'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'nutrition' | 'shipping'>('desc');
  const [copied, setCopied] = useState(false);

  const isLiked = isInWishlist(product.id);
  const isSoldOut = product.status?.some(s => s.toLowerCase().includes('sold out'));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/gio-hang');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery Image Area */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-all duration-300"
              priority
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.status?.map((st, i) => (
                <span
                  key={i}
                  className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-amber-700 text-white shadow-sm"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                    selectedImage === img
                      ? 'border-amber-700 shadow-md scale-105'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                {product.categoryName}
              </span>
              <span className="text-xs text-stone-400">Mã: #{product.productCode}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3e2723] mt-3">
              {product.name}
            </h1>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-amber-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-stone-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-emerald-700 font-semibold ml-auto bg-emerald-100/70 px-2 py-0.5 rounded-md">
              Còn hàng tươi mới
            </span>
          </div>

          {/* Short description */}
          <p className="text-stone-600 text-sm leading-relaxed">
            {product.description || 'Bánh tươi thủ công nướng mới mỗi ngày với bơ sữa thượng hạng và trái cây tuyển chọn.'}
          </p>

          {/* Quantity Selector */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Số lượng
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-sm overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-stone-100 text-stone-600 transition"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-stone-100 text-stone-600 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition ${
                  isLiked
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Đã yêu thích' : 'Yêu thích'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 transition text-xs font-medium flex items-center gap-1.5"
                title="Chia sẻ sản phẩm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Đã copy link' : 'Chia sẻ'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={isSoldOut}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm shadow-md transition ${
                isSoldOut
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 active:scale-[0.99]'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{isSoldOut ? 'Hết hàng tạm thời' : 'Thêm vào giỏ hàng'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              disabled={isSoldOut}
              className={`flex-1 py-4 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-amber-900/20 text-white transition ${
                isSoldOut
                  ? 'bg-stone-400 cursor-not-allowed'
                  : 'bg-[#5d4037] hover:bg-[#4a332c] active:scale-[0.99]'
              }`}
            >
              Mua ngay với 1 chạm
            </button>
          </div>

          {/* Delivery & Warranty perks */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3 text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Giao bánh giữ lạnh chống sốc trong 2 giờ nội thành</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Cam kết 100% nguyên liệu tự nhiên - Không phụ gia độc hại</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Hỗ trợ ghi chữ chúc mừng sinh nhật lên bánh miễn phí</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Information Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'desc'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Mô tả chi tiết
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'ingredients'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Thành phần bánh
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'nutrition'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Giá trị dinh dưỡng
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition whitespace-nowrap ${
              activeTab === 'shipping'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Giao hàng & Bảo quản
          </button>
        </div>

        {/* Tab Contents */}
        <div className="text-sm text-stone-600 leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-stone-900">Chi tiết hương vị {product.name}</h3>
              <p>
                {product.description || 'Bánh mang hương vị đặc trưng truyền thống với vị ngọt thanh vừa phải, lớp bánh mềm ẩm xốp quyện cùng lớp kem thơm béo dịu nhẹ không gây ngấy.'}
              </p>
              <p>
                Từng công đoạn tạo nên chiếc bánh được thực hiện bởi đôi bàn tay tỉ mỉ của các nghệ nhân làm bánh tại HONEYQUE Bakery. Sản phẩm thích hợp dùng làm món tráng miệng, dùng kèm trà chiều hoặc làm quà tặng ý nghĩa cho những người thân yêu.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-stone-900">Nguyên liệu chọn lọc</h3>
              {product.ingredients && product.ingredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              ) : (
                <p>Bột mì thượng hạng, bơ lạt nguyên chất, trứng gà tươi, đường mía hữu cơ, kem tươi tự nhiên.</p>
              )}
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="space-y-4 max-w-xl">
              <h3 className="text-lg font-bold text-stone-900">Bảng dinh dưỡng tiêu chuẩn (cho 1 khẩu phần)</h3>
              {product.nutrition ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-xs text-stone-400 block">Năng lượng</span>
                    <span className="text-xl font-bold text-amber-900">{product.nutrition.calories}</span>
                    <span className="text-[10px] text-stone-400 block">kcal</span>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-xs text-stone-400 block">Chất béo (Fat)</span>
                    <span className="text-xl font-bold text-amber-900">{product.nutrition.fat}g</span>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-xs text-stone-400 block">Carbohydrate</span>
                    <span className="text-xl font-bold text-amber-900">{product.nutrition.carb}g</span>
                  </div>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-center">
                    <span className="text-xs text-stone-400 block">Chất đạm (Protein)</span>
                    <span className="text-xl font-bold text-amber-900">{product.nutrition.protein}g</span>
                  </div>
                </div>
              ) : (
                <p>Thông tin dinh dưỡng đang được cập nhật từ phòng thử nghiệm thực phẩm.</p>
              )}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-stone-900">Hướng dẫn bảo quản & Thưởng thức</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Bảo quản trong ngăn mát tủ lạnh (nhiệt độ từ 2°C - 6°C) ngay khi nhận bánh.</li>
                <li>Sử dụng ngon nhất trong vòng 24 - 48 giờ sau khi mở hộp để giữ trọn vẹn hương vị.</li>
                <li>Trước khi dùng, có thể để bánh ở nhiệt độ phòng 5 - 10 phút để lớp kem đạt độ mềm lý tưởng nhất.</li>
                <li>Giao hàng bằng thùng giữ nhiệt và đá khô chuyên dụng để bánh luôn giữ form hoàn hảo.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
