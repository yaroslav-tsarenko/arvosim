'use client';

import Link from 'next/link';
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <section className="flex items-center justify-center px-4 py-16 md:py-24">
      <AnimatedSection className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          {status === 'success' ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-7 w-7 text-success" />
              </div>
              <h1 className="text-2xl font-bold text-text">Check your email</h1>
              <p className="mt-3 text-text-light">
                If an account exists for <span className="font-medium text-text">{email}</span>, we&apos;ve sent a password reset link. Check your inbox and spam folder.
              </p>
              <Link
                href="/sign-in"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-text">Forgot your password?</h1>
                <p className="mt-2 text-text-light">Enter your email address and we&apos;ll send you a link to reset your password.</p>
              </div>

              {status === 'error' && (
                <div className="mb-4 flex items-center gap-2 rounded-xl bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-4 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-text-light">
                Remember your password?{' '}
                <Link href="/sign-in" className="font-semibold text-primary hover:text-primary-dark">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
