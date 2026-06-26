'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Country } from '@/types';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export function CountryCard({ country }: { country: Country }) {
  const { currency } = useApp();
  const lowestPrice = Math.min(...country.plans.map((p) => p.price));

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        href={`/locations/${country.slug}`}
        className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
      >
        <span className="text-5xl">{country.flag}</span>
        <h3 className="font-semibold text-text">{country.name}</h3>
        <p className="text-sm text-text-light">
          From <span className="font-semibold text-primary">{formatPrice(lowestPrice, currency)}</span>
        </p>
      </Link>
    </motion.div>
  );
}
