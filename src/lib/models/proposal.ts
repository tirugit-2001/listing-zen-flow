
export interface ProposalProduct {
  id: string;
  name: string;
  thumbnail: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  brandingOptions?: ProposalBrandingOption[];
  crossListed?: boolean;
}

export interface ProposalBrandingOption {
  type: "logo" | "text" | "engraving" | "custom";
  position?: string;
  text?: string;
  logoUrl?: string;
  additionalCost: number;
  notes?: string;
}

export interface ProposalPackaging {
  type: "standard" | "premium" | "eco" | "custom";
  description: string;
  cost: number;
}

export interface ProposalDiscount {
  type: "percentage" | "fixed" | "bulk";
  value: number;
  description: string;
}

export interface ProposalClient {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  address?: string;
  previousOrders?: number;
}

export interface ProposalTerms {
  paymentTerms: string;
  deliveryTerms: string;
  validUntil: string;
  additionalNotes?: string;
}

export type ProposalStatus = "draft" | "sent" | "approved" | "rejected" | "expired";

export interface ProposalPricing {
  subtotal: number;
  brandingCost: number;
  packagingCost: number;
  discountAmount: number;
  taxAmount: number;
  taxRate: number;
  total: number;
}

export interface Proposal {
  id: string;
  title: string;
  client: ProposalClient;
  products: ProposalProduct[];
  branding?: ProposalBrandingOption[];
  packaging: ProposalPackaging;
  discounts?: ProposalDiscount[];
  terms: ProposalTerms;
  pricing: ProposalPricing;
  status: ProposalStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  expiresAt?: string;
  notes?: string;
  isOfflineOrder: boolean;
}
