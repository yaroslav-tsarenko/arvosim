'use client';

import { motion } from 'framer-motion';
import { Wifi, Clock, Globe, Signal } from 'lucide-react';
import { EsimPlan } from '@/types';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export function PlanCard({
  plan,
  onBuy,
}: {
  plan: EsimPlan;
  onBuy: (plan: EsimPlan) => void;
}) {
  const { currency } = useApp();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-primary">{plan.data}</span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {formatPrice(plan.price, currency)}
        </span>
      </div>
      <div className="space-y-3 flex-1">
        <div className="flex items-center gap-2 text-sm text-text-light">
          <Clock className="h-4 w-4" />
          <span>{plan.validity}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-light">
          <Globe className="h-4 w-4" />
          <span>{plan.coverage}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-light">
          <Signal className="h-4 w-4" />
          <span>{plan.networkType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-light">
          <Wifi className="h-4 w-4" />
          <span>Data only</span>
        </div>
      </div>
      <button
        onClick={() => onBuy(plan)}
        className="mt-5 w-full rounded-xl bg-primary py-3 text-center font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Buy Now — {formatPrice(plan.price, currency)}
      </button>
    </motion.div>
  );
}
