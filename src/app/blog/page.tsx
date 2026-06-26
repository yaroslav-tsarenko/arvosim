'use client';

import { useState } from 'react';
import { blogArticles } from '@/data/blog';
import { BlogCard } from '@/components/cards/BlogCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';

const categories = ['All', ...Array.from(new Set(blogArticles.map((a) => a.category)))];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogArticles
      : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <AnimatedSection>
        <SectionHeader
          title="Blog & Travel Guides"
          subtitle="Tips, guides, and insights to help you stay connected on every trip."
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface text-text-light hover:bg-primary-light/20 hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </AnimatedSection>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
          <AnimatedSection key={article.slug} delay={0.05 * i}>
            <BlogCard article={article} />
          </AnimatedSection>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-text-light">
          No articles found in this category yet.
        </p>
      )}
    </section>
  );
}
