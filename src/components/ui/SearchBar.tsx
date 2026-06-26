'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { countries } from '@/data/countries';

export function SearchBar({ large = false }: { large?: boolean }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.length > 0
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-2 rounded-xl border border-border bg-white px-4 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${large ? 'py-3.5' : 'py-2.5'}`}>
        <Search className="h-5 w-5 text-text-light shrink-0" />
        <input
          type="text"
          placeholder="Search country or region..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className={`w-full bg-transparent outline-none placeholder:text-text-light/60 ${large ? 'text-lg' : 'text-sm'}`}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false); }}>
            <X className="h-4 w-4 text-text-light" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-white shadow-lg overflow-hidden">
          {results.map((c) => (
            <Link
              key={c.slug}
              href={`/locations/${c.slug}`}
              onClick={() => { setQuery(''); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-surface transition-colors"
            >
              <span className="text-2xl">{c.flag}</span>
              <div>
                <div className="font-medium text-text">{c.name}</div>
                <div className="text-xs text-text-light">{c.region}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {open && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-white shadow-lg p-4 text-center text-text-light">
          No countries found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
