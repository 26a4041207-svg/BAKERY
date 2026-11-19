'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalCount: number;
  subTotal: number;
  shippingFee: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  totalCount: 0,
  subTotal: 0,
  shippingFee: 0,
  totalAmount: 0
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gio_hang');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('gio_hang', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: number) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subTotal > 0 && subTotal < 500000 ? 30000 : 0;
  const totalAmount = subTotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subTotal,
        shippingFee,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
