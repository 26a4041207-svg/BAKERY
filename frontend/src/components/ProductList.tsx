'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';

interface Props {
  initialCategory?: string;
  categoryTitle?: string;
}

const CATEGORY_ITEMS = [
  {
    key: 'banhkem',
    title: 'BÁNH KEM',
    icon: '/Icon-danhmucsp/icon-banhkem.svg',
    banner: '/assets/img/Banner/Banner bánh kem.webp',
    href: '/danhmucsp-banhkem'
  },
  {
    key: 'banhnuong',
    title: 'BÁNH NƯỚNG',
    icon: '/Icon-danhmucsp/Logo bánh nướng.svg',
    banner: '/assets/img/Banner/banner bánh nướng.png',
    href: '/danhmucsp-banhnuong'
  },
  {
    key: 'banhngot',
    title: 'BÁNH NGỌT',
    icon: '/Icon-danhmucsp/logo bánh ngọt.svg',
    banner: '/assets/img/Banner/banner bánh ngọt.png',
    href: '/danhmucsp-banhngot'
  },
  {
    key: 'banhquy',
    title: 'BÁNH QUY',
    icon: '/Icon-danhmucsp/icon-banhquy.jpg',
    banner: '/assets/img/Banner/banner-banhquy.png',
    href: '/danhmucsp-banhquy'
  },
  {
    key: 'banhmousse',
    title: 'BÁNH MOUSSE',
    icon: '/Icon-danhmucsp/icon-banhmousse.jpg',
    banner: '/assets/img/Banner/banner-banhmousse.png',
    href: '/danhmucsp-banhmousse'
  },
  {
    key: 'douong',
    title: 'ĐỒ UỐNG',
    icon: '/Icon-danhmucsp/logo đồ uống.png',
    banner: '/assets/img/Banner/Logo đồ uống.jpg',
    href: '/danhmucsp-douong'
  }
];

export const ProductList: React.FC<Props> = ({
  initialCategory = 'all',
  categoryTitle = 'Sản Phẩm'
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    fetch('http://localhost:5169/api/products?pageSize=100')
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setProducts(data.items);
        } else if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback to product.json
        fetch('/product.json')
          .then(res => res.json())
          .then(data => {
            setProducts(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  const handlePriceChange = (val: string) => {
    setSelectedPrices(prev =>
      prev.includes(val) ? prev.filter(p => p !== val) : [...prev, val]
    );
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setSelectedStatuses(prev =>
      prev.includes(val) ? prev.filter(s => s !== val) : [...prev, val]
    );
    setCurrentPage(1);
  };

  // Determine current category config
  const currentCatInfo = useMemo(() => {
    const found = CATEGORY_ITEMS.find(c => c.key === selectedCategory);
    if (found) {
      return {
        title: found.title.charAt(0) + found.title.slice(1).toLowerCase().replace(/bánh /i, 'Bánh ').replace(/đồ /i, 'Đồ '),
        banner: found.banner
      };
    }
    return {
      title: categoryTitle || 'Tất Cả Sản Phẩm',
      banner: '/assets/img/Banner/Banner bánh kem.webp'
    };
  }, [selectedCategory, categoryTitle]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory && selectedCategory !== 'all') {
      const catKey = selectedCategory.toLowerCase();
      list = list.filter(p => {
        const pCat = (p.category || p.categoryName || '').toLowerCase();
        if (catKey === 'banhkem' || catKey === 'banh-kem') return pCat.includes('kem');
        if (catKey === 'banhngot' || catKey === 'banh-ngot') return pCat.includes('ngọt') || pCat.includes('ngot');
        if (catKey === 'banhnuong' || catKey === 'banh-nuong') return pCat.includes('nướng') || pCat.includes('nuong');
        if (catKey === 'banhquy' || catKey === 'banh-quy') return pCat.includes('quy') || pCat.includes('cookie');
        if (catKey === 'banhmousse' || catKey === 'banh-mousse') return pCat.includes('mousse');
        if (catKey === 'douong' || catKey === 'do-uong') return pCat.includes('uống') || pCat.includes('tra') || pCat.includes('cafe');
        return pCat.includes(catKey);
      });
    }

    // Filter by Price
    if (selectedPrices.length > 0) {
      list = list.filter(p => {
        const price = p.price || 0;
        return selectedPrices.some(range => {
          if (range === '50-100') return price >= 50000 && price <= 100000;
          if (range === '100-200') return price >= 100000 && price <= 200000;
          if (range === '200-300') return price >= 200000 && price <= 300000;
          if (range === '300-500') return price >= 300000 && price <= 500000;
          if (range === '500-1000') return price >= 500000 && price <= 1000000;
          if (range === 'above1000') return price > 1000000;
          return true;
        });
      });
    }

    // Filter by Status
    if (selectedStatuses.length > 0) {
      list = list.filter(p => {
        return selectedStatuses.some(status => {
          if (status === 'bestseller') return p.isBestSeller === true;
          if (status === 'new') return p.isNew === true;
          return true;
        });
      });
    }

    // Sort
    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name_asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name_desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    }

    return list;
  }, [products, selectedCategory, selectedPrices, selectedStatuses, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#fcfaf7] min-h-screen">
      {/* 1. HERO BANNER (STARTING AT TOP-0 SO HEADER BLENDS IN) */}
      <section className="relative w-full h-[380px] sm:h-[420px] overflow-hidden bg-black">
        <img
          src={currentCatInfo.banner}
          alt={currentCatInfo.title}
          className="w-full h-full object-cover filter brightness-[75%] transition-all duration-500"
        />

        {/* BREADCRUMB & TITLE IN CENTER */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4 pt-16">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-white/90 mb-2 drop-shadow">
            <Link href="/" className="hover:underline">Trang chủ</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/sanpham" className="hover:underline">Sản phẩm</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-white font-bold">{currentCatInfo.title}</span>
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-wide drop-shadow-lg">
            {currentCatInfo.title}
          </h1>
        </div>
      </section>

      {/* 2. CATEGORY ICON BAR (EXACT AS APPROVED IMAGE) */}
      <section className="w-full bg-[#EBD6A0] py-4 shadow-sm border-b border-[#dfc88d]">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 items-center">
          {CATEGORY_ITEMS.map(cat => {
            const isSelected = selectedCategory === cat.key;
            return (
              <Link
                key={cat.key}
                href={cat.href}
                onClick={e => {
                  setSelectedCategory(cat.key);
                  setCurrentPage(1);
                }}
                className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? 'scale-105 opacity-100'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
              >
                <div className="h-14 sm:h-16 flex items-center justify-center mb-2.5">
                  <img
                    src={cat.icon}
                    alt={cat.title}
                    className="h-12 sm:h-14 w-auto max-w-[65px] object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  />
                </div>
                <p
                  className={`text-sm sm:text-[15px] font-bold text-[#2c3a2b] tracking-wider uppercase text-center transition-all ${
                    isSelected ? 'border-b-2 border-[#2c3a2b] pb-0.5' : ''
                  }`}
                >
                  {cat.title}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. MAIN CONTENT: SIDEBAR + PRODUCT GRID */}
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR FILTERS (LEGACY REPLICA) */}
          <aside className="lg:col-span-1 space-y-6">
            {/* PRICE FILTER */}
            <fieldset className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <legend className="font-bold text-[#5D4037] text-base uppercase tracking-wide px-2">
                Chọn mức giá
              </legend>
              <div className="space-y-3 text-sm text-gray-700 mt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('50-100')}
                    onChange={() => handlePriceChange('50-100')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Từ 50.000₫ - 100.000₫</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('100-200')}
                    onChange={() => handlePriceChange('100-200')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Từ 100.000₫ - 200.000₫</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('200-300')}
                    onChange={() => handlePriceChange('200-300')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Từ 200.000₫ - 300.000₫</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('300-500')}
                    onChange={() => handlePriceChange('300-500')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Từ 300.000₫ - 500.000₫</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('500-1000')}
                    onChange={() => handlePriceChange('500-1000')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Từ 500.000₫ - 1.000.000₫</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes('above1000')}
                    onChange={() => handlePriceChange('above1000')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Trên 1.000.000₫</span>
                </label>
              </div>
            </fieldset>

            {/* STATUS FILTER */}
            <fieldset className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <legend className="font-bold text-[#5D4037] text-base uppercase tracking-wide px-2">
                Trạng thái
              </legend>
              <div className="space-y-3 text-sm text-gray-700 mt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes('bestseller')}
                    onChange={() => handleStatusChange('bestseller')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Bán chạy nhất (Best Seller)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes('new')}
                    onChange={() => handleStatusChange('new')}
                    className="w-4 h-4 accent-[#5D4037] rounded"
                  />
                  <span>Món mới ra lò</span>
                </label>
              </div>
            </fieldset>

            {/* SIDEBAR BANNER PROMO */}
            <div className="rounded-2xl overflow-hidden shadow-sm relative group">
              <img
                src="/assets/img/Banner/banner bánh ngọt.png"
                alt="Promo"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex flex-col justify-end p-4 text-white">
                <span className="text-sm font-bold text-amber-300 uppercase">Ưu Đãi Đặc Biệt</span>
                <p className="text-sm leading-snug mt-1">Đặt bánh trước cho tiệc sinh nhật nhận ngay ưu đãi 10%</p>
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID & TOOLBAR */}
          <main className="lg:col-span-3">
            {/* TOOLBAR */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Tìm thấy <span className="font-bold text-gray-800 text-base">{filteredProducts.length}</span> món bánh ngon
              </div>

              <div className="flex items-center gap-2.5">
                <label className="text-sm font-semibold text-gray-700">Sắp xếp theo:</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3.5 py-2 text-sm bg-white text-gray-800 focus:border-[#5D4037] outline-none shadow-sm"
                >
                  <option value="">Mặc định</option>
                  <option value="price_asc">Giá: Thấp đến Cao</option>
                  <option value="price_desc">Giá: Cao đến Thấp</option>
                  <option value="name_asc">Tên: A đến Z</option>
                  <option value="name_desc">Tên: Z đến A</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-14 text-center text-gray-500 border border-gray-100">
                <i className="fa-solid fa-cake-candles text-4xl mb-3 text-amber-600/40"></i>
                <p className="text-base font-semibold">Không tìm thấy món bánh phù hợp với tiêu chí lọc.</p>
                <button
                  onClick={() => { setSelectedPrices([]); setSelectedStatuses([]); setSelectedCategory('all'); }}
                  className="mt-4 px-5 py-2.5 bg-[#5D4037] text-white rounded-lg text-sm font-bold"
                >
                  Bỏ chọn bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {currentItems.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  <i className="fa-solid fa-chevron-left mr-1"></i> Trang trước
                </button>

                {[...Array(totalPages)].map((_, idx) => {
                  const pNum = idx + 1;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        currentPage === pNum
                          ? 'bg-[#5D4037] text-white shadow'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                >
                  Trang sau <i className="fa-solid fa-chevron-right ml-1"></i>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
