'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Smartphone, Globe, Clock, Wifi, Signal, ArrowRight, Filter } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

type StatusFilter = 'all' | 'active' | 'expired' | 'unused';

export default function MyEsimsPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded, purchases, currency } = useApp();
  const [filter, setFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    if (authLoaded && !isAuthenticated) router.push('/sign-in');
  }, [authLoaded, isAuthenticated, router]);

  if (!authLoaded || !isAuthenticated) return null;

  const filtered = filter === 'all' ? purchases : purchases.filter((p) => p.status === filter);
  const statusCounts = {
    all: purchases.length,
    active: purchases.filter((p) => p.status === 'active').length,
    expired: purchases.filter((p) => p.status === 'expired').length,
    unused: purchases.filter((p) => p.status === 'unused').length,
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar activePath="/account/esims" />
      <div className="flex-1 min-w-0 py-8 lg:pl-10">
        <h1 className="text-2xl font-bold text-text">My eSIMs</h1>
        <p className="mt-1 text-text-light">Manage your purchased eSIM plans.</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-text-light" />
          {(['all', 'active', 'expired', 'unused'] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-surface text-text-light hover:bg-primary/10'}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s]})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 text-center">
            <Smartphone className="mx-auto h-12 w-12 text-text-light/30" />
            <p className="mt-3 text-lg text-text-light">{filter === 'all' ? 'No eSIMs yet' : `No ${filter} eSIMs`}</p>
            <Link href="/locations" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
              Browse Plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    p.status === 'active' ? 'bg-success/10 text-success' :
                    p.status === 'expired' ? 'bg-text-light/10 text-text-light' :
                    'bg-warning/10 text-warning'
                  }`}>{p.status.toUpperCase()}</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(p.price, currency)}</span>
                </div>
                <h3 className="font-semibold text-text text-lg">{p.name}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-light"><Wifi className="h-4 w-4" />{p.data}</div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Clock className="h-4 w-4" />{p.validity}</div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Globe className="h-4 w-4" />{p.coverage}</div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Signal className="h-4 w-4" />4G/LTE</div>
                </div>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-text-light">Purchased {new Date(p.purchasedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
