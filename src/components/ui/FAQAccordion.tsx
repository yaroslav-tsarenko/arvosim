'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/types';

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="rounded-xl border border-border bg-white overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-text hover:bg-surface/50 transition-colors"
          >
            <span>{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 text-text-light shrink-0 ml-4 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-4' : 'max-h-0'}`}
          >
            <div className="px-5 text-text-light leading-relaxed">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
