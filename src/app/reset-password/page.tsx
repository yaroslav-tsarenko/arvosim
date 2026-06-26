'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useState, Suspense } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!token) {
    return (
      <div className="text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-danger" />
        <h1 className="mt-4 text-2xl font-bold text-text">Invalid Reset Link</h1>
        <p className="mt-2 text-text-light">This password reset link is invalid or has expired.</p>
        <Link
          href="/forgot-password"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Request a new link
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
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

  if (status === 'success') {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-7 w-7 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text">Password Reset</h1>
        <p className="mt-3 text-text-light">Your password has been successfully reset. You can now sign in with your new password.</p>
        <Link
          href="/sign-in"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text">Set new password</h1>
        <p className="mt-2 text-text-light">Enter your new password below.</p>
      </div>

      {status === 'error' && errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-danger/5 border border-danger/20 px-4 py-3 text-sm text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text">New password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-text">Confirm new password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
            <input
              id="confirm"
              type={showConfirm ? 'text' : 'password'}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your password"
              className="w-full rounded-xl border border-border bg-surface/50 py-2.5 pl-10 pr-10 text-sm text-text placeholder:text-text-light/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text">
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-text-light">
        <Link href="/sign-in" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-dark">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
        </Link>
      </p>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="flex items-center justify-center px-4 py-16 md:py-24">
      <AnimatedSection className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <Suspense fallback={<div className="text-center text-text-light">Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </AnimatedSection>
    </section>
  );
}
