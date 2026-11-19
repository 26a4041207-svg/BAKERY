'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, openAuthModal } = useAuth();
  const { openCart, totalCount: cartCount } = useCart();
  const { count: wishlistCount, openWishlist } = useWishlist();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ id: string; name: string; price: number; image: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // Modals & Menus
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);

  // Edit user state
  const [fullnameInput, setFullnameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [editMsg, setEditMsg] = useState({ text: '', isError: false });

  // Pass modal state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMsg, setPassMsg] = useState({ text: '', isError: false });

  const [isScrolled, setIsScrolled] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/assets/../product.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (user) {
      setFullnameInput(user.fullName || '');
      setEmailInput(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close suggestions and user dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    if (val.trim().length > 0 && products.length > 0) {
      const match = products
        .filter(p => p.name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 5)
        .map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          image: p.images?.[0] || ''
        }));
      setSuggestions(match);
      setShowSuggestions(match.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setShowSuggestions(false);
      router.push(`/sanpham?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('login');
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  const handleSaveUserInfo = () => {
    if (!fullnameInput.trim() || !emailInput.trim()) {
      setEditMsg({ text: 'Vui lòng điền đầy đủ họ tên và email', isError: true });
      return;
    }
    setEditMsg({ text: 'Cập nhật thông tin thành công!', isError: false });
    setTimeout(() => {
      setShowEditModal(false);
      setEditMsg({ text: '', isError: false });
    }, 1200);
  };

  const handleSavePassword = () => {
    if (!oldPass || !newPass || !confirmPass) {
      setPassMsg({ text: 'Vui lòng điền đầy đủ các trường', isError: true });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ text: 'Mật khẩu xác nhận không khớp', isError: true });
      return;
    }
    setPassMsg({ text: 'Đổi mật khẩu thành công!', isError: false });
    setTimeout(() => {
      setShowPassModal(false);
      setPassMsg({ text: '', isError: false });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    }, 1200);
  };

  // Header background: Transparent over banner by default, transforms to solid brown on scroll
  const isNoBannerPage = pathname?.includes('login') || pathname?.includes('cart') || pathname?.includes('dang-nhap');
  const navBg = isScrolled || (isNoBannerPage && !isScrolled)
    ? 'bg-[#5D4037] shadow-[0_4px_12px_rgba(0,0,0,0.25)] py-1.5 sm:py-2'
    : 'bg-transparent py-2.5 sm:py-3.5';

  return (
    <>
      <header
        id="mainHeader"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-4 sm:px-8 lg:px-12 flex items-center justify-between text-white ${navBg}`}
      >
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <img
              src="/assets/img/Logo/logo-honeyque.png"
              alt="HONEYQUE"
              className={`w-auto object-contain transition-all duration-300 hover:opacity-90 ${
                isScrolled ? 'h-8 sm:h-9 lg:h-10' : 'h-9 sm:h-11 lg:h-12'
              }`}
            />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          className="lg:hidden text-2xl text-white p-2 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* DESKTOP NAVBAR */}
        <nav className="hidden lg:flex items-center space-x-6 text-[15px]">
          <Link
            href="/"
            className={`font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1 hover:text-[#c58a1c] ${
              pathname === '/' ? 'text-[#c58a1c] font-bold border-b-2 border-[#c58a1c]' : 'text-white'
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/gioithieu"
            className={`font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1 hover:text-[#c58a1c] ${
              pathname === '/gioithieu' || pathname === '/gioi-thieu' ? 'text-[#c58a1c] font-bold border-b-2 border-[#c58a1c]' : 'text-white'
            }`}
          >
            Giới thiệu
          </Link>

          {/* DROPDOWN SẢN PHẨM */}
          <div className="relative group">
            <Link
              href="/sanpham"
              className={`font-semibold uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-1.5 py-1 hover:text-[#c58a1c] ${
                pathname?.includes('sanpham') || pathname?.includes('san-pham') || pathname?.includes('danhmucsp')
                  ? 'text-[#c58a1c] font-bold border-b-2 border-[#c58a1c]'
                  : 'text-white'
              }`}
            >
              <span>Sản phẩm</span>
              <i className="fa-solid fa-chevron-down text-[10px] transition-transform duration-200 group-hover:rotate-180"></i>
            </Link>

            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white text-gray-800 rounded-lg shadow-xl py-2 min-w-[200px] border border-gray-100 divide-y divide-gray-50">
                <Link href="/danhmucsp-banhkem" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Bánh kem
                </Link>
                <Link href="/danhmucsp-banhngot" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Bánh ngọt
                </Link>
                <Link href="/danhmucsp-banhnuong" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Bánh nướng
                </Link>
                <Link href="/danhmucsp-banhquy" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Bánh quy
                </Link>
                <Link href="/danhmucsp-banhmousse" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Bánh mousse
                </Link>
                <Link href="/danhmucsp-douong" className="block px-4 py-2.5 text-sm hover:bg-[#fbf7f4] hover:text-[#5D4037] font-medium transition-colors">
                  Đồ uống
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/tintuc"
            className={`font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1 hover:text-[#c58a1c] ${
              pathname === '/tintuc' || pathname === '/tin-tuc' ? 'text-[#c58a1c] font-bold border-b-2 border-[#c58a1c]' : 'text-white'
            }`}
          >
            Tin tức
          </Link>
          <Link
            href="/lienhe"
            className={`font-semibold uppercase tracking-wider transition-colors duration-200 relative py-1 hover:text-[#c58a1c] ${
              pathname === '/lienhe' || pathname === '/lien-he' ? 'text-[#c58a1c] font-bold border-b-2 border-[#c58a1c]' : 'text-white'
            }`}
          >
            Liên hệ
          </Link>
        </nav>

        {/* RIGHT ACTIONS: SEARCH & ICONS (EXACT AS SCREENSHOT) */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* SEARCH BAR (WHITE PILL INPUT WITH ICON ON LEFT) */}
          <div className="relative hidden md:block" ref={searchBoxRef}>
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <button
                type="submit"
                className="absolute left-3 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center justify-center"
                aria-label="Search"
              >
                <i className="fa-solid fa-magnifying-glass text-xs sm:text-sm"></i>
              </button>
              <input
                type="text"
                placeholder="Tìm kiếm bánh..."
                value={searchInput}
                onChange={handleSearchChange}
                autoComplete="off"
                className="w-52 lg:w-64 bg-white text-gray-800 placeholder-gray-400 text-xs sm:text-sm rounded-full pl-9 pr-3.5 py-1.5 sm:py-2 outline-none shadow-sm transition-all focus:ring-2 focus:ring-[#5D4037]/20 border-0"
              />
            </form>

            {/* LIVE SUGGESTIONS DROPDOWN */}
            {showSuggestions && (
              <div className="absolute top-full mt-2 left-0 w-80 bg-white text-gray-900 rounded-lg shadow-2xl py-2 z-50 border border-gray-100 max-h-80 overflow-y-auto">
                {suggestions.map(s => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setShowSuggestions(false);
                      router.push(`/product2?id=${s.id}`);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#fbf7f4] cursor-pointer border-b border-gray-50 last:border-b-0"
                  >
                    <img src={s.image} alt={s.name} className="w-11 h-11 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate text-gray-800">{s.name}</div>
                      <div className="text-sm font-bold text-[#c58a1c]">{s.price.toLocaleString()}₫</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* WISHLIST BUTTON (WHITE HEART) */}
          <button
            onClick={openWishlist}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-[#c58a1c] hover:bg-white/10 transition-colors"
            title="Danh sách yêu thích"
            aria-label="Wishlist"
          >
            <i className="fa-regular fa-heart text-lg"></i>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* CART BUTTON (WHITE BASKET) */}
          <button
            onClick={openCart}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-[#c58a1c] hover:bg-white/10 transition-colors"
            title="Giỏ hàng"
            aria-label="Cart"
          >
            <i className="fa-solid fa-basket-shopping text-lg"></i>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c58a1c] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* USER PROFILE / LOGIN (WHITE USER) */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={handleUserClick}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:text-[#c58a1c] hover:bg-white/10 transition-colors"
              title={user ? user.fullName || user.username : 'Đăng nhập'}
              aria-label="User Account"
            >
              <i className="fa-regular fa-user text-lg"></i>
            </button>

            {/* LOGGED IN DROPDOWN */}
            {user && showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-2xl py-2 z-50 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100 text-xs font-bold text-[#5D4037] truncate">
                  {user.fullName || user.username}
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); setShowEditModal(true); }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#fbf7f4] flex items-center gap-2"
                >
                  <i className="fa-solid fa-user-pen text-gray-500"></i> Sửa thông tin
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); setShowPassModal(true); }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-[#fbf7f4] flex items-center gap-2"
                >
                  <i className="fa-solid fa-key text-gray-500"></i> Đổi mật khẩu
                </button>
                <button
                  onClick={() => { setShowUserMenu(false); logout(); }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="w-4/5 max-w-sm bg-[#5D4037] text-white h-full p-6 shadow-2xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/20">
              <img src="/assets/img/Logo/logo-honeyque.png" alt="HONEYQUE" className="h-12 w-auto" />
              <button onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="mt-4 mb-6">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3 top-3 text-gray-400 text-xs"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm bánh..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full bg-white text-gray-800 placeholder-gray-400 pl-9 pr-4 py-2 rounded-full text-sm outline-none"
                />
              </div>
            </form>

            <div className="space-y-4 font-semibold uppercase text-sm">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10 hover:text-[#c58a1c]">
                Trang chủ
              </Link>
              <Link href="/gioithieu" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10 hover:text-[#c58a1c]">
                Giới thiệu
              </Link>
              <div>
                <Link href="/sanpham" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10 hover:text-[#c58a1c]">
                  Sản phẩm
                </Link>
                <div className="pl-4 space-y-2 mt-2 text-xs normal-case text-amber-100">
                  <Link href="/danhmucsp-banhkem" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Bánh kem</Link>
                  <Link href="/danhmucsp-banhngot" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Bánh ngọt</Link>
                  <Link href="/danhmucsp-banhnuong" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Bánh nướng</Link>
                  <Link href="/danhmucsp-banhquy" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Bánh quy</Link>
                  <Link href="/danhmucsp-banhmousse" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Bánh mousse</Link>
                  <Link href="/danhmucsp-douong" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#c58a1c]">Đồ uống</Link>
                </div>
              </div>
              <Link href="/tintuc" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10 hover:text-[#c58a1c]">
                Tin tức
              </Link>
              <Link href="/lienhe" onClick={() => setMobileMenuOpen(false)} className="block py-2 border-b border-white/10 hover:text-[#c58a1c]">
                Liên hệ
              </Link>

              {/* MOBILE USER ACCOUNT */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <div className="space-y-2">
                    <p className="text-xs text-amber-200 normal-case">
                      Xin chào, <span className="font-bold text-white">{user.fullName || user.username}</span>
                    </p>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowEditModal(true);
                      }}
                      className="block w-full text-left py-1.5 text-xs normal-case text-white/90 hover:text-[#c58a1c]"
                    >
                      <i className="fa-solid fa-pen-to-square mr-2"></i> Chỉnh sửa thông tin
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setShowPassModal(true);
                      }}
                      className="block w-full text-left py-1.5 text-xs normal-case text-white/90 hover:text-[#c58a1c]"
                    >
                      <i className="fa-solid fa-key mr-2"></i> Đổi mật khẩu
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="block w-full text-left py-1.5 text-xs normal-case text-red-300 hover:text-red-400"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> Đăng xuất
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full bg-[#c58a1c] hover:bg-[#b07812] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                  >
                    <i className="fa-regular fa-user"></i>
                    <span>Đăng nhập / Đăng ký</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT INFO */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#5D4037] text-lg">Chỉnh sửa thông tin</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {editMsg.text && (
              <div className={`mt-3 p-3 rounded text-xs ${editMsg.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {editMsg.text}
              </div>
            )}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tên đăng nhập (Cố định)</label>
                <input type="text" readOnly value={user?.username || ''} className="w-full bg-gray-100 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  value={fullnameInput}
                  onChange={e => setFullnameInput(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#5D4037] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#5D4037] outline-none"
                />
              </div>
              <button
                onClick={handleSaveUserInfo}
                className="w-full mt-4 bg-[#5D4037] hover:bg-[#3e2723] text-white py-2.5 rounded font-bold text-sm transition-colors"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CHANGE PASSWORD */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-[#5D4037] text-lg">Đổi mật khẩu</h3>
              <button onClick={() => setShowPassModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            {passMsg.text && (
              <div className={`mt-3 p-3 rounded text-sm ${passMsg.isError ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {passMsg.text}
              </div>
            )}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mật khẩu cũ</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={oldPass}
                  onChange={e => setOldPass(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#5D4037] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#5D4037] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#5D4037] outline-none"
                />
              </div>
              <button
                onClick={handleSavePassword}
                className="w-full mt-4 bg-[#5D4037] hover:bg-[#3e2723] text-white py-2.5 rounded font-bold text-sm transition-colors"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
