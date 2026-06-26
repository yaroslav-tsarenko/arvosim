'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { mainNav } from '@/data/navigation';
import { countries } from '@/data/countries';
import { regions } from '@/data/countries';
import { SearchBar } from '@/components/ui/SearchBar';
import { CurrencySelector } from '@/components/ui/CurrencySelector';
import { WalletBalance } from '@/components/ui/WalletBalance';
import { Logo } from '@/components/ui/Logo';
import { useApp } from '@/hooks/AppProvider';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount, isAuthenticated, user, logout } = useApp();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <SearchBar />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <Link
                href="/locations"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors"
              >
                Locations
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {locationsOpen && (
                <div className="absolute top-full left-0 z-50 pt-1 w-80">
                <div className="rounded-xl border border-border bg-white p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-1">
                    {regions.map((region) => (
                      <div key={region} className="mb-3">
                        <div className="px-2 py-1 text-xs font-semibold text-text-light uppercase tracking-wider">
                          {region}
                        </div>
                        {countries
                          .filter((c) => c.region === region)
                          .slice(0, 4)
                          .map((c) => (
                            <Link
                              key={c.slug}
                              href={`/locations/${c.slug}`}
                              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text hover:bg-surface transition-colors"
                              onClick={() => setLocationsOpen(false)}
                            >
                              <span>{c.flag}</span>
                              {c.name}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/locations"
                    className="mt-2 block text-center text-sm font-medium text-primary hover:text-primary-dark"
                    onClick={() => setLocationsOpen(false)}
                  >
                    View all locations →
                  </Link>
                </div>
                </div>
              )}
            </div>
            {mainNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden sm:block">
              <CurrencySelector />
            </div>
            <WalletBalance />
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-text-light hover:bg-surface hover:text-text transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="relative hidden sm:block" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
                <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:inline">{user?.name}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-xl border border-border bg-white py-2 shadow-lg">
                    <div className="px-4 py-2 border-b border-border">
                      <div className="text-sm font-medium text-text">{user?.name}</div>
                      <div className="text-xs text-text-light">{user?.email}</div>
                    </div>
                    <Link href="/account" className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-surface transition-colors" onClick={() => setUserMenuOpen(false)}>
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link href="/account/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-text hover:bg-surface transition-colors" onClick={() => setUserMenuOpen(false)}>
                      <User className="h-4 w-4" /> Settings
                    </Link>
                    <button onClick={async () => { await logout(); setUserMenuOpen(false); }} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-surface transition-colors">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="hidden sm:inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-text-light hover:bg-surface"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4 animate-fade-in">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="sm:hidden mb-4">
              <CurrencySelector />
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/top-up"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-light hover:bg-surface hover:text-text transition-colors"
              >
                Top Up
              </Link>
            </nav>
            {isAuthenticated ? (
              <div className="mt-4 space-y-2 sm:hidden">
                <Link href="/account" onClick={() => setMobileOpen(false)} className="block rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white">Dashboard</Link>
                <button onClick={async () => { await logout(); setMobileOpen(false); }} className="w-full rounded-xl border border-danger py-2.5 text-center text-sm font-medium text-danger">Sign Out</button>
              </div>
            ) : (
              <div className="mt-4 flex gap-3 sm:hidden">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="flex-1 rounded-xl border border-border py-2.5 text-center text-sm font-medium text-text hover:bg-surface transition-colors">Sign In</Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="flex-1 rounded-xl bg-primary py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-dark transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
