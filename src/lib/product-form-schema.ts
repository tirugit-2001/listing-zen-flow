import { z } from "zod";
import { Category, categories, subcategories, brandingMethods, gstRates } from "./schema";

// Define the BrandingZone interface to be used in the form
export interface BrandingZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  method: string;
  logoFile?: string;
  brandedMockupUrl?: string;
  appliedOn?: string;
}

// Define category-specific schemas
export const bottlesSchema = z.object({
  material: z.string(),
  capacity: z.number().min(1),
  insulation: z.string(),
});

export const apparelSchema = z.object({
  material: z.string(),
  size: z.array(z.string()),
});

export const diariesSchema = z.object({
  coverType: z.string(),
  pageCount: z.number().int().min(1),
});

// Base schema for all products
export const baseProductSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.enum(categories as [string, ...string[]]),
  subcategory: z.string().min(1, "Subcategory is required"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  productImages: z.array(z.string()).min(1, "At least one product image is required"),
});

// Price and GST schema
export const pricingSchema = z.object({
  basePriceWithoutGST: z.number().min(1, "Base price must be greater than 0"),
  gstRate: z.number().refine((val) => gstRates.includes(val), "Invalid GST rate"),
  totalPriceWithGST: z.number(),
  moq: z.number().int().min(1, "MOQ must be at least 1"),
  pricingModel: z.enum(["Flat", "Tiered"]),
  tieredPricing: z.array(
    z.object({
      minQty: z.number().int().min(1),
      maxQty: z.number().int().optional(),
      pricePerUnit: z.number().min(0),
    })
  ).optional(),
  leadTime: z.string().min(1, "Lead time is required"),
  pricingValidity: z.string(),
  samplePrice: z.number().min(0),
  countryOfOrigin: z.string().min(1, "Country of origin is required"),
});

// Branding schema
export const brandingSchema = z.object({
  brandingAvailable: z.enum(["Yes", "No"]),
  brandingMethods: z.array(z.string()).optional(),
  brandingZones: z.array(
    z.object({
      id: z.string(),
      label: z.string(),
      x: z.number(),
      y: z.number(),
      width: z.number().min(50),
      height: z.number().min(50),
      method: z.string(),
      logoFile: z.string().optional(),
      brandedMockupUrl: z.string().optional(),
      appliedOn: z.string().optional(),
    })
  ).optional(),
  brandingCost: z.number().min(0).optional(),
  brandingGstRate: z.number().default(18),
});

// Packaging schema
export const packagingSchema = z.object({
  internalPackagingType: z.string().optional(),
  internalDimensions: z.string().optional(),
  insertCompatible: z.boolean().default(false),
  insertType: z.array(z.string()).optional(),
  externalPackagingType: z.string().optional(),
  externalDimensions: z.string().optional(),
  fragileHandling: z.boolean().default(false),
  weight: z.number().min(0),
  dimensions: z.string(),
  dispatchSLA: z.number().int().min(1),
});

// Cross-listing schema
export const crossListingSchema = z.object({
  isCrossListed: z.boolean().default(false),
  originalVendorId: z.string().optional(),
  cgcsCustomBranding: z.boolean().default(false),
  crosslistBrandingPrice: z.number().min(0).optional(),
});

// Certification schema
export const certificationSchema = z.object({
  certificationRequired: z.enum(["Yes", "No"]),
  certificateType: z.string().optional(),
  certificateUpload: z.string().optional(),
});

// Get dynamic schema based on category
export const getDynamicCategorySchema = (category: Category) => {
  switch(category) {
    case "bottles":
      return bottlesSchema;
    case "apparel":
      return apparelSchema;
    case "diaries":
      return diariesSchema;
    default:
      return z.object({});
  }
};

// Full product schema (combines all schemas)
export const getFullProductSchema = (category: Category) => {
  return baseProductSchema.merge(pricingSchema).merge(brandingSchema).merge(packagingSchema).merge(crossListingSchema).merge(certificationSchema).extend({
    categorySpecific: getDynamicCategorySchema(category)
  });
};

export type ProductFormValues = z.infer<ReturnType<typeof getFullProductSchema>>;

// Define nested types for categorySpecific fields for easier use with form
export type BottlesFormValues = z.infer<typeof bottlesSchema>;
export type ApparelFormValues = z.infer<typeof apparelSchema>;
export type DiariesFormValues = z.infer<typeof diariesSchema>;

// Helper to get initial values based on category
export const getInitialValues = (category: Category): Partial<ProductFormValues> => {
  const categorySpecificValues = {
    bottles: {
      material: "Stainless Steel",
      capacity: 750,
      insulation: "Double Wall",
    },
    apparel: {
      material: "Cotton",
      size: ["M"],
    },
    diaries: {
      coverType: "Hardcover",
      pageCount: 100,
    }
  };

  return {
    productName: "",
    category,
    subcategory: subcategories[category][0],
    description: "",
    productImages: [],
    basePriceWithoutGST: 0,
    gstRate: 18,
    totalPriceWithGST: 0,
    moq: 1,
    pricingModel: "Flat",
    brandingAvailable: "No",
    certificationRequired: "No",
    weight: 0,
    dimensions: "",
    dispatchSLA: 7,
    leadTime: "7-10 days",
    pricingValidity: new Date().toISOString().split('T')[0],
    samplePrice: 0,
    countryOfOrigin: "India",
    isCrossListed: false,
    insertCompatible: false,
    fragileHandling: false,
    categorySpecific: categorySpecificValues[category] || {},
    brandingZones: [],
  };
};

// Helper function to create form sections
export const getFormSections = (category: Category, isCrossListed: boolean = false) => {
  const sections = [
    {
      id: "core",
      title: "Core Product Details",
      description: "Basic information about your product",
      fields: ["productName", "category", "subcategory", "description", "productImages"],
    },
    {
      id: "categorySpecific",
      title: "Category-Specific Details",
      description: `Information specific to ${category}`,
      fields: ["categorySpecific"],
    },
    {
      id: "pricing",
      title: "Pricing & GST",
      description: "Set your product pricing structure",
      fields: [
        "basePriceWithoutGST", 
        "gstRate", 
        "totalPriceWithGST", 
        "moq", 
        "pricingModel", 
        "tieredPricing",
        "leadTime",
        "pricingValidity",
        "samplePrice"
      ],
      disabled: isCrossListed,
    },
    {
      id: "logistics",
      title: "Logistics & Shipping",
      description: "Product dimensions and shipping details",
      fields: [
        "weight", 
        "dimensions", 
        "countryOfOrigin", 
        "dispatchSLA"
      ],
      disabled: isCrossListed,
    },
    {
      id: "branding",
      title: "Branding Options",
      description: "Set up branding zones and methods",
      fields: [
        "brandingAvailable", 
        "brandingMethods", 
        "brandingZones", 
        "brandingCost", 
        "brandingGstRate"
      ],
    },
    {
      id: "packaging",
      title: "Packaging Information",
      description: "Details about product packaging",
      fields: [
        "internalPackagingType",
        "internalDimensions",
        "insertCompatible",
        "insertType",
        "externalPackagingType",
        "externalDimensions",
        "fragileHandling"
      ],
      disabled: isCrossListed,
    },
    {
      id: "certification",
      title: "Certifications",
      description: "Required certifications for your product",
      fields: [
        "certificationRequired",
        "certificateType",
        "certificateUpload"
      ],
      disabled: isCrossListed,
    },
  ];

  // Add cross-listing section only for CGCs
  if (isCrossListed) {
    sections.push({
      id: "crossListing",
      title: "Cross-Listing Information",
      description: "Details for cross-listing this product",
      fields: [
        "originalVendorId",
        "cgcsCustomBranding",
        "crosslistBrandingPrice"
      ],
    });
  }

  return sections;
};
