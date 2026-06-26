'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Globe, Clock, Wifi, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export default function CartPage() {
  const { cartItems, cartLoaded, cartTotal, cartCount, removeFromCart, currency } = useApp();

  if (!cartLoaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="h-8 w-48 mx-auto rounded-lg bg-surface animate-pulse" />
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <AnimatedSection>
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-surface">
              <ShoppingCart className="h-10 w-10 text-text-light" />
            </div>
            <h1 className="text-2xl font-bold text-text mb-2">Your Cart is Empty</h1>
            <p className="text-text-light mb-8 max-w-md mx-auto">
              Browse our eSIM plans and find the perfect data package for your next trip.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Browse Locations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/regional"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-text transition-colors hover:bg-surface"
              >
                Regional Plans
              </Link>
              <Link
                href="/global"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-text transition-colors hover:bg-surface"
              >
                Global Plans
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-text mb-2">Shopping Cart</h1>
        <p className="text-text-light">
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </AnimatedSection>

      {/* Cart items */}
      <div className="mt-8 space-y-4">
        {cartItems.map((item, idx) => (
          <AnimatedSection key={item.planId} delay={idx * 0.05}>
            <motion.div
              layout
              className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 sm:p-6"
            >
              {/* Plan icon */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Wifi className="h-6 w-6 text-primary" />
              </div>

              {/* Plan details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-text">{item.name}</h3>
                <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-light">
                  <span className="flex items-center gap-1">
                    <Wifi className="h-3.5 w-3.5" />
                    {item.data}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {item.validity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    {item.coverage}
                  </span>
                </div>
              </div>

              {/* Price and remove */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-lg font-bold text-text">
                  {formatPrice(item.price, currency)}
                </span>
                <button
                  onClick={() => removeFromCart(item.planId)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-danger transition-colors hover:bg-danger/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>

      {/* Cart summary */}
      <AnimatedSection delay={0.1}>
        <div className="mt-8 rounded-2xl border border-border bg-surface/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-light">Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            <span className="text-lg font-semibold text-text">{formatPrice(cartTotal, currency)}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-bold text-text">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal, currency)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/locations"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 font-medium text-text transition-colors hover:bg-surface"
          >
            Continue Shopping
          </Link>
        </div>
      </AnimatedSection>
    </div>
  );
}
