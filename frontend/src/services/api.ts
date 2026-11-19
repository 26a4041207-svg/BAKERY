import { Category, PagedResult, Product, OrderResponse, CreateOrderRequest, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5169/api';

function getAuthHeader(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('bakery_token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

export const api = {
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch {
      // Fallback
      return [
        { id: 1, name: 'Bánh Kem', slug: 'banh-kem', iconUrl: '/Icon-danhmucsp/icon-banhkem.jpg', productCount: 14 },
        { id: 2, name: 'Bánh Mousse', slug: 'banh-mousse', iconUrl: '/Icon-danhmucsp/icon-banhmousse.jpg', productCount: 10 },
        { id: 3, name: 'Bánh Ngọt', slug: 'banh-ngot', iconUrl: '/Icon-danhmucsp/icon-banhngot.jpg', productCount: 20 },
        { id: 4, name: 'Bánh Nướng', slug: 'banh-nuong', iconUrl: '/Icon-danhmucsp/icon-banhnuong.jpg', productCount: 9 },
        { id: 5, name: 'Bánh Quy', slug: 'banh-quy', iconUrl: '/Icon-danhmucsp/icon-banhquy.jpg', productCount: 12 },
        { id: 6, name: 'Đồ Uống', slug: 'do-uong', iconUrl: '/Icon-danhmucsp/icon-douong.jpg', productCount: 18 }
      ];
    }
  },

  // Products
  async getProducts(params?: {
    category?: string;
    search?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PagedResult<Product>> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.minPrice) searchParams.set('minPrice', params.minPrice.toString());
    if (params?.maxPrice) searchParams.set('maxPrice', params.maxPrice.toString());
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.pageSize) searchParams.set('pageSize', params.pageSize.toString());

    try {
      const res = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    } catch {
      return {
        items: [],
        totalItems: 0,
        page: 1,
        pageSize: 12,
        totalPages: 0
      };
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}`, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getRelatedProducts(id: string, limit = 4): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${id}/related?limit=${limit}`, { cache: 'no-store' });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  async getFeaturedProducts(limit = 8): Promise<Product[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/featured?limit=${limit}`, { cache: 'no-store' });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Orders
  async createOrder(data: CreateOrderRequest): Promise<OrderResponse> {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Lỗi khi đặt hàng');
    }
    return await res.json();
  },

  async getOrderByCode(code: string): Promise<OrderResponse | null> {
    const res = await fetch(`${API_BASE_URL}/orders/${code}`);
    if (!res.ok) return null;
    return await res.json();
  },

  // Auth
  async login(username: string, password: string):Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Đăng nhập không thành công');
    }
    const data = await res.json();
    return {
      token: data.token,
      user: {
        id: data.id,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        role: data.role
      }
    };
  },

  async register(data: { username: string; fullName: string; email: string; password: string; phoneNumber?: string; address?: string }): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Đăng ký không thành công');
    }
    const resData = await res.json();
    return {
      token: resData.token,
      user: {
        id: resData.id,
        username: resData.username,
        fullName: resData.fullName,
        email: resData.email,
        role: resData.role
      }
    };
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: getAuthHeader()
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Contact
  async sendContact(data: { fullName: string; email: string; phoneNumber?: string; subject: string; message: string }): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Không thể gửi tin nhắn');
    }
    return await res.json();
  }
};
