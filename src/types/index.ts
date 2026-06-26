export type Currency = 'GBP' | 'EUR' | 'USD';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  region: string;
  plans: EsimPlan[];
  faqs: FAQ[];
  relatedSlugs: string[];
}

export interface EsimPlan {
  id: string;
  data: string;
  validity: string;
  price: number;
  coverage: string;
  networkType: string;
}

export interface RegionalPlan {
  id: string;
  region: string;
  slug: string;
  description: string;
  countries: string[];
  plans: EsimPlan[];
}

export interface GlobalPlan {
  id: string;
  name: string;
  data: string;
  validity: string;
  price: number;
  countriesCount: number;
  networkType: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  image: string;
  date: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}

export interface TopUpOption {
  amount: number;
  popular?: boolean;
}
