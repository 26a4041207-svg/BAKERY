'use client';

import React, { Suspense } from 'react';
import { ProductDetail } from '@/components/ProductDetail';

export default function Product2HtmlPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Đang tải sản phẩm...</div>}>
      <ProductDetail />
    </Suspense>
  );
}
