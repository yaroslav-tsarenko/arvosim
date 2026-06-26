'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Smartphone, History, Wallet, Settings, LogOut, Menu, X } from 'lucide-react';
import { useApp } from '@/hooks/AppProvider';

const links = [
  { href: '/account', label: 'Overview', icon: LayoutDashboard },
  { href: '/account/esims', label: 'My eSIMs', icon: Smartphone },
  { href: '/account/history', label: 'Purchase History', icon: History },
  { href: '/top-up', label: 'Top Up', icon: Wallet },
  { href: '/account/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar({ activePath }: { activePath: string }) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useApp();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/');
  }

  const nav = (
    <>
      <div className="px-4 py-4 border-b border-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-lg">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <p className="mt-2 font-semibold text-text">{user?.name}</p>
        <p className="text-xs text-text-light">{user?.email}</p>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = activePath === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-text-light hover:bg-surface hover:text-text'}`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/5 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      <button onClick={() => setOpen(!open)} className="lg:hidden fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && <div className="lg:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex flex-col bg-white border-r border-border transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        {nav}
      </aside>
    </>
  );
}
