'use client';

import { useState, useEffect, useCallback } from 'react';

const WALLET_KEY = 'arvosim_wallet_balance';

export function useWallet() {
  const [balance, setBalance] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(WALLET_KEY);
    if (stored) setBalance(parseFloat(stored));
    setLoaded(true);
  }, []);

  const persist = useCallback((val: number) => {
    setBalance(val);
    localStorage.setItem(WALLET_KEY, val.toFixed(2));
  }, []);

  const topUp = useCallback((amount: number) => {
    persist(balance + amount);
  }, [balance, persist]);

  const spend = useCallback((amount: number): boolean => {
    if (amount > balance) return false;
    persist(balance - amount);
    return true;
  }, [balance, persist]);

  const canAfford = useCallback((amount: number) => balance >= amount, [balance]);

  return { balance, loaded, topUp, spend, canAfford };
}
