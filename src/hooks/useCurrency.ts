'use client';

import { useState, useEffect } from 'react';
import { Currency } from '@/types';

const CURRENCY_KEY = 'arvosim_currency';

export function useCurrency() {
  const [currency, setCurrencyState] = useState<Currency>('GBP');

  useEffect(() => {
    const stored = localStorage.getItem(CURRENCY_KEY) as Currency | null;
    if (stored && ['GBP', 'EUR', 'USD'].includes(stored)) {
      setCurrencyState(stored);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  return { currency, setCurrency };
}
