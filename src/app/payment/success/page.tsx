'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight, Mail, Smartphone } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function PaymentSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <div className="rounded-3xl border border-success/30 bg-success/5 p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Payment Successful</h1>
          <p className="text-text-light text-lg mb-8">
            Thank you! Your payment has been processed and your order is confirmed.
          </p>

          <div className="rounded-2xl border border-border bg-white p-6 text-left mb-8">
            <h2 className="font-semibold text-text mb-4">What happens next</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Check your email</h3>
                  <p className="text-sm text-text-light">
                    We&apos;ve sent your confirmation and eSIM QR code to your inbox.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-text">Activate your eSIM</h3>
                  <p className="text-sm text-text-light">
                    Scan the QR code and follow the setup instructions to get connected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/account/esims"
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
