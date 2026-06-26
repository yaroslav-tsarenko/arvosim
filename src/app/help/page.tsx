'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  Smartphone,
  Settings,
  CreditCard,
  LifeBuoy,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Smartphone,
    topics: [
      'What is an eSIM and how does it work?',
      'How to check if my phone supports eSIM',
      'Purchasing your first eSIM plan',
      'Installing your eSIM step by step',
    ],
  },
  {
    title: 'Managing Your eSIM',
    icon: Settings,
    topics: [
      'Switching between eSIM profiles',
      'Checking remaining data and plan status',
      'Extending or renewing your plan',
      'Removing an eSIM from your device',
    ],
  },
  {
    title: 'Billing & Payments',
    icon: CreditCard,
    topics: [
      'How the wallet balance works',
      'Accepted payment methods',
      'Understanding your invoice',
      'Requesting a refund for unused plans',
    ],
  },
  {
    title: 'Troubleshooting',
    icon: LifeBuoy,
    topics: [
      'eSIM not connecting to a network',
      'Slow data speeds abroad',
      'QR code not scanning correctly',
      'Data usage not appearing in account',
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery.trim()
    ? helpCategories
        .map((cat) => ({
          ...cat,
          topics: cat.topics.filter((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.topics.length > 0)
    : helpCategories;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <SectionHeader
          title="Help Centre"
          subtitle="Find answers to common questions or reach out to our support team."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mx-auto mt-10 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help topics..."
            className="w-full rounded-xl border border-border bg-white px-4 py-3 pl-12 text-sm text-text placeholder:text-text-light/60 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </AnimatedSection>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {filtered.map((category, i) => {
          const Icon = category.icon;
          return (
            <AnimatedSection key={category.title} delay={0.05 * i}>
              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm h-full">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-text">{category.title}</h2>
                </div>
                <ul className="mt-4 space-y-1">
                  {category.topics.map((topic) => (
                    <li key={topic}>
                      <Link
                        href="/faq"
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-text-light hover:bg-surface hover:text-primary transition-colors"
                      >
                        <span>{topic}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-text-light">
          No topics matched your search. Try different keywords or contact support.
        </p>
      )}

      <AnimatedSection delay={0.3} className="mt-16">
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-3 text-lg font-semibold text-text">Still need help?</h3>
          <p className="mt-2 text-sm text-text-light max-w-md mx-auto">
            Our support team is available Monday to Saturday and typically responds within 24
            hours.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
}
