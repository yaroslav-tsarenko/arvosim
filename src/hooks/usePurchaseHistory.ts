'use client';

import { useState, useEffect, useCallback } from 'react';

const PURCHASES_KEY = 'arvosim_purchases';

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

export function usePurchaseHistory() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PURCHASES_KEY);
    if (stored) {
      try { setPurchases(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  const addPurchase = useCallback((item: Omit<PurchaseRecord, 'id' | 'purchasedAt' | 'status'>) => {
    const record: PurchaseRecord = {
      ...item,
      id: `pur_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      purchasedAt: new Date().toISOString(),
      status: 'active',
    };
    setPurchases((prev) => {
      const updated = [record, ...prev];
      localStorage.setItem(PURCHASES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { purchases, loaded, addPurchase };
}
