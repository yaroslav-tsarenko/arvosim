'use client';

import { useState } from 'react';
import { Globe, Zap, Shield, Smartphone, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PlanCard } from '@/components/cards/PlanCard';
import { useApp } from '@/hooks/AppProvider';
import { globalPlans } from '@/data/global';
import { EsimPlan } from '@/types';

const valueProps = [
  {
    icon: Globe,
    title: '80+ Countries',
    description: 'One plan works across 80+ countries on every continent. No roaming surprises.',
  },
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Scan the QR code and get online in minutes. No physical SIM required.',
  },
  {
    icon: Shield,
    title: 'Reliable 4G/LTE',
    description: 'Connects to premium local networks for fast, stable data wherever you go.',
  },
  {
    icon: Smartphone,
    title: 'Keep Your Number',
    description: 'Your home SIM stays active for calls and texts while using eSIM for data.',
  },
];

export default function GlobalPage() {
  const { addToCart, currency } = useApp();
  const [addedId, setAddedId] = useState<string | null>(null);

  function handleBuy(plan: EsimPlan, planName: string) {
    addToCart({
      planId: plan.id,
      name: planName,
      data: plan.data,
      validity: plan.validity,
      price: plan.price,
      coverage: `${80}+ countries worldwide`,
    });
    setAddedId(plan.id);
    setTimeout(() => setAddedId(null), 2000);
  }

  // Convert GlobalPlan to EsimPlan shape for PlanCard
  const plansAsEsim: (EsimPlan & { globalName: string })[] = globalPlans.map((gp) => ({
    id: gp.id,
    data: gp.data,
    validity: gp.validity,
    price: gp.price,
    coverage: `${gp.countriesCount}+ countries`,
    networkType: gp.networkType,
    globalName: gp.name,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Added-to-cart toast */}
      {addedId && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-xl bg-success px-5 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Added to cart</span>
        </div>
      )}

      {/* Hero section */}
      <AnimatedSection>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            <Globe className="h-4 w-4" />
            Worldwide Coverage
          </span>
          <SectionHeader
            title="Global eSIM Plans"
            subtitle="Travel the world with a single eSIM. One plan, 80+ countries, zero hassle. The simplest way to stay connected anywhere on earth."
          />
        </div>
      </AnimatedSection>

      {/* Value props */}
      <AnimatedSection delay={0.1}>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                <prop.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-text mb-1">{prop.title}</h3>
              <p className="text-sm text-text-light">{prop.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Plans grid */}
      <AnimatedSection delay={0.2}>
        <div className="mt-16">
          <h3 className="text-xl font-bold text-text mb-6 text-center">Choose Your Global Plan</h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {plansAsEsim.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onBuy={(p) => handleBuy(p, plan.globalName)}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Coverage note */}
      <AnimatedSection delay={0.3}>
        <div className="mt-14 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center">
          <h3 className="text-lg font-bold text-text mb-2">
            Not sure which plan to pick?
          </h3>
          <p className="text-text-light max-w-2xl mx-auto">
            All global plans cover the same 80+ countries. The only difference is data allowance and validity period.
            Start with Global Standard for a typical two-week trip, or go with Global Pro if you need heavier usage
            for streaming and video calls.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
