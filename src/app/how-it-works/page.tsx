'use client';

import Link from 'next/link';
import {
  MapPin,
  QrCode,
  Wifi,
  ArrowRight,
  Smartphone,
  ShieldCheck,
  Globe,
  Zap,
  CreditCard,
  MessageCircle,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: MapPin,
      number: '01',
      title: 'Choose Your Destination',
      description:
        'Browse our library of 190+ countries and regions. Each destination shows available plans, data amounts, validity periods, and pricing so you can pick the one that fits your trip.',
      details: [
        'Local eSIMs for single countries with the best local rates',
        'Regional plans covering multiple countries on one eSIM',
        'Global plans for multi-destination trips across continents',
        'Search by country name or browse by region',
      ],
    },
    {
      icon: CreditCard,
      number: '02',
      title: 'Purchase & Install',
      description:
        'Complete your purchase securely with Visa or Mastercard. You will receive a QR code instantly — no shipping, no waiting. Scan it with your phone to install the eSIM profile in under 5 minutes.',
      details: [
        'Secure payment with 3D Secure authentication',
        'QR code delivered instantly after purchase',
        'Install before your trip or at any time — data starts on arrival',
        'Works on iPhone XR+, Samsung Galaxy S20+, Google Pixel 3+',
      ],
    },
    {
      icon: Wifi,
      number: '03',
      title: 'Stay Connected',
      description:
        'When you arrive at your destination, your eSIM connects to a local partner network automatically. Enjoy fast 4G/LTE or 5G data while your regular phone number stays active for calls and texts.',
      details: [
        'Automatic network connection upon arrival',
        'Keep your home SIM active alongside the eSIM',
        'Use WhatsApp, Zoom, FaceTime, and more over data',
        'Top up or purchase a new plan anytime if you need more data',
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent-light/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Zap className="h-4 w-4" />
              Simple 3-Step Process
            </span>
            <h1 className="text-3xl font-extrabold text-text sm:text-4xl md:text-5xl">
              How ArvoSim Works
            </h1>
            <p className="mt-5 text-lg text-text-light max-w-2xl mx-auto">
              Getting connected abroad used to mean hunting for SIM cards at airports, dealing with language barriers, and paying extortionate roaming fees. With ArvoSim, it takes three simple steps.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-16">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`md:flex md:items-start md:gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Icon side */}
                  <div className="mb-8 md:mb-0 md:w-80 shrink-0">
                    <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-accent-light/30 md:mx-0">
                      <step.icon className="h-16 w-16 text-primary" />
                      <span className="absolute -top-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-extrabold text-white shadow-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-text md:text-3xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-text-light leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-text-light">
                          <CheckCircle className="h-5 w-5 shrink-0 text-success mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="What You Need"
              subtitle="Make sure you have these before purchasing an eSIM."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Smartphone,
                title: 'Compatible Phone',
                description:
                  'An eSIM-capable smartphone — iPhone XR or later, Samsung Galaxy S20 or later, Google Pixel 3 or later, and many more.',
              },
              {
                icon: Globe,
                title: 'Internet Connection',
                description:
                  'Wi-Fi or an existing mobile data connection to download the eSIM profile. After installation, the eSIM uses its own data.',
              },
              {
                icon: ShieldCheck,
                title: 'Unlocked Device',
                description:
                  'Your phone must not be carrier-locked. If you purchased your phone outright or your contract has ended, it is likely unlocked.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Tips for a Smooth Experience"
              subtitle="Follow these suggestions to get the most out of your ArvoSim eSIM."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mt-10 space-y-4">
              {[
                {
                  title: 'Install before you travel',
                  description:
                    'You can scan the QR code and install the eSIM profile while still at home on Wi-Fi. The data plan activates only when you connect to a network in the covered country.',
                },
                {
                  title: 'Download offline maps',
                  description:
                    'Save Google Maps or Apple Maps offline for your destination before departure. This way, you can navigate even before your eSIM connects.',
                },
                {
                  title: 'Disable automatic app updates',
                  description:
                    'Turn off automatic updates over mobile data to conserve your plan. Update apps over Wi-Fi at your hotel instead.',
                },
                {
                  title: 'Label your eSIM',
                  description:
                    'Give your eSIM a recognizable name like "Japan Travel" in your phone settings. This makes it easy to switch between data lines if you have multiple eSIMs.',
                },
                {
                  title: 'Monitor your data usage',
                  description:
                    'Check your remaining data in your phone settings under Mobile Data. When your data runs low, purchase a new plan from the ArvoSim app or website.',
                },
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-border bg-white p-5 hover:border-primary/20 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-text">{tip.title}</h3>
                    <p className="mt-1 text-sm text-text-light leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-text-light max-w-xl mx-auto">
              Browse our full list of destinations and find the perfect eSIM plan for your next trip. Setup takes just a few minutes.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Browse Destinations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 font-semibold text-text transition-colors hover:border-primary/30"
              >
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
