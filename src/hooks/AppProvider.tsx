'use client';

import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { useCurrency } from './useCurrency';
import { useCart, CartItem } from './useCart';
import { useAuth, User } from './useAuth';
import { Currency } from '@/types';

export interface PurchaseRecord {
  id: string;
  planId: string;
  name: string;
  data: string;
  validity: string;
  price: number;
  coverage: string;
  purchasedAt: string;
  status: 'active' | 'expired' | 'unused';
}

interface AppContextType {
  balance: number;
  walletLoaded: boolean;
  topUp: (amount: number) => Promise<boolean>;
  spend: (amount: number) => Promise<boolean>;
  canAfford: (amount: number) => boolean;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cartItems: CartItem[];
  cartLoaded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (planId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isAuthenticated: boolean;
  user: User | null;
  authLoaded: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, extra?: { firstName?: string; lastName?: string; phone?: string; dateOfBirth?: string; address?: { street: string; city: string; country: string; postalCode: string } }) => Promise<{ ok: boolean; error?: string }>;
  purchases: PurchaseRecord[];
  purchasesLoaded: boolean;
  buyItems: (items: CartItem[]) => Promise<{ ok: boolean; error?: string }>;
  refreshPurchases: () => Promise<void>;
  refreshBalance: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const curr = useCurrency();
  const cart = useCart();
  const auth = useAuth();

  const [balance, setBalance] = useState(0);
  const [walletLoaded, setWalletLoaded] = useState(false);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [purchasesLoaded, setPurchasesLoaded] = useState(false);

  const refreshBalance = useCallback(async () => {
    if (!auth.isAuthenticated) return;
    try {
      const res = await fetch('/api/wallet/balance');
      const data = await res.json();
      if (res.ok) setBalance(data.balance);
    } catch { /* ignore */ }
    setWalletLoaded(true);
  }, [auth.isAuthenticated]);

  const refreshPurchases = useCallback(async () => {
    if (!auth.isAuthenticated) return;
    try {
      const res = await fetch('/api/purchases');
      const data = await res.json();
      if (res.ok) setPurchases(data.purchases);
    } catch { /* ignore */ }
    setPurchasesLoaded(true);
  }, [auth.isAuthenticated]);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      setBalance(auth.user.balance);
      setWalletLoaded(true);
      refreshPurchases();
    } else if (auth.loaded) {
      setBalance(0);
      setWalletLoaded(true);
      setPurchases([]);
      setPurchasesLoaded(true);
    }
  }, [auth.isAuthenticated, auth.loaded, auth.user, refreshPurchases]);

  const topUp = useCallback(async (amount: number): Promise<boolean> => {
    try {
      const res = await fetch('/api/wallet/topup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setBalance(data.balance);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  const buyItems = useCallback(async (items: CartItem[]): Promise<{ ok: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/purchases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (res.ok) {
        setBalance(data.balance);
        await refreshPurchases();
        return { ok: true };
      }
      return { ok: false, error: data.error || 'Purchase failed' };
    } catch {
      return { ok: false, error: 'Network error' };
    }
  }, [refreshPurchases]);

  const spend = useCallback(async (amount: number): Promise<boolean> => {
    // This is kept for compatibility — real spending goes through buyItems
    return amount <= balance;
  }, [balance]);

  const canAfford = useCallback((amount: number) => balance >= amount, [balance]);

  return (
    <AppContext.Provider
      value={{
        balance,
        walletLoaded,
        topUp,
        spend,
        canAfford,
        currency: curr.currency,
        setCurrency: curr.setCurrency,
        cartItems: cart.items,
        cartLoaded: cart.loaded,
        addToCart: cart.addItem,
        removeFromCart: cart.removeItem,
        clearCart: cart.clearCart,
        cartTotal: cart.total,
        cartCount: cart.count,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        authLoaded: auth.loaded,
        login: auth.login,
        logout: auth.logout,
        register: auth.register,
        purchases,
        purchasesLoaded,
        buyItems,
        refreshPurchases,
        refreshBalance,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
