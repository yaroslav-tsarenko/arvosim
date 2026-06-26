import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react';
import { blogArticles, getArticleBySlug } from '@/data/blog';
import { BlogCard } from '@/components/cards/BlogCard';

function parseContent(content: string) {
  const blocks = content.split('\n\n');

  return blocks.map((block, i) => {
    const trimmed = block.trim();

    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-8 mb-4 text-xl font-bold text-text">
          {trimmed.slice(3)}
        </h2>
      );
    }

    const lines = trimmed.split('\n');

    // Ordered list: lines starting with number + dot
    if (lines.every((l) => /^\d+\.\s/.test(l.trim()))) {
      return (
        <ol key={i} className="my-4 list-decimal space-y-2 pl-6 text-text-light leading-relaxed">
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
          ))}
        </ol>
      );
    }

    // Unordered list: lines starting with -
    if (lines.every((l) => l.trim().startsWith('- '))) {
      return (
        <ul key={i} className="my-4 list-disc space-y-2 pl-6 text-text-light leading-relaxed">
          {lines.map((line, j) => (
            <li key={j}>{renderInline(line.trim().slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="my-4 text-text-light leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = blogArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-light">
          <span className="flex items-center gap-1 font-medium text-primary">
            <Tag className="h-3.5 w-3.5" />
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {article.readingTime} min read
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(article.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-text md:text-4xl leading-tight">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-text-light">{article.excerpt}</p>
      </header>

      <div className="mt-8 border-t border-border pt-8">{parseContent(article.content)}</div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="mb-6 text-2xl font-bold text-text">More from the blog</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <BlogCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
