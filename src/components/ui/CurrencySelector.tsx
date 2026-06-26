'use client';

import { useApp } from '@/hooks/AppProvider';
import { Currency } from '@/types';
import { CURRENCIES } from '@/lib/currency';

export function CurrencySelector() {
  const { currency, setCurrency } = useApp();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    >
      {Object.values(CURRENCIES).map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code}
        </option>
      ))}
    </select>
  );
}
