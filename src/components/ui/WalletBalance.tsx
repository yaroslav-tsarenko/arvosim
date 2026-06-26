'use client';

import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export function WalletBalance() {
  const { balance, walletLoaded, currency } = useApp();

  if (!walletLoaded) return null;

  return (
    <Link
      href="/top-up"
      className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm font-medium text-text hover:bg-primary/5 transition-colors"
    >
      <Wallet className="h-4 w-4 text-primary" />
      <span>{formatPrice(balance, currency)}</span>
    </Link>
  );
}
