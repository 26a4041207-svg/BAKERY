# HONEYQUE BAKERY - GIỮ NGUYÊN 100% GIAO DIỆN GỐC ĐÃ DUYỆT

Dự án đã được chuyển đổi công nghệ sang **Next.js** (Frontend) + **ASP.NET Core Web API** (Backend) + **Microsoft SQL Server** (Cơ sở dữ liệu) với cam kết:
> **GIỮ NGUYÊN 100% TOÀN BỘ GIAO DIỆN CŨ ĐÃ ĐƯỢC PHÊ DUYỆT**: Tất cả cấu trúc DOM, thẻ HTML, class CSS, màu sắc, animation, video banner, icon FontAwesome, layout trang chủ, danh mục sản phẩm, chi tiết sản phẩm, giỏ hàng, popup thanh toán và trang đăng nhập đều được bảo toàn nguyên bản.

---

## 📁 1. CẤU TRÚC DỰ ÁN

```
BAKERY/
├── backend/                              # Backend ASP.NET Core Web API (.NET 8/10 C#)
│   └── BakeryApi/
│       ├── Controllers/                  # RESTful API Controllers
│       │   ├── AuthController.cs         # Đăng nhập, đăng ký JWT, lấy hồ sơ cá nhân
│       │   ├── ProductsController.cs     # Danh sách sản phẩm, lọc giá, phân loại, tìm kiếm
│       │   ├── CategoriesController.cs   # Danh mục bánh (Bánh kem, Ngọt, Nướng, Quy, Mousse, Đồ uống)
│       │   ├── OrdersController.cs       # Đặt hàng, tính tổng tiền trên Server
│       │   ├── ContactController.cs      # Tiếp nhận lời nhắn, góp ý của khách hàng
│       │   └── WishlistController.cs     # Danh sách bánh yêu thích
│       ├── Models/                       # Entity Framework Core Entities (SQL Server)
│       ├── Data/                         # BakeryDbContext & DbInitializer (Tự động nạp 83 sản phẩm)
│       ├── appsettings.json              # Chuỗi kết nối SQL Server
│       └── Program.cs                    # Swagger UI, CORS, JWT
│
├── frontend/                             # Frontend Next.js (App Router)
│   ├── public/                           # Toàn bộ video slide1.mp4, banner, ảnh sản phẩm, logo
│   │   ├── assets/
│   │   ├── Icon-danhmucsp/
│   │   └── avatar/
│   ├── src/
│   │   ├── styles/                       # TOÀN BỘ 14 FILE CSS GỐC ĐÃ ĐƯỢC DUYỆT:
│   │   │   ├── header.css                # CSS Header, Search suggestions, User modal
│   │   │   ├── footer.css                # CSS Footer, Newsletter form, Scroll-to-top
│   │   │   ├── index.css                 # CSS Trang chủ (Hero slider, Brand story, Features)
│   │   │   ├── danhmucsp.css             # CSS Danh mục sản phẩm & Sidebar bộ lọc
│   │   │   ├── product2.css              # CSS Chi tiết sản phẩm, Gallery, Tabs, Bảng dinh dưỡng
│   │   │   ├── giohang.css               # CSS Drawer giỏ hàng & Popup thanh toán
│   │   │   ├── wishlist.css              # CSS Drawer danh sách yêu thích
│   │   │   ├── gioithieu.css             # CSS Trang giới thiệu
│   │   │   ├── lienhe.css                # CSS Trang liên hệ & Bản đồ
│   │   │   ├── tintuc.css                # CSS Trang tin tức
│   │   │   └── các file chính sách css...
│   │   ├── app/                          # Toàn bộ routes giữ nguyên cấu trúc URL gốc:
│   │   │   ├── page.tsx (index.html)     # Trang chủ gốc: Video slider, Brand story, Carousel 6 danh mục, 4 features
│   │   │   ├── sanpham.html/             # Trang tất cả sản phẩm gốc
│   │   │   ├── danhmucsp-banhkem.html/   # Trang danh mục Bánh kem gốc
│   │   │   ├── danhmucsp-banhngot.html/  # Trang danh mục Bánh ngọt gốc
│   │   │   ├── danhmucsp-banhnuong.html/ # Trang danh mục Bánh nướng gốc
│   │   │   ├── danhmucsp-banhquy.html/   # Trang danh mục Bánh quy gốc
│   │   │   ├── danhmucsp-banhmousse.html/# Trang danh mục Bánh mousse gốc
│   │   │   ├── danhmucsp-douong.html/    # Trang danh mục Đồ uống gốc
│   │   │   ├── product2.html/            # Trang chi tiết sản phẩm gốc: Gallery ảnh, Tab mô tả, Bảng dinh dưỡng
│   │   │   ├── login.html/               # Trang đăng nhập / đăng ký gốc với checklist mật khẩu tích xanh
│   │   │   ├── gioithieu.html/           # Trang giới thiệu gốc
│   │   │   ├── lienhe.html/              # Trang liên hệ gốc
│   │   │   ├── tintuc.html/              # Trang tin tức gốc
│   │   │   └── các trang chính sách html...
│   │   └── components/                   # LegacyHeader, LegacyFooter, LegacyCartDrawer, LegacyWishlistDrawer
│
├── database/                             # Script SQL Server thuần
│   └── Bakery_SqlServer_Schema_And_Data.sql # File .sql tạo Database, bảng, quan hệ & index
│
├── legacy/                               # Toàn bộ file HTML/CSS/JS cũ lưu giữ đầy đủ
├── run-backend.bat                       # Script 1-click khởi động Backend ASP.NET Core
├── run-frontend.bat                      # Script 1-click khởi động Frontend Next.js
└── README.md
```

---

## 🗄️ 2. CƠ SỞ DỮ LIỆU SQL SERVER

Backend kết nối tới SQL Server:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=BakeryDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true;"
}
```
- Khi chạy Backend lần đầu, hệ thống sẽ tự động khởi tạo database `BakeryDb` và tự động Seed toàn bộ **83 sản phẩm**, **6 danh mục**, **hình ảnh**, **giá trị dinh dưỡng** và **tài khoản mẫu**.
- File script SQL thuần nếu muốn kiểm tra qua SSMS: `database/Bakery_SqlServer_Schema_And_Data.sql`.

---

## 🚀 3. HƯỚNG DẪN KHỞI CHẠY HỆ THỐNG

1. Chạy file `run-backend.bat` để bật Backend .NET Core API (cổng 5169).
2. Chạy file `run-frontend.bat` để bật Frontend Next.js (cổng 3000).
3. Mở trình duyệt và truy cập:
   - **Trang chủ**: [http://localhost:3000](http://localhost:3000)
   - **Tất cả sản phẩm**: [http://localhost:3000/sanpham.html](http://localhost:3000/sanpham.html)
   - **Chi tiết sản phẩm**: [http://localhost:3000/product2.html?id=001](http://localhost:3000/product2.html?id=001)
   - **Đăng nhập**: [http://localhost:3000/login.html](http://localhost:3000/login.html)
   - **Backend Swagger UI**: [http://localhost:5169](http://localhost:5169)

---

## 🔑 4. TÀI KHOẢN MẪU

- **Admin**: `admin` / `Admin@123456`
- **Khách hàng**: `khachhang` / `Khach@123456`
