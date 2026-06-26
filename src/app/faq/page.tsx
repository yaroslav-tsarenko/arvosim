import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { generalFaqs } from '@/data/faqs';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function FAQPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Quick answers to the most common questions about ArvoSim and eSIM technology."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10">
        <FAQAccordion faqs={generalFaqs} />
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="mt-16">
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
          <MessageCircle className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-3 text-lg font-semibold text-text">
            Didn&apos;t find what you&apos;re looking for?
          </h3>
          <p className="mt-2 text-sm text-text-light max-w-md mx-auto">
            Our support team is happy to help with any questions about your eSIM, account, or
            billing.
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
