'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { openAuthModal } = useAuth();

  useEffect(() => {
    openAuthModal('login');
    router.replace('/');
  }, [openAuthModal, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fcfaf7]">
      <div className="text-center text-gray-500">
        <i className="fa-solid fa-spinner fa-spin text-3xl mb-3 text-[#5D4037]"></i>
        <p className="text-sm">Đang mở cửa sổ đăng nhập...</p>
      </div>
    </div>
  );
}
