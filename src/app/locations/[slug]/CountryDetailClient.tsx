'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PlanCard } from '@/components/cards/PlanCard';
import { CountryCard } from '@/components/cards/CountryCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { useApp } from '@/hooks/AppProvider';
import { Country, EsimPlan } from '@/types';

export function CountryDetailClient({
  country,
  relatedCountries,
}: {
  country: Country;
  relatedCountries: Country[];
}) {
  const { addToCart } = useApp();
  const [addedId, setAddedId] = useState<string | null>(null);

  function handleBuy(plan: EsimPlan) {
    addToCart({
      planId: plan.id,
      name: `${country.name} eSIM`,
      data: plan.data,
      validity: plan.validity,
      price: plan.price,
      coverage: plan.coverage,
    });
    setAddedId(plan.id);
    setTimeout(() => setAddedId(null), 2000);
  }

  return (
    <div className="bg-white">
      {addedId && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-xl bg-success px-5 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Added to cart</span>
        </div>
      )}
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent-light/20 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <Link
            href="/locations"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-light hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            All Destinations
          </Link>

          <AnimatedSection>
            <div className="flex items-center gap-5">
              <span className="text-6xl md:text-7xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl font-extrabold text-text sm:text-4xl">
                  {country.name} eSIM Plans
                </h1>
                <p className="mt-2 text-text-light">
                  {country.region} &middot; {country.plans.length} plan{country.plans.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Choose a Data Plan"
              subtitle={`Select the plan that fits your trip to ${country.name}. All plans are data-only and activate upon arrival.`}
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {country.plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} onBuy={handleBuy} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-text-light">
            {[
              'Instant QR code delivery',
              'Data-only plan',
              'No roaming charges',
              'Refundable if unused',
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-success" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Country FAQs */}
      {country.faqs.length > 0 && (
        <section className="bg-surface py-12 md:py-16">
          <div className="mx-auto max-w-3xl px-4">
            <AnimatedSection>
              <SectionHeader
                title={`${country.name} eSIM FAQ`}
                subtitle="Common questions about using an eSIM in this destination."
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="mt-8">
                <FAQAccordion faqs={country.faqs} />
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Related Countries */}
      {relatedCountries.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <AnimatedSection>
              <SectionHeader
                title="Related Destinations"
                subtitle="Travellers who visited this destination also purchased eSIMs for these countries."
              />
            </AnimatedSection>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {relatedCountries.map((rc) => (
                <CountryCard key={rc.slug} country={rc} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Browse all destinations
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
