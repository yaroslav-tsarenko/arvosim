import { notFound } from 'next/navigation';
import { countries, getCountryBySlug } from '@/data/countries';
import { CountryDetailClient } from './CountryDetailClient';

export function generateStaticParams() {
  return countries.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);
  if (!country) return { title: 'Country Not Found' };
  return {
    title: `${country.name} eSIM Plans`,
    description: `Buy affordable eSIM data plans for ${country.name}. Instant setup, no roaming fees, 4G/5G coverage.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const relatedCountries = country.relatedSlugs
    .map((s) => getCountryBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCountryBySlug>>[];

  return (
    <CountryDetailClient
      country={country}
      relatedCountries={relatedCountries}
    />
  );
}
