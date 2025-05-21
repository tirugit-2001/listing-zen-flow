
export type AuthorizationStatus = "pending" | "approved" | "rejected";
export type DistributorStatus = "active" | "pending" | "inactive";
export type BrandStatus = "active" | "pending" | "expired";

export interface Distributor {
  id: string;
  name: string;
  email: string;
  status: DistributorStatus;
  productsAuthorized: number;
  dateAdded: string;
}

export interface Brand {
  id: string;
  name: string;
  email: string;
  status: BrandStatus;
  productsAvailable: number;
  productsCrossListed: number;
  authorizationDate: string;
}

export interface AuthorizationRequest {
  id: string;
  businessName: string;
  email: string;
  requestDate: string;
  status: AuthorizationStatus;
  message?: string;
}

export interface CrossListProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: string;
  isCrossListed: boolean;
  canBeAuthorized: boolean;
  imageUrl: string;
}

export interface DistributorProduct extends CrossListProduct {
  sellingPrice: string;
  inventory: number;
  originalPrice: string;
  authorizedBy: string;
  authorizedDate: string;
}
