import Link from 'next/link';
import Image from 'next/image';
import { Clock, Tag } from 'lucide-react';
import { BlogArticle } from '@/types';

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
    >
      <div className="relative h-48 bg-surface overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1 text-xs font-medium text-primary">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-text-light">
            <Clock className="h-3 w-3" />
            {article.readingTime} min read
          </span>
        </div>
        <h3 className="font-semibold text-text group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-text-light line-clamp-2 flex-1">{article.excerpt}</p>
      </div>
    </Link>
  );
}
