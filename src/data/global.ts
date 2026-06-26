import { GlobalPlan } from '@/types';

export const globalPlans: GlobalPlan[] = [
  { id: 'gl-1', name: 'Global Lite', data: '1 GB', validity: '7 days', price: 5.00, countriesCount: 80, networkType: '4G/LTE' },
  { id: 'gl-2', name: 'Global Standard', data: '3 GB', validity: '15 days', price: 11.00, countriesCount: 80, networkType: '4G/LTE' },
  { id: 'gl-3', name: 'Global Plus', data: '5 GB', validity: '30 days', price: 17.00, countriesCount: 80, networkType: '4G/LTE' },
  { id: 'gl-4', name: 'Global Pro', data: '10 GB', validity: '30 days', price: 28.00, countriesCount: 80, networkType: '4G/LTE' },
  { id: 'gl-5', name: 'Global Ultra', data: '20 GB', validity: '30 days', price: 45.00, countriesCount: 80, networkType: '4G/LTE' },
];
