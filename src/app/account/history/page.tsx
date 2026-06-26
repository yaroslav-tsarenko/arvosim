'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { History, Search, ArrowRight, Globe, TrendingUp } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';

type StatusFilter = 'all' | 'active' | 'expired' | 'unused';

export default function PurchaseHistoryPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded, purchases, currency } = useApp();
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (authLoaded && !isAuthenticated) router.push('/sign-in');
  }, [authLoaded, isAuthenticated, router]);

  if (!authLoaded || !isAuthenticated) return null;

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);

  const filtered = purchases
    .filter((p) => filter === 'all' || p.status === filter)
    .filter((p) => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.coverage.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar activePath="/account/history" />
      <div className="flex-1 min-w-0 py-8 lg:pl-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text">Purchase History</h1>
            <p className="mt-1 text-text-light">{purchases.length} total purchases</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-light">Total Spent</p>
              <p className="text-lg font-bold text-text">{formatPrice(totalSpent, currency)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light" />
            <input type="text" placeholder="Search by plan or country..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2">
            {(['all', 'active', 'expired', 'unused'] as const).map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-surface text-text-light hover:bg-primary/10'}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 text-center">
            <History className="mx-auto h-12 w-12 text-text-light/30" />
            <p className="mt-3 text-lg text-text-light">No purchases found</p>
            <Link href="/locations" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
              Browse Plans <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 hidden md:block rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-surface/50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-text-light uppercase">Date</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-text-light uppercase">Plan</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-text-light uppercase">Data</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-text-light uppercase">Coverage</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-text-light uppercase">Price</th>
                    <th className="px-5 py-3 text-center text-xs font-semibold text-text-light uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-text-light">{new Date(p.purchasedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                      <td className="px-5 py-3.5 text-sm font-medium text-text">{p.name}</td>
                      <td className="px-5 py-3.5 text-sm text-text-light">{p.data} / {p.validity}</td>
                      <td className="px-5 py-3.5 text-sm text-text-light">{p.coverage}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-text text-right">{formatPrice(p.price, currency)}</td>
                      <td className="px-5 py-3.5 text-center">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.status === 'active' ? 'bg-success/10 text-success' : p.status === 'expired' ? 'bg-text-light/10 text-text-light' : 'bg-warning/10 text-warning'}`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 md:hidden space-y-3">
              {filtered.map((p) => (
                <div key={p.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text">{p.name}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-success/10 text-success' : p.status === 'expired' ? 'bg-text-light/10 text-text-light' : 'bg-warning/10 text-warning'}`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light"><Globe className="h-3.5 w-3.5" />{p.coverage}</div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-text-light">{p.data} / {p.validity}</span>
                    <span className="font-semibold text-text">{formatPrice(p.price, currency)}</span>
                  </div>
                  <p className="mt-2 text-xs text-text-light">{new Date(p.purchasedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
