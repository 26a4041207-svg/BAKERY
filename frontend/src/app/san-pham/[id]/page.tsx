'use client';

import React, { use, Suspense } from 'react';
import { ProductDetail } from '@/components/ProductDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500">Đang tải sản phẩm...</div>}>
      <ProductDetail productId={id} />
    </Suspense>
  );
}
