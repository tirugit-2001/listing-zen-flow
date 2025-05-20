
import { z } from "zod";
import { Category, categories, subcategories, brandingMethods, gstRates } from "./schema";

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
      return z.object({
        material: z.enum(["Stainless Steel", "Plastic", "Glass"]),
        capacity: z.number().min(1),
        insulation: z.enum(["Single Wall", "Double Wall", "None"]),
      });
    case "apparel":
      return z.object({
        size: z.array(z.enum(["XS", "S", "M", "L", "XL", "XXL"])),
        material: z.enum(["Cotton", "Polyester", "Blend"]),
      });
    case "diaries":
      return z.object({
        coverType: z.enum(["Hardcover", "Softcover", "Leather"]),
        pageCount: z.number().int().min(1),
      });
    // Add other categories as needed
    default:
      return z.object({});
  }
};

// Full product schema (combines all schemas)
export const getFullProductSchema = (category: Category) => {
  return z.object({
    ...baseProductSchema.shape,
    ...pricingSchema.shape,
    ...brandingSchema.shape,
    ...packagingSchema.shape,
    ...crossListingSchema.shape,
    ...certificationSchema.shape,
    categorySpecific: getDynamicCategorySchema(category),
  });
};

export type ProductFormValues = z.infer<ReturnType<typeof getFullProductSchema>>;

// Helper to get initial values based on category
export const getInitialValues = (category: Category): Partial<ProductFormValues> => {
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
