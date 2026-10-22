/**
 * Type definitions for Udyog Mitra business profiles and app state.
 */

export type BusinessCategory =
  | 'kirana_grocery'
  | 'fashion_apparel'
  | 'food_restaurant_bakery'
  | 'services_repair'
  | 'manufacturing_workshop'
  | 'wholesale_trading'
  | 'health_pharmacy'
  | 'handicrafts_artisan'
  | 'other';

export type OperatingModel = 'offline_store' | 'online_only' | 'hybrid';

export type TeamSize = 'solo' | 'small_2_5' | 'growing_6_15' | 'established_16_plus';

export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export type CommunicationTone =
  | 'warm_local'
  | 'professional_clean'
  | 'hinglish_conversational'
  | 'direct_concise';

export interface BusinessProfile {
  id: string;
  businessName: string;
  tagline: string;
  ownerName: string;
  category: BusinessCategory;
  customCategory?: string;
  city: string;
  stateOrRegion: string;
  currency: CurrencyCode;
  operatingModel: OperatingModel;
  teamSize: TeamSize;
  productsAndServices: string;
  targetCustomers: string;
  primaryGoals: string[];
  communicationTone: CommunicationTone;
  contactNumber: string;
  whatsappNumber: string;
  address: string;
  establishedYear: number | string;
  isCompleted: boolean;
  updatedAt: string;
}

export type ActiveTab = 'dashboard' | 'assistant' | 'marketing' | 'insights' | 'profile';

export interface CategoryOption {
  value: BusinessCategory;
  label: string;
  description: string;
  example: string;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  {
    value: 'kirana_grocery',
    label: 'Kirana & Grocery Store',
    description: 'Provisions, FMCG, packaged food, grains, and daily essentials',
    example: 'E.g., Sharma General Stores, Daily Fresh Mart',
  },
  {
    value: 'fashion_apparel',
    label: 'Clothing, Boutique & Textiles',
    description: 'Apparel, tailoring, traditional wear, footwear, and accessories',
    example: 'E.g., Priya Handlooms & Boutique, Urban Threads',
  },
  {
    value: 'food_restaurant_bakery',
    label: 'Food, Cafe, Bakery & Sweets',
    description: 'Quick service food, sweets & confectionery, catering, beverages',
    example: 'E.g., Ananda Sweets & Bakers, Chai Point Corner',
  },
  {
    value: 'services_repair',
    label: 'Services & Device Repair',
    description: 'Mobile & electronics servicing, electrical, plumbing, home services',
    example: 'E.g., SuperTech Electronics Repair, Apex Aircon Care',
  },
  {
    value: 'manufacturing_workshop',
    label: 'Fabrication & Small Workshop',
    description: 'Machining, woodwork, metal fabrication, packaging, small batch production',
    example: 'E.g., Bharat Precision Works, Krishna Packaging',
  },
  {
    value: 'wholesale_trading',
    label: 'Wholesale, Distribution & B2B',
    description: 'Bulk supply, regional distributor, wholesale trading merchant',
    example: 'E.g., Gupta Trading Co., Metro Commodity Distributors',
  },
  {
    value: 'health_pharmacy',
    label: 'Pharmacy, Wellness & Care',
    description: 'Medicines, personal care, herbal products, clinical consultation',
    example: 'E.g., Sanjeevani Medicos, Arogya Wellness Clinic',
  },
  {
    value: 'handicrafts_artisan',
    label: 'Handicrafts & Artisans',
    description: 'Pottery, leathercraft, jewelry, home decor, traditional arts',
    example: 'E.g., KalaKriti Studio, Shilp Heritage Decor',
  },
  {
    value: 'other',
    label: 'Other Business Type',
    description: 'Custom micro-enterprise or emerging trade niche',
    example: 'Enter your custom industry category',
  },
];

export const GOAL_OPTIONS = [
  'Increase daily customer footfall',
  'Get more repeat orders via WhatsApp',
  'Improve gross profit margins on top items',
  'Track daily cash & digital collections accurately',
  'Clear slow-moving & seasonal inventory',
  'Attract new customers through festive promotions',
  'Reduce daily operating expenses and leakage',
  'Expand product variety based on demand',
];

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
};
