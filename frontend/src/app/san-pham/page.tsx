'use client';

import React from 'react';
import { ProductList } from '@/components/ProductList';

export default function SanPhamPage() {
  return <ProductList initialCategory="all" categoryTitle="Tất Cả Sản Phẩm" />;
}
