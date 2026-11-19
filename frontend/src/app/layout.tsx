import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WishlistDrawer } from '@/components/WishlistDrawer';
import { AuthModal } from '@/components/AuthModal';

export const metadata: Metadata = {
  title: 'HONEYQUE - Tiệm Bánh Ngọt Kiểu Pháp Châu Á',
  description: 'HONEYQUE không ngừng nghiên cứu và phát triển sản phẩm, mang đến những giá trị mới từ nông sản Việt.',
  icons: {
    icon: '/assets/img/Logo/logo-honeyque.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" />
      </head>
      <body className="bg-[#fcfaf7] text-gray-800 antialiased selection:bg-[#5D4037] selection:text-white">
        <Providers>
          <Header />
          <CartDrawer />
          <WishlistDrawer />
          <AuthModal />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
