'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Wallet,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Wifi,
  Clock,
  Globe,
  PartyPopper,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, balance, walletLoaded, canAfford, clearCart, currency, buyItems, isAuthenticated } = useApp();
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const [purchasedItems, setPurchasedItems] = useState<typeof cartItems>([]);
  const [paidTotal, setPaidTotal] = useState(0);

  async function handlePay() {
    setProcessing(true);
    setError('');
    const result = await buyItems(cartItems);
    if (result.ok) {
      setPurchasedItems([...cartItems]);
      setPaidTotal(cartTotal);
      clearCart();
      setCompleted(true);
    } else {
      setError(result.error || 'Purchase failed');
    }
    setProcessing(false);
  }

  // Empty cart redirect
  if (!completed && walletLoaded && cartCount === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <AnimatedSection>
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <ShoppingCart className="h-8 w-8 text-text-light" />
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">Nothing to Checkout</h1>
          <p className="text-text-light mb-6">Your cart is empty. Add some eSIM plans first.</p>
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            Browse Plans
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    );
  }

  // Success state
  if (completed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <div className="rounded-3xl border border-success/30 bg-success/5 p-8 sm:p-10 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <PartyPopper className="h-10 w-10 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-text mb-2">Order Confirmed!</h1>
            <p className="text-text-light text-lg mb-6">
              Your eSIM{purchasedItems.length > 1 ? 's are' : ' is'} ready to activate. Check your email for the QR code and setup instructions.
            </p>

            {/* Order summary */}
            <div className="rounded-xl border border-border bg-white p-5 text-left mb-6">
              <h3 className="font-semibold text-text mb-3">Order Summary</h3>
              {purchasedItems.map((item) => (
                <div key={item.planId} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="font-medium text-text">{item.name}</span>
                    <span className="text-sm text-text-light ml-2">{item.data} / {item.validity}</span>
                  </div>
                  <span className="font-semibold text-text">{formatPrice(item.price, currency)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 mt-1">
                <span className="font-bold text-text">Total Paid</span>
                <span className="font-bold text-primary text-lg">{formatPrice(paidTotal, currency)}</span>
              </div>
            </div>

            <p className="text-sm text-text-light mb-6">
              Remaining wallet balance: <span className="font-semibold text-text">{formatPrice(balance, currency)}</span>
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/account"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
              >
                View My eSIMs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-text hover:bg-surface"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  const affordable = canAfford(cartTotal);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <AnimatedSection>
        <h1 className="text-3xl font-bold text-text mb-2">Checkout</h1>
        <p className="text-text-light">Review your order and complete payment.</p>
      </AnimatedSection>

      {!isAuthenticated && (
        <AnimatedSection delay={0.05}>
          <div className="mt-6 rounded-2xl border border-warning/30 bg-warning/5 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-text mb-1">Sign in required</h3>
                <p className="text-sm text-text-light mb-3">You need to sign in to complete your purchase.</p>
                <Link href="/sign-in" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">Sign In <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {error && (
        <div className="mt-4 rounded-xl bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">{error}</div>
      )}

      {/* Order items */}
      <AnimatedSection delay={0.1}>
        <div className="mt-8 rounded-2xl border border-border bg-white p-6">
          <h2 className="font-semibold text-text mb-4">Order Items</h2>
          <div className="divide-y divide-border">
            {cartItems.map((item) => (
              <div key={item.planId} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Wifi className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-text">{item.name}</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-text-light mt-0.5">
                    <span className="flex items-center gap-1"><Wifi className="h-3 w-3" />{item.data}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.validity}</span>
                    <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{item.coverage}</span>
                  </div>
                </div>
                <span className="font-semibold text-text">{formatPrice(item.price, currency)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-lg font-bold text-text">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(cartTotal, currency)}</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Payment section */}
      <AnimatedSection delay={0.15}>
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-text">Pay with Wallet</h2>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-surface p-4 mb-4">
            <span className="text-text-light">Your wallet balance</span>
            <span className={`text-xl font-bold ${affordable ? 'text-primary' : 'text-danger'}`}>
              {walletLoaded ? formatPrice(balance, currency) : '...'}
            </span>
          </div>

          {affordable ? (
            <>
              <p className="text-sm text-text-light mb-4">
                {formatPrice(cartTotal, currency)} will be deducted from your wallet. Remaining balance after purchase:{' '}
                <span className="font-semibold text-text">{formatPrice(balance - cartTotal, currency)}</span>
              </p>
              <button
                onClick={handlePay}
                disabled={processing}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
              >
                {processing ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    Pay {formatPrice(cartTotal, currency)} with Balance
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="rounded-xl border border-warning/30 bg-warning/5 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text mb-1">Insufficient Balance</h3>
                  <p className="text-sm text-text-light mb-1">
                    You need {formatPrice(cartTotal - balance, currency)} more to complete this purchase.
                  </p>
                  <p className="text-sm text-text-light">
                    Top up your wallet and come back to finish checkout.
                  </p>
                </div>
              </div>
              <Link
                href="/top-up"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <Wallet className="h-4 w-4" />
                Top Up Wallet
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Back to cart */}
      <AnimatedSection delay={0.2}>
        <Link
          href="/cart"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 font-medium text-text transition-colors hover:bg-surface"
        >
          Back to Cart
        </Link>
      </AnimatedSection>
    </div>
  );
}
