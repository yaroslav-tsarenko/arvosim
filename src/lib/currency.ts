import { Currency, CurrencyConfig } from '@/types';

export const CURRENCIES: Record<Currency, CurrencyConfig> = {
  GBP: { code: 'GBP', symbol: '£', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', rate: 1.16 },
  USD: { code: 'USD', symbol: '$', rate: 1.27 },
};

export function convertPrice(priceGBP: number, currency: Currency): number {
  return Math.round(priceGBP * CURRENCIES[currency].rate * 100) / 100;
}

export function formatPrice(priceGBP: number, currency: Currency): string {
  const converted = convertPrice(priceGBP, currency);
  return `${CURRENCIES[currency].symbol}${converted.toFixed(2)}`;
}
