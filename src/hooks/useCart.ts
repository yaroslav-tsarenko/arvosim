'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  planId: string;
  name: string;
  data: string;
  validity: string;
  price: number;
  coverage: string;
}

const CART_KEY = 'arvosim_cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try { setItems(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newItems));
  }, []);

  const addItem = useCallback((item: CartItem) => {
    const existing = items.find((i) => i.planId === item.planId);
    if (existing) return;
    persist([...items, item]);
  }, [items, persist]);

  const removeItem = useCallback((planId: string) => {
    persist(items.filter((i) => i.planId !== planId));
  }, [items, persist]);

  const clearCart = useCallback(() => persist([]), [persist]);

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return { items, loaded, addItem, removeItem, clearCart, total, count: items.length };
}
