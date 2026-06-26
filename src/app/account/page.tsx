'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wallet, ShoppingBag, Smartphone, TrendingUp, ArrowRight, Globe, Clock } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded, user, balance, currency, purchases } = useApp();

  useEffect(() => {
    if (authLoaded && !isAuthenticated) router.push('/sign-in');
  }, [authLoaded, isAuthenticated, router]);

  if (!authLoaded || !isAuthenticated) return null;

  const activePurchases = purchases.filter((p) => p.status === 'active');
  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);
  const recentPurchases = purchases.slice(0, 5);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar activePath="/account" />
      <div className="flex-1 min-w-0 py-8 lg:pl-10">
        <h1 className="text-2xl font-bold text-text">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-text-light">Here&apos;s an overview of your account.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Wallet className="h-5 w-5 text-primary" /></div>
              <div><p className="text-sm text-text-light">Balance</p><p className="text-xl font-bold text-text">{formatPrice(balance, currency)}</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10"><Smartphone className="h-5 w-5 text-success" /></div>
              <div><p className="text-sm text-text-light">Active eSIMs</p><p className="text-xl font-bold text-text">{activePurchases.length}</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10"><ShoppingBag className="h-5 w-5 text-accent" /></div>
              <div><p className="text-sm text-text-light">Total Purchases</p><p className="text-xl font-bold text-text">{purchases.length}</p></div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10"><TrendingUp className="h-5 w-5 text-warning" /></div>
              <div><p className="text-sm text-text-light">Total Spent</p><p className="text-xl font-bold text-text">{formatPrice(totalSpent, currency)}</p></div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-text">Recent Purchases</h2>
              {purchases.length > 0 && <Link href="/account/history" className="text-sm font-medium text-primary hover:text-primary-dark">View all →</Link>}
            </div>
            {recentPurchases.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-text-light/30" />
                <p className="mt-3 text-text-light">No purchases yet.</p>
                <Link href="/locations" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark">Browse plans <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPurchases.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 rounded-xl bg-surface/50 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0"><Globe className="h-5 w-5 text-primary" /></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-text truncate">{p.name}</p>
                      <p className="text-xs text-text-light flex items-center gap-2"><span>{p.data}</span><span className="flex items-center gap-0.5"><Clock className="h-3 w-3" />{p.validity}</span></p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-semibold text-text">{formatPrice(p.price, currency)}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-success/10 text-success' : p.status === 'expired' ? 'bg-text-light/10 text-text-light' : 'bg-warning/10 text-warning'}`}>{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <Wallet className="h-8 w-8 text-primary mb-3" />
              <p className="text-sm text-text-light">Wallet Balance</p>
              <p className="text-3xl font-bold text-text mt-1">{formatPrice(balance, currency)}</p>
              <Link href="/top-up" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">Top Up Balance <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <Link href="/locations" className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all">
              <Globe className="h-8 w-8 text-accent" />
              <div><p className="font-semibold text-text">Browse Plans</p><p className="text-xs text-text-light">40+ countries available</p></div>
              <ArrowRight className="h-4 w-4 text-text-light ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
