'use client';

import Link from 'next/link';
import {
  Globe,
  Users,
  Zap,
  Heart,
  Shield,
  ArrowRight,
  Star,
  Award,
  Sparkles,
  MapPin,
  Headphones,
} from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent-light/20 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Our Story
            </span>
            <h1 className="text-3xl font-extrabold text-text sm:text-4xl md:text-5xl">
              Connecting the World,{' '}
              <span className="text-primary">One eSIM at a Time</span>
            </h1>
            <p className="mt-5 text-lg text-text-light max-w-2xl mx-auto leading-relaxed">
              ArvoSim was founded on a simple belief: staying connected while travelling should be effortless and affordable for everyone. No more overpriced roaming, no more hunting for SIM cards in foreign airports.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '190+', label: 'Countries Covered', icon: Globe },
              { value: '500K+', label: 'Customers Served', icon: Users },
              { value: '4.8/5', label: 'Average Rating', icon: Star },
              { value: '24/7', label: 'Customer Support', icon: Headphones },
            ].map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-3xl font-extrabold text-text">{stat.value}</p>
                  <p className="mt-1 text-sm text-text-light">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <div className="md:flex md:items-center md:gap-12">
              <div className="mb-8 md:mb-0 md:w-80 shrink-0">
                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/10 to-accent-light/30 md:mx-0">
                  <MapPin className="h-20 w-20 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-text md:text-3xl">Our Mission</h2>
                <p className="mt-4 text-text-light leading-relaxed">
                  We believe that access to mobile data is essential for modern travel. Whether you are navigating a new city, keeping in touch with family, or working remotely from a beach cafe, you should not have to worry about connectivity.
                </p>
                <p className="mt-4 text-text-light leading-relaxed">
                  ArvoSim partners with carrier networks in over 190 countries to deliver fast, reliable mobile data at local rates. Our platform is designed to make the entire experience — from finding the right plan to getting online — as frictionless as possible.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="What We Stand For"
              subtitle="The principles that guide every decision we make."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Simplicity First',
                description:
                  'We strip away the complexity of international connectivity. Three steps is all it takes: choose, purchase, connect. No jargon, no hidden fees, no fine print.',
              },
              {
                icon: Shield,
                title: 'Transparency',
                description:
                  'Every plan clearly shows the data amount, validity, price, and coverage area. What you see is what you get. No surprise charges, no auto-renewals, no lock-in contracts.',
              },
              {
                icon: Zap,
                title: 'Instant Delivery',
                description:
                  'We built our platform for speed. The moment you complete your purchase, your QR code is ready. No waiting for shipping, no activation delays — just scan and go.',
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description:
                  'From bustling metropolises to remote islands, we continuously expand our network partnerships to cover more destinations with faster, more reliable connections.',
              },
              {
                icon: Users,
                title: 'Customer Obsession',
                description:
                  'Our support team is available around the clock because connectivity issues do not keep business hours. We are here to help whether you are in Tokyo or Timbuktu.',
              },
              {
                icon: Award,
                title: 'Fair Pricing',
                description:
                  'We negotiate bulk rates with carrier partners and pass the savings directly to you. Our plans often cost a fraction of what traditional roaming charges would be.',
              },
            ].map((value, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl border border-border bg-white p-6 hover:border-primary/20 transition-colors h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-text">{value.title}</h3>
                  <p className="mt-2 text-sm text-text-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Why travellers choose us */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection>
            <SectionHeader
              title="Why Travellers Trust ArvoSim"
              subtitle="Hundreds of thousands of customers rely on us for their travel connectivity."
            />
          </AnimatedSection>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                quote:
                  'I used to spend ages at airport SIM kiosks every trip. With ArvoSim, I scan a QR code before I even board my flight. It is genuinely life-changing for frequent travellers.',
                name: 'Sarah M.',
                location: 'London, UK',
              },
              {
                quote:
                  'The regional Europe plan saved me a fortune on a 3-week backpacking trip across 6 countries. One eSIM, no hassle, fast data everywhere I went.',
                name: 'James L.',
                location: 'Sydney, Australia',
              },
              {
                quote:
                  'Customer support helped me set up my eSIM at midnight before a 5am flight to Tokyo. They were patient, knowledgeable, and genuinely helpful.',
                name: 'Priya K.',
                location: 'Toronto, Canada',
              },
              {
                quote:
                  'As a digital nomad, reliable data is non-negotiable. ArvoSim has been my go-to for over a year — consistent speeds, fair prices, and plans for every country I visit.',
                name: 'Marco R.',
                location: 'Lisbon, Portugal',
              },
            ].map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white p-6 shadow-sm h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="flex-1 text-text-light leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-semibold text-text text-sm">{testimonial.name}</p>
                    <p className="text-xs text-text-light">{testimonial.location}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-text md:text-3xl">
              Ready to Travel Connected?
            </h2>
            <p className="mt-4 text-text-light max-w-xl mx-auto">
              Join over half a million travellers who trust ArvoSim for affordable, reliable mobile data in 190+ countries.
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
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-6 py-3 font-semibold text-text transition-colors hover:border-primary/30"
              >
                See How It Works
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
