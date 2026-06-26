'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export function TopUpCard({
  amount,
  popular,
  onSelect,
  selected,
}: {
  amount: number;
  popular?: boolean;
  onSelect: (amount: number) => void;
  selected: boolean;
}) {
  const { currency } = useApp();

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(amount)}
      className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-6 transition-all ${
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-white hover:border-primary/30 hover:shadow-sm'
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-white">
          Popular
        </span>
      )}
      <span className="text-2xl font-bold text-text">{formatPrice(amount, currency)}</span>
      <span className="text-sm text-text-light">Top up</span>
    </motion.button>
  );
}
