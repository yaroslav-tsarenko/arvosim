'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  Zap,
  Phone,
  Shield,
  Wifi,
  CreditCard,
  QrCode,
  MapPin,
  ArrowRight,
  Headphones,
  Sparkles,
  Clock,
  Signal,
} from 'lucide-react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CountryCard } from '@/components/cards/CountryCard';
import { BlogCard } from '@/components/cards/BlogCard';
import { HeroSimCards } from '@/components/ui/HeroSimCards';
import { getPopularCountries, countries } from '@/data/countries';
import { regionalPlans } from '@/data/regional';
import { globalPlans } from '@/data/global';
import { blogArticles } from '@/data/blog';
import { generalFaqs } from '@/data/faqs';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';
import { getFlagForCountry } from '@/lib/flags';

type PlanTab = 'popular' | 'local' | 'regional' | 'global';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<PlanTab>('popular');
  const { currency, balance, isAuthenticated } = useApp();
  const popular = getPopularCountries();

  const tabs: { key: PlanTab; label: string }[] = [
    { key: 'popular', label: 'Popular' },
    { key: 'local', label: 'Local eSIMs' },
    { key: 'regional', label: 'Regional' },
    { key: 'global', label: 'Global' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-accent-light/20 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left — text */}
            <div className="text-center lg:text-left">
              <AnimatedSection>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  <Sparkles className="h-4 w-4" />
                  Trusted by 500,000+ travellers worldwide
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl lg:text-6xl">
                  Stay Connected{' '}
                  <span className="text-primary">Worldwide</span>
                </h1>
                <p className="mt-5 text-lg text-text-light md:text-xl max-w-xl mx-auto lg:mx-0">
                  Affordable eSIM data plans for 190+ countries. Buy online, scan a QR code, and get online in minutes — no physical SIM needed.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <div className="mt-8 max-w-xl mx-auto lg:mx-0">
                  <SearchBar large />
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {['🇺🇸 USA', '🇬🇧 UK', '🇹🇷 Turkey', '🇯🇵 Japan', '🇫🇷 France', '🇪🇸 Spain'].map((c) => (
                    <span key={c} className="rounded-full bg-white border border-border px-3 py-1 text-sm text-text-light shadow-sm">{c}</span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right — SIM card visuals */}
            <AnimatedSection delay={0.1} className="hidden md:block">
              <HeroSimCards />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Plan Tabs */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Find Your Perfect Plan"
              subtitle="Whether you need data for a single country or across entire continents, we have a plan that fits."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-xl border border-border bg-surface p-1 gap-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
                      activeTab === tab.key
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-text-light hover:text-text'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <div className="mt-10">
            {activeTab === 'popular' && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {popular.map((country) => (
                  <CountryCard key={country.slug} country={country} />
                ))}
              </div>
            )}

            {activeTab === 'local' && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {countries.slice(0, 12).map((country) => (
                  <CountryCard key={country.slug} country={country} />
                ))}
              </div>
            )}

            {activeTab === 'regional' && (
              <div className="grid gap-5 sm:grid-cols-2">
                {regionalPlans.map((rp) => {
                  const imgMap: Record<string, string> = { Europe: '/illustrations/continent-europe.svg', Asia: '/illustrations/continent-asia.svg', 'Middle East': '/illustrations/continent-middle-east.svg', Americas: '/illustrations/continent-americas.svg' };
                  return (
                  <div
                    key={rp.id}
                    className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <Image src={imgMap[rp.region] || imgMap.Europe} alt={rp.region} width={40} height={40} className="h-10 w-10 rounded-lg" />
                      <h3 className="text-xl font-bold text-text">{rp.region}</h3>
                    </div>
                    <p className="mt-2 text-sm text-text-light">{rp.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {rp.countries.slice(0, 5).map((c) => (
                        <span
                          key={c}
                          className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-light"
                        >
                          <span>{getFlagForCountry(c)}</span>
                          {c}
                        </span>
                      ))}
                      {rp.countries.length > 5 && (
                        <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary">
                          +{rp.countries.length - 5} more
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-sm text-text-light">
                      From{' '}
                      <span className="font-semibold text-primary">
                        {formatPrice(rp.plans[0].price, currency)}
                      </span>
                    </p>
                  </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'global' && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {globalPlans.map((gp) => (
                  <div
                    key={gp.id}
                    className="rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-text">{gp.name}</h3>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {formatPrice(gp.price, currency)}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-text-light">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        <span>{gp.data}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{gp.validity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{gp.countriesCount} countries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4" />
                        <span>{gp.networkType}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Browse All Destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="How It Works"
              subtitle="Get connected in three simple steps. No store visits, no waiting, no hassle."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                step: '1',
                title: 'Choose Your Destination',
                description:
                  'Browse our coverage of 190+ countries and regions. Select a local, regional, or global data plan that matches your trip.',
              },
              {
                icon: QrCode,
                step: '2',
                title: 'Purchase & Install',
                description:
                  'Complete your purchase securely online. You will receive a QR code instantly — scan it with your phone to install the eSIM in under 5 minutes.',
              },
              {
                icon: Wifi,
                step: '3',
                title: 'Stay Connected',
                description:
                  'Your eSIM activates when you arrive at your destination. Enjoy fast mobile data while keeping your regular number active for calls and texts.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative rounded-2xl bg-white p-8 shadow-sm text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-sm font-bold text-text-light">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Learn more about eSIMs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Why Choose ArvoSim"
              subtitle="We make staying connected abroad simple, affordable, and stress-free."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: 'No Roaming Fees',
                description:
                  'Pay local rates instead of expensive carrier roaming charges. Save up to 90% compared to traditional roaming.',
              },
              {
                icon: Zap,
                title: 'Instant Setup',
                description:
                  'Buy online and install in under 5 minutes by scanning a QR code. No store visits, no shipping, no waiting.',
              },
              {
                icon: Phone,
                title: 'Keep Your Number',
                description:
                  'Your eSIM runs alongside your regular SIM. Keep your home number active for calls and texts while travelling.',
              },
              {
                icon: Globe,
                title: '190+ Countries',
                description:
                  'From local plans for single countries to global packages covering entire continents. We have you covered wherever you go.',
              },
            ].map((benefit, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 hover:border-primary/20 transition-colors">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-text">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-text-light leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Top-up / Balance */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12 md:flex md:items-center md:gap-12">
              <div className="mb-8 md:mb-0 md:flex-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-light">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-text md:text-3xl">
                  Simple Wallet Top-Up
                </h2>
                <p className="mt-3 text-text-light leading-relaxed">
                  Add funds to your ArvoSim wallet and purchase plans instantly. Your balance never expires, and you can top up anytime with a minimum of just {formatPrice(10, currency)}.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Balance stored securely — use it anytime',
                    'Pay with Visa or Mastercard with 3D Secure',
                    'Display prices in GBP, EUR, or USD',
                    'Top up again whenever you need more data',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-light">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:flex-1">
                <div className="rounded-2xl border border-border bg-surface p-6 text-center">
                  <p className="text-sm font-medium text-text-light">Your balance</p>
                  <p className="mt-1 text-4xl font-extrabold text-text">{formatPrice(isAuthenticated ? balance : 0, currency)}</p>
                  <p className="mt-2 text-xs text-text-light">{isAuthenticated ? 'Your current wallet balance' : 'Sign in and top up to start purchasing plans'}</p>
                  <Link
                    href="/top-up"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Top Up Balance
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Popular Destinations"
              subtitle="Our most-purchased eSIM plans. Trusted by hundreds of thousands of travellers every month."
            />
          </AnimatedSection>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {popular.map((country) => (
              <CountryCard key={country.slug} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about using ArvoSim eSIMs."
            />
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mt-10">
              <FAQAccordion faqs={generalFaqs.slice(0, 6)} />
            </div>
          </AnimatedSection>
          <div className="mt-8 text-center">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Help / Support */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatedSection>
            <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-8 text-center text-white md:p-12">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                <Headphones className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Need Help?</h2>
              <p className="mt-3 text-white/80 max-w-md mx-auto">
                Our support team is available around the clock to help with installation, troubleshooting, or plan recommendations.
              </p>
              <Link
                href="/help"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-primary transition-colors hover:bg-white/90"
              >
                Visit Help Centre
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="From the Blog"
              subtitle="Guides, tips, and news to help you travel smarter."
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogArticles.slice(0, 3).map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              Read more articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
