'use client';

import { useState } from 'react';
import { Wallet, CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TopUpCard } from '@/components/cards/TopUpCard';
import { PaymentLogos } from '@/components/ui/PaymentLogos';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';
import { topUpOptions } from '@/data/navigation';

export default function TopUpPage() {
  const { balance, balanceLoaded, topUp, currency, isAuthenticated } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const effectiveAmount = useCustom ? parseFloat(customAmount) || 0 : selectedAmount ?? 0;
  const isValidAmount = effectiveAmount >= 10;

  function handleSelectPreset(amount: number) {
    setSelectedAmount(amount);
    setUseCustom(false);
    setCustomAmount('');
    setError('');
  }

  function handleCustomFocus() {
    setUseCustom(true);
    setSelectedAmount(null);
  }

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  async function handlePayment() {
    if (!isValidAmount) {
      setError('Minimum top-up amount is £10.');
      return;
    }
    if (!isAuthenticated) {
      setError('Please sign in to top up your balance.');
      return;
    }
    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 13) {
      setError('Please enter a valid card number.');
      return;
    }
    if (expiry.length < 5) {
      setError('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cvc.length < 3) {
      setError('Please enter a valid CVC.');
      return;
    }

    setProcessing(true);
    setError('');

    const ok = await topUp(effectiveAmount);
    if (ok) {
      setSuccess(true);
    } else {
      setError('Top-up failed. Please try again.');
    }
    setProcessing(false);
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <AnimatedSection>
          <div className="rounded-3xl border border-success/30 bg-success/5 p-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-text mb-2">Payment Successful</h2>
            <p className="text-text-light mb-2">
              {formatPrice(effectiveAmount, currency)} has been added to your balance.
            </p>
            <p className="text-lg font-semibold text-text mb-8">
              New balance: {formatPrice(balance, currency)}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/locations"
                className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Browse eSIMs
              </a>
              <button
                onClick={() => {
                  setSuccess(false);
                  setSelectedAmount(null);
                  setCustomAmount('');
                  setUseCustom(false);
                  setCardNumber('');
                  setExpiry('');
                  setCvc('');
                }}
                className="rounded-xl border border-border px-6 py-3 font-semibold text-text transition-colors hover:bg-surface"
              >
                Top Up Again
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSection>
        <SectionHeader
          title="Top Up Your Balance"
          subtitle="Add funds to your ArvoSim balance and purchase eSIMs instantly."
        />
      </AnimatedSection>

      {/* Current balance */}
      <AnimatedSection delay={0.1}>
        <div className="mt-10 flex items-center justify-center">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Wallet className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-text-light">Current Balance</span>
            </div>
            <span className="text-4xl font-bold text-primary">
              {balanceLoaded ? formatPrice(balance, currency) : '...'}
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* Amount selection */}
      <AnimatedSection delay={0.15}>
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-text mb-4 text-center">Select Amount</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {topUpOptions.map((opt) => (
              <TopUpCard
                key={opt.amount}
                amount={opt.amount}
                popular={opt.popular}
                onSelect={handleSelectPreset}
                selected={!useCustom && selectedAmount === opt.amount}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Custom amount */}
      <AnimatedSection delay={0.2}>
        <div className="mt-8">
          <label className="block text-sm font-medium text-text-light mb-2 text-center">
            Or enter a custom amount (minimum £10)
          </label>
          <div className="mx-auto max-w-xs">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light font-medium">
                £
              </span>
              <input
                type="number"
                min="10"
                step="1"
                placeholder="10.00"
                value={customAmount}
                onFocus={handleCustomFocus}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setUseCustom(true);
                  setSelectedAmount(null);
                  setError('');
                }}
                className={`w-full rounded-xl border-2 py-3 pl-8 pr-4 text-center text-lg font-semibold outline-none transition-all ${
                  useCustom && customAmount
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white hover:border-primary/30'
                }`}
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Card payment form */}
      <AnimatedSection delay={0.25}>
        <div className="mt-12 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-text-light" />
              <h3 className="text-lg font-semibold text-text">Card Details</h3>
            </div>
            <PaymentLogos />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1.5">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                className="w-full rounded-xl border border-border px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-light mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full rounded-xl border border-border px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-light mb-1.5">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="w-full rounded-xl border border-border px-4 py-3 text-text outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-danger/10 px-4 py-2.5 text-sm text-danger">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={processing || !isValidAmount}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
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
                <Lock className="h-4 w-4" />
                Pay {isValidAmount ? formatPrice(effectiveAmount, currency) : 'by Card'}
              </>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-text-light flex items-center justify-center gap-1">
            <Lock className="h-3 w-3" />
            Payments are secured with 256-bit SSL encryption
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
