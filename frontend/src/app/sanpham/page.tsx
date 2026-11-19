'use client';

import React from 'react';
import { ProductList } from '@/components/ProductList';

export default function SanPhamHtmlPage() {
  return <ProductList initialCategory="all" categoryTitle="Tất Cả Sản Phẩm" />;
}
