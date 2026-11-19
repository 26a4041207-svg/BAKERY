export interface Nutrition {
  calories: number;
  fat: number;
  carb: number;
  protein: number;
}

export interface Product {
  id: number;
  productCode?: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  categoryId?: number;
  categoryName?: string;
  category?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  status?: string[];
  description?: string;
  images: string[];
  ingredients?: string[];
  nutrition?: Nutrition | null;
  stockQuantity?: number;
  isActive?: boolean;
  createdAt?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  bannerUrl?: string;
  productCount?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  avatarUrl?: string;
  role: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  phoneNumber: string;
  email?: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: string;
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: number;
  orderCode: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  shippingAddress: string;
  note?: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export interface ContactMessageRequest {
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject?: string;
  message: string;
}
