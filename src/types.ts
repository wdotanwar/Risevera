export type CFSClassification = 'Strong Fit' | 'Moderate Fit' | 'Weak Fit' | 'No Fit';

export interface ProductInput {
  name: string;
  category: string;
  description: string;
  landingCost: number;
  targetPrice: number;
  stockQuantity: number;
  origin: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  currentChannel?: string;
  currentMonthlySales?: number;
  currentAdSpend?: number;
  analysisType: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion';
  selectedMarketplaces: string[];
  selectedCountries: string[];
}

export interface MarketplaceScore {
  marketplace: string;
  country: string;
  DSS: number; // Demand Signal Score (30%)
  CIS: number; // Competition Intensity Score (25%)
  PVI: number; // Price Viability Index (20%)
  PSF: number; // Platform Suitability Factor (15%)
  MERS: number; // Market Entry Risk Score (10%)
  CFS: number; // Channel Fit Score (calculated)
  classification: CFSClassification;
  action: string;
  reason: string;
}

export interface SavedAnalysis {
  id: string;
  product: string;
  category: string;
  bestChannel: string;
  cfs: number;
  classification: CFSClassification;
  createdDate: string;
  type: 'New Product Launch' | 'Channel Rescue' | 'Global Expansion';
  status: 'Ready' | 'Draft' | 'Archived';
  inputData: ProductInput;
}

export type ScreenId =
  | 'landing'
  | 'dashboard'
  | 'wizard'
  | 'results'
  | 'comparison'
  | 'recommendation_detail'
  | 'saved_analyses'
  | 'report_preview'
  | 'subscription'
  | 'settings';
