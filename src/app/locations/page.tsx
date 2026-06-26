'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpDown, Grid3X3, List } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SearchBar } from '@/components/ui/SearchBar';
import { CountryCard } from '@/components/cards/CountryCard';
import { useApp } from '@/hooks/AppProvider';
import { formatPrice } from '@/lib/currency';
import { countries, regions } from '@/data/countries';

type RegionFilter = 'All' | (typeof regions)[number];

type SortOption = 'popular' | 'az' | 'za' | 'price-low' | 'price-high';

const popularSlugs = ['united-states', 'united-kingdom', 'turkey', 'japan', 'spain', 'france', 'italy', 'germany', 'thailand', 'australia'];

export default function LocationsPage() {
  const { currency } = useApp();
  const [activeRegion, setActiveRegion] = useState<RegionFilter>('All');
  const [sort, setSort] = useState<SortOption>('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = [...countries];

    if (activeRegion !== 'All') {
      result = result.filter((c) => c.region === activeRegion);
    }

    if (sort === 'az') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'za') result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === 'price-low') result.sort((a, b) => Math.min(...a.plans.map((p) => p.price)) - Math.min(...b.plans.map((p) => p.price)));
    else if (sort === 'price-high') result.sort((a, b) => Math.min(...b.plans.map((p) => p.price)) - Math.min(...a.plans.map((p) => p.price)));
    else result.sort((a, b) => {
      const aIdx = popularSlugs.indexOf(a.slug);
      const bIdx = popularSlugs.indexOf(b.slug);
      if (aIdx >= 0 && bIdx >= 0) return aIdx - bIdx;
      if (aIdx >= 0) return -1;
      if (bIdx >= 0) return 1;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [activeRegion, sort]);

  const allTabs: RegionFilter[] = ['All', ...regions];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent-light/20 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold text-text sm:text-4xl md:text-5xl">Browse All Destinations</h1>
            <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">Find affordable eSIM data plans for {countries.length}+ countries. Select a destination to see plans, pricing, and coverage.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="mt-8 mx-auto max-w-xl"><SearchBar large /></div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex justify-center mb-6">
            <div className="inline-flex flex-wrap justify-center gap-1 rounded-xl border border-border bg-surface p-1">
              {allTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveRegion(tab)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeRegion === tab ? 'bg-white text-primary shadow-sm' : 'text-text-light hover:text-text'}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-white px-2 py-1">
                <ArrowUpDown className="h-3.5 w-3.5 text-text-light" />
                <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="bg-transparent text-sm text-text focus:outline-none">
                  <option value="popular">Popular</option>
                  <option value="az">Name A-Z</option>
                  <option value="za">Name Z-A</option>
                  <option value="price-low">Lowest price</option>
                  <option value="price-high">Highest price</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-text-light">
                Showing <span className="font-semibold text-text">{filtered.length}</span> of {countries.length} destinations
              </p>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <button onClick={() => setView('grid')} className={`p-1.5 ${view === 'grid' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-surface'}`}><Grid3X3 className="h-4 w-4" /></button>
                <button onClick={() => setView('list')} className={`p-1.5 ${view === 'list' ? 'bg-primary text-white' : 'bg-white text-text-light hover:bg-surface'}`}><List className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((country) => (
                <CountryCard key={country.slug} country={country} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((country) => (
                <Link key={country.slug} href={`/locations/${country.slug}`} className="flex items-center gap-4 rounded-xl border border-border bg-white p-4 hover:border-primary/30 hover:shadow-sm transition-all">
                  <span className="text-3xl">{country.flag}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text">{country.name}</h3>
                    <p className="text-xs text-text-light">{country.region} &middot; {country.plans.length} plans</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">From {formatPrice(Math.min(...country.plans.map((p) => p.price)), currency)}</span>
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-text-light">No destinations match your filters.</p>
              <button onClick={() => { setActiveRegion('All'); }} className="mt-3 text-sm font-medium text-primary hover:text-primary-dark">Clear all filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
