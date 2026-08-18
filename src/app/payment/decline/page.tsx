'use client';

import Link from 'next/link';
import { XCircle, ArrowRight, RefreshCw, CreditCard, LifeBuoy } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function PaymentDeclinePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <div className="rounded-3xl border border-danger/30 bg-danger/5 p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
            <XCircle className="h-10 w-10 text-danger" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Payment Declined</h1>
          <p className="text-text-light text-lg mb-8">
            Unfortunately your payment could not be processed. No charge has been made to your account.
          </p>

          <div className="rounded-2xl border border-border bg-white p-6 text-left mb-8">
            <h2 className="font-semibold text-text mb-4">What you can do</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Check your payment details</h3>
                  <p className="text-sm text-text-light">
                    Make sure your card details and available funds are correct, then try again.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <LifeBuoy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Contact support</h3>
                  <p className="text-sm text-text-light">
                    If the problem continues, our team is here to help you complete your order.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-text hover:bg-surface"
            >
              Contact Support
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
