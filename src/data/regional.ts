import { RegionalPlan } from '@/types';

export const regionalPlans: RegionalPlan[] = [
  {
    id: 'europe',
    region: 'Europe',
    slug: 'europe',
    description: 'Stay connected across 30+ European countries with a single eSIM. Perfect for multi-country trips.',
    countries: ['United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Poland', 'Turkey', 'Ukraine', 'Georgia', 'Moldova'],
    plans: [
      { id: 'eu-1', data: '1 GB', validity: '7 days', price: 4.00, coverage: '30+ European countries', networkType: '4G/LTE' },
      { id: 'eu-2', data: '3 GB', validity: '15 days', price: 8.50, coverage: '30+ European countries', networkType: '4G/LTE' },
      { id: 'eu-3', data: '5 GB', validity: '30 days', price: 13.00, coverage: '30+ European countries', networkType: '4G/LTE' },
      { id: 'eu-4', data: '10 GB', validity: '30 days', price: 22.00, coverage: '30+ European countries', networkType: '4G/LTE' },
    ],
  },
  {
    id: 'asia',
    region: 'Asia',
    slug: 'asia',
    description: 'Travel across Asia with seamless data connectivity. Covers major destinations from Japan to Southeast Asia.',
    countries: ['Japan', 'China', 'South Korea', 'Thailand', 'Vietnam', 'Singapore', 'Malaysia', 'Indonesia'],
    plans: [
      { id: 'as-1', data: '1 GB', validity: '7 days', price: 4.50, coverage: '15+ Asian countries', networkType: '4G/LTE' },
      { id: 'as-2', data: '3 GB', validity: '15 days', price: 9.00, coverage: '15+ Asian countries', networkType: '4G/LTE' },
      { id: 'as-3', data: '5 GB', validity: '30 days', price: 14.00, coverage: '15+ Asian countries', networkType: '4G/LTE' },
      { id: 'as-4', data: '10 GB', validity: '30 days', price: 24.00, coverage: '15+ Asian countries', networkType: '4G/LTE' },
    ],
  },
  {
    id: 'middle-east',
    region: 'Middle East',
    slug: 'middle-east',
    description: 'Stay online across the Middle East and North Africa region with reliable 4G coverage.',
    countries: ['Egypt', 'UAE', 'Saudi Arabia', 'Jordan', 'Qatar', 'Oman', 'Bahrain', 'Kuwait'],
    plans: [
      { id: 'me-1', data: '1 GB', validity: '7 days', price: 4.00, coverage: '10+ ME countries', networkType: '4G/LTE' },
      { id: 'me-2', data: '3 GB', validity: '15 days', price: 8.00, coverage: '10+ ME countries', networkType: '4G/LTE' },
      { id: 'me-3', data: '5 GB', validity: '30 days', price: 12.50, coverage: '10+ ME countries', networkType: '4G/LTE' },
      { id: 'me-4', data: '10 GB', validity: '30 days', price: 21.00, coverage: '10+ ME countries', networkType: '4G/LTE' },
    ],
  },
  {
    id: 'americas',
    region: 'Americas',
    slug: 'americas',
    description: 'Cover North and South America with one plan. Great for road trips and cross-border travel.',
    countries: ['United States', 'Canada', 'Mexico', 'Brazil', 'Argentina', 'Colombia', 'Chile', 'Peru'],
    plans: [
      { id: 'am-1', data: '1 GB', validity: '7 days', price: 4.50, coverage: '10+ American countries', networkType: '4G/LTE' },
      { id: 'am-2', data: '3 GB', validity: '15 days', price: 9.50, coverage: '10+ American countries', networkType: '4G/LTE' },
      { id: 'am-3', data: '5 GB', validity: '30 days', price: 14.50, coverage: '10+ American countries', networkType: '4G/LTE' },
      { id: 'am-4', data: '10 GB', validity: '30 days', price: 24.00, coverage: '10+ American countries', networkType: '4G/LTE' },
    ],
  },
];
