'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register
  } = useAuth();

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register form state
  const [regEmail, setRegEmail] = useState('');
  const [regFullname, setRegFullname] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Password requirements check
  const isLength = regPassword.length >= 8;
  const isUpper = /[A-Z]/.test(regPassword);
  const isLower = /[a-z]/.test(regPassword);
  const isNumber = /[0-9]/.test(regPassword);
  const isAllValid = isLength && isUpper && isLower && isNumber;

  // Clear messages on modal open/close or tab switch
  useEffect(() => {
    setLoginError('');
    setLoginSuccess('');
    setRegError('');
    setRegSuccess('');
  }, [authModalTab, isAuthModalOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    setLoginLoading(true);

    try {
      await login(loginUsername, loginPassword);
      setLoginSuccess('Đăng nhập thành công!');
      setTimeout(() => {
        closeAuthModal();
        setLoginUsername('');
        setLoginPassword('');
        setLoginSuccess('');
      }, 700);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác!');
      } else {
        setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác!');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!isAllValid) {
      setRegError('Vui lòng đáp ứng đầy đủ yêu cầu bảo mật mật khẩu!');
      return;
    }

    setRegLoading(true);

    try {
      await register({
        username: regUsername,
        password: regPassword,
        email: regEmail,
        fullName: regFullname
      });

      setRegSuccess('Đăng ký tài khoản thành công! Đang chuyển sang đăng nhập...');
      setTimeout(() => {
        setAuthModalTab('login');
        setLoginUsername(regUsername);
        setRegSuccess('');
        setRegPassword('');
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setRegError(err.message || 'Đăng ký thất bại. Tên đăng nhập hoặc email đã tồn tại!');
      } else {
        setRegError('Đăng ký thất bại. Tên đăng nhập hoặc email đã tồn tại!');
      }
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeAuthModal();
        }
      }}
    >
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 text-center my-6 max-h-[92vh] overflow-y-auto border border-amber-50 animate-scaleUp">
        {/* CLOSE BUTTON */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Đóng"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* LOGO & TITLE */}
        <div className="mb-5">
          <img
            src="/assets/img/Logo/logo-honeyque.png"
            alt="HONEYQUE"
            className="w-40 sm:w-44 h-auto mx-auto object-contain mb-2"
          />
          <p className="text-gray-500 text-xs sm:text-sm">Chào mừng bạn đến với tiệm bánh HONEYQUE</p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
              authModalTab === 'login'
                ? 'bg-[#5D4037] text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setAuthModalTab('login')}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`flex-1 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all ${
              authModalTab === 'register'
                ? 'bg-[#5D4037] text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setAuthModalTab('register')}
          >
            Đăng ký
          </button>
        </div>

        {/* TAB CONTENT: LOGIN */}
        {authModalTab === 'login' ? (
          <div>
            {loginSuccess && (
              <div className="bg-green-50 text-green-700 text-xs sm:text-sm p-3 rounded-xl border border-green-200 mb-4 flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-check text-green-600"></i>
                <span>{loginSuccess}</span>
              </div>
            )}
            {loginError && (
              <div className="bg-red-50 text-red-600 text-xs sm:text-sm p-3 rounded-xl border border-red-200 mb-4 flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-red-500"></i>
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tên đăng nhập"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Mật khẩu
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Toggle password visibility"
                  >
                    <i className={`fa-regular ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                  <input type="checkbox" className="rounded border-gray-300 text-[#5D4037] focus:ring-[#5D4037]" />
                  <span>Ghi nhớ</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Vui lòng liên hệ hotline 0837180651 để được hỗ trợ cấp lại mật khẩu.')}
                  className="text-[#5D4037] hover:underline font-semibold"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#5D4037] hover:bg-[#3e2723] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loginLoading && <i className="fa-solid fa-spinner fa-spin text-sm"></i>}
                <span>{loginLoading ? 'Đang xử lý...' : 'Đăng Nhập'}</span>
              </button>
            </form>

            <p className="mt-5 text-xs sm:text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setAuthModalTab('register')}
                className="text-[#5D4037] font-bold hover:underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        ) : (
          /* TAB CONTENT: REGISTER */
          <div>
            {regSuccess && (
              <div className="bg-green-50 text-green-700 text-xs sm:text-sm p-3 rounded-xl border border-green-200 mb-4 flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-check text-green-600"></i>
                <span>{regSuccess}</span>
              </div>
            )}
            {regError && (
              <div className="bg-red-50 text-red-600 text-xs sm:text-sm p-3 rounded-xl border border-red-200 mb-4 flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-red-500"></i>
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-left">
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Email *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3.5 py-2 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Họ và tên *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-regular fa-id-card"></i>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={regFullname}
                    onChange={(e) => setRegFullname(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3.5 py-2 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Tên đăng nhập *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Tên viết liền, không dấu"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-3.5 py-2 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-xs sm:text-sm">
                  Mật khẩu *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl pl-10 pr-10 py-2 text-sm focus:border-[#5D4037] focus:ring-1 focus:ring-[#5D4037] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    aria-label="Toggle password visibility"
                  >
                    <i className={`fa-regular ${showRegPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                  </button>
                </div>
              </div>

              {/* PASSWORD REQUIREMENTS CHECKLIST */}
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100/80 text-xs space-y-1.5 text-left">
                <p className="font-bold text-[#5D4037] mb-0.5">Yêu cầu bảo mật mật khẩu:</p>
                <div className={`flex items-center gap-2 ${isLength ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                  <i className={`fa-solid ${isLength ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-xs'}`}></i>
                  <span>Ít nhất 8 ký tự</span>
                </div>
                <div className={`flex items-center gap-2 ${isUpper ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                  <i className={`fa-solid ${isUpper ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-xs'}`}></i>
                  <span>Ít nhất 1 chữ in hoa (A-Z)</span>
                </div>
                <div className={`flex items-center gap-2 ${isLower ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                  <i className={`fa-solid ${isLower ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-xs'}`}></i>
                  <span>Ít nhất 1 chữ thường (a-z)</span>
                </div>
                <div className={`flex items-center gap-2 ${isNumber ? 'text-green-600 font-semibold' : 'text-gray-400'}`}>
                  <i className={`fa-solid ${isNumber ? 'fa-circle-check text-green-600' : 'fa-circle-xmark text-xs'}`}></i>
                  <span>Ít nhất 1 chữ số (0-9)</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-[#5D4037] hover:bg-[#3e2723] text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow hover:shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {regLoading && <i className="fa-solid fa-spinner fa-spin text-sm"></i>}
                <span>{regLoading ? 'Đang xử lý...' : 'Tạo Tài Khoản'}</span>
              </button>
            </form>

            <p className="mt-4 text-xs sm:text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setAuthModalTab('login')}
                className="text-[#5D4037] font-bold hover:underline"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
