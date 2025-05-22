
export interface HamperImage {
  id: string;
  url: string;
  isMain: boolean;
  aiGenerated?: boolean;
}

export interface HamperProduct {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
  crossListed: boolean;
  vendorId?: string;
}

export interface HamperPackaging {
  packageType: "standard" | "premium" | "luxury" | "eco";
  customPackaging: boolean;
  customPackagingNotes?: string;
  brandingOptions: string[];
}

export type HamperStatus = "draft" | "pending" | "active" | "rejected" | "archived";

export interface HamperPricing {
  productsTotal: number;
  packagingCost: number;
  brandingCost: number;
  total: number;
  discountPercentage?: number;
  discountedTotal?: number;
}

export interface Hamper {
  id: string;
  title: string;
  category: string;
  description: string;
  notes?: string;
  products: HamperProduct[];
  packaging: HamperPackaging;
  images: HamperImage[];
  pricing: HamperPricing;
  status: HamperStatus;
  createdAt: string;
  updatedAt: string;
  vendorId: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}
