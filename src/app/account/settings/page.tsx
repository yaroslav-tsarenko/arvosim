'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Shield, Bell, Globe, Trash2, LogOut, AlertTriangle } from 'lucide-react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Switch } from '@/components/ui/Switch';
import { useApp } from '@/hooks/AppProvider';
import { CURRENCIES } from '@/lib/currency';
import { Currency } from '@/types';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, authLoaded, user, currency, setCurrency, logout } = useApp();
  const [notifications, setNotifications] = useState({ email: true, marketing: false, priceAlerts: true });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authLoaded && !isAuthenticated) router.push('/sign-in');
  }, [authLoaded, isAuthenticated, router]);

  if (!authLoaded || !isAuthenticated) return null;

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar activePath="/account/settings" />
      <div className="flex-1 min-w-0 py-8 lg:pl-10 max-w-3xl">
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="mt-1 text-text-light">Manage your account preferences.</p>

        {saved && (
          <div className="mt-4 rounded-xl bg-success/5 border border-success/20 px-4 py-3 text-sm text-success font-medium">
            Settings saved successfully.
          </div>
        )}

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-text">Profile</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Name</label>
                <input type="text" defaultValue={user?.name} className="w-full rounded-xl border border-border bg-surface/50 px-4 py-2.5 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                <input type="email" defaultValue={user?.email} disabled className="w-full rounded-xl border border-border bg-surface/30 px-4 py-2.5 text-sm text-text-light cursor-not-allowed" />
                <p className="mt-1 text-xs text-text-light">Email cannot be changed for test accounts.</p>
              </div>
              <button onClick={handleSave} className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors">Save Changes</button>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-text">Currency Preference</h2>
            </div>
            <p className="text-sm text-text-light mb-3">All prices will be displayed in your selected currency.</p>
            <div className="flex gap-3">
              {Object.values(CURRENCIES).map((c) => (
                <button key={c.code} onClick={() => setCurrency(c.code as Currency)} className={`rounded-xl px-5 py-2.5 text-sm font-medium border-2 transition-all ${currency === c.code ? 'border-primary bg-primary/5 text-primary' : 'border-border text-text-light hover:border-primary/30'}`}>
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-text">Notifications</h2>
            </div>
            <div className="space-y-4">
              {[
                { key: 'email' as const, label: 'Email Notifications', desc: 'Receive order confirmations and eSIM activation updates' },
                { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Get news about deals, new destinations, and promotions' },
                { key: 'priceAlerts' as const, label: 'Price Alerts', desc: 'Be notified when prices drop for your favourite destinations' },
              ].map(({ key, label, desc }) => (
                <label key={key} htmlFor={`notif-${key}`} className="flex items-center justify-between gap-4 rounded-xl px-1 py-1 cursor-pointer">
                  <div>
                    <p className="text-sm font-medium text-text">{label}</p>
                    <p className="text-xs text-text-light mt-0.5">{desc}</p>
                  </div>
                  <Switch
                    id={`notif-${key}`}
                    checked={notifications[key]}
                    onChange={(val) => setNotifications((n) => ({ ...n, [key]: val }))}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-text">Security</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Change Password</label>
              <p className="text-sm text-text-light mb-3">Password changes are not available for test accounts.</p>
              <input type="password" placeholder="Current password" disabled className="w-full rounded-xl border border-border bg-surface/30 px-4 py-2.5 text-sm text-text-light cursor-not-allowed" />
            </div>
          </div>

          <div className="rounded-2xl border border-danger/20 bg-danger/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-danger" />
              <h2 className="font-semibold text-danger">Danger Zone</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { logout(); router.push('/'); }} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-text hover:bg-surface transition-colors">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
              <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center justify-center gap-2 rounded-xl border border-danger bg-white px-5 py-2.5 text-sm font-medium text-danger hover:bg-danger/5 transition-colors">
                <Trash2 className="h-4 w-4" /> Delete Account
              </button>
            </div>
            {showDeleteConfirm && (
              <div className="mt-4 rounded-xl border border-danger/30 bg-white p-4">
                <p className="text-sm text-text mb-3">This action is not available for test accounts. In a production environment, this would permanently delete your account and all associated data.</p>
                <button onClick={() => setShowDeleteConfirm(false)} className="rounded-lg bg-surface px-4 py-2 text-sm font-medium text-text hover:bg-border transition-colors">Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
