
export const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "BaseCampMart Product Listing Schema",
  "description": "Comprehensive schema for an AI-enabled product listing system, optimized for < 4-minute listings with 60-70% effort reduction.",
  "type": "object",
  "properties": {
    "schema_version": {
      "type": "string",
      "const": "1.3.1"
    },
    "fixed_fields": {
      "type": "object",
      "required": ["productName", "category", "subcategory", "productImages"],
      "properties": {
        "productName": {
          "type": "string",
          "minLength": 3,
          "description": "Unique product name",
          "x-api": "fetchGPTSuggestions",
          "x-validation": {
            "duplicateCheck": {
              "api": "triggerMakeWorkflow",
              "action": "check_duplicate"
            }
          },
          "x-features": ["reuse_last_listing", "suggested_values"]
        },
        "category": {
          "type": "string",
          "enum": [
            "diaries",
            "bottles",
            "apparel",
            "hampers",
            "electronics",
            "bags",
            "edibles",
            "stationery",
            "utility",
            "desktop",
            "packaging",
            "digital_products"
          ],
          "description": "Product category",
          "x-api": "auto_category_detection",
          "x-features": ["suggested_values"]
        },
        "subcategory": {
          "type": "string",
          "description": "Category-specific subcategory",
          "x-dependsOn": "category",
          "x-options": {
            "diaries": ["Hardcover", "Softcover", "Spiral"],
            "bottles": ["Stainless Steel", "Plastic", "Glass"],
            "apparel": ["T-Shirts", "Hoodies", "Caps"],
            "hampers": ["Gift Baskets", "Corporate Hampers"],
            "electronics": ["Gadgets", "Accessories"],
            "bags": ["Backpacks", "Totes", "Laptop Bags"],
            "edibles": ["Snacks", "Beverages", "Sweets"],
            "stationery": ["Pens", "Notebooks", "Organizers"],
            "utility": ["Tools", "Kitchenware"],
            "desktop": ["Organizers", "Decor"],
            "packaging": ["Boxes", "Bags", "Wraps"],
            "digital_products": ["Software", "E-books", "Courses"]
          },
          "x-api": "auto_category_detection"
        },
        "productImages": {
          "type": "array",
          "items": {
            "type": "string",
            "format": "binary",
            "x-alternative": "uri"
          },
          "minItems": 1,
          "description": "Product images (JPEG/PNG, min 1000x1000px) or URLs",
          "x-validation": {
            "resolution": { "min": "1000x1000" },
            "size": { "maxMB": 5 },
            "format": ["image/jpeg", "image/png"]
          },
          "x-api": "fetchVisionTags",
          "x-features": ["auto_image_tagging"]
        }
      }
    },
    "ai_insights": {
      "type": "object",
      "properties": {
        "description": {
          "type": "string",
          "description": "Product description",
          "x-api": "fetchGPTSuggestions",
          "x-features": ["suggested_values"]
        },
        "features": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Product features",
          "x-api": "fetchGPTSuggestions",
          "x-features": ["suggested_values"]
        },
        "tags": {
          "type": "array",
          "items": { "type": "string" },
          "description": "Use-case tags",
          "x-api": "fetchGPTSuggestions",
          "x-features": ["suggested_values"]
        },
        "hsnCode": {
          "type": "string",
          "description": "HSN code",
          "x-api": "fetchGPTSuggestions",
          "x-features": ["suggested_values"]
        }
      }
    },
    "logistics_pricing": {
      "type": "object",
      "x-conditional": "productNature[category] === 'physical'",
      "required": [
        "countryOfOrigin",
        "dispatchSLA",
        "inventoryManagedByVendor",
        "dimensions",
        "weight",
        "moq",
        "tieredPricing",
        "leadTime",
        "pricingValidity",
        "samplePrice"
      ],
      "properties": {
        "countryOfOrigin": {
          "type": "string",
          "description": "Country of manufacture"
        },
        "pickupPincode": {
          "type": "string",
          "pattern": "^[0-9]{6}$",
          "description": "Pickup pincode",
          "x-conditional": "inventoryManagedByVendor === 'No'"
        },
        "dispatchSLA": {
          "type": "integer",
          "minimum": 1,
          "description": "Dispatch SLA (days)"
        },
        "inventoryManagedByVendor": {
          "type": "string",
          "enum": ["Yes", "No"],
          "description": "Inventory management responsibility"
        },
        "dimensions": {
          "type": "string",
          "description": "L×B×H (cm)",
          "x-api": "fetchVisionTags"
        },
        "weight": {
          "type": "number",
          "minimum": 0,
          "description": "Weight (grams)",
          "x-api": "fetchVisionTags"
        },
        "moq": {
          "type": "integer",
          "minimum": 1,
          "description": "Minimum Order Quantity"
        },
        "tieredPricing": {
          "type": "string",
          "description": "Pricing tiers (JSON string)",
          "x-api": "fetchGPTSuggestions"
        },
        "leadTime": {
          "type": "string",
          "description": "Lead time per tier"
        },
        "pricingValidity": {
          "type": "string",
          "format": "date",
          "description": "Pricing validity date"
        },
        "samplePrice": {
          "type": "number",
          "minimum": 0,
          "description": "Sample unit price"
        },
        "basePriceWithoutGST": {
          "type": "number",
          "minimum": 0,
          "description": "Base price per unit without GST"
        },
        "gstRate": {
          "type": "number",
          "enum": [0, 5, 12, 18, 28],
          "description": "GST rate (%)",
          "x-api": "fetchGSTRate"
        },
        "totalPriceWithGST": {
          "type": "number",
          "minimum": 0,
          "description": "Total price including GST",
          "x-computed": "basePriceWithoutGST * (1 + gstRate/100)"
        }
      }
    },
    "delivery_licensing": {
      "type": "object",
      "x-conditional": "productNature[category] === 'digital'",
      "required": ["deliveryMethod"],
      "properties": {
        "downloadableFile": {
          "type": "string",
          "format": "binary",
          "description": "Downloadable file (PDF/ZIP)",
          "x-validation": {
            "format": ["application/pdf", "application/zip"],
            "size": { "maxMB": 50 }
          }
        },
        "licenseKey": {
          "type": "string",
          "description": "License key for access"
        },
        "accessUrl": {
          "type": "string",
          "format": "uri",
          "description": "Access URL for digital product"
        },
        "deliveryMethod": {
          "type": "string",
          "enum": ["Email", "Download Link", "Cloud Access"],
          "description": "Delivery method"
        }
      }
    },
    "branding": {
      "type": "object",
      "x-conditional": "productNature[category] === 'physical' && brandingAvailable === 'Yes'",
      "required": ["brandingAvailable"],
      "properties": {
        "brandingAvailable": {
          "type": "string",
          "enum": ["Yes", "No"],
          "description": "Is branding available?"
        },
        "brandingMethods": {
          "type": "array",
          "items": {
            "type": "string",
            "enum": ["UV Print", "Screen", "Embroidery", "Sticker", "Foil", "Laser"]
          },
          "description": "Selected branding methods",
          "x-options": {
            "bottles": ["UV Print", "Screen", "Sticker", "Foil", "Laser"],
            "apparel": ["UV Print", "Screen", "Embroidery", "Sticker"],
            "diaries": ["UV Print", "Foil", "Laser"],
            "hampers": ["Sticker", "Foil"],
            "electronics": ["UV Print", "Laser"],
            "bags": ["UV Print", "Screen", "Embroidery"],
            "edibles": ["Sticker"],
            "stationery": ["UV Print", "Foil", "Laser"],
            "utility": ["UV Print", "Laser"],
            "desktop": ["UV Print", "Foil"],
            "packaging": ["Sticker", "Foil"]
          },
          "x-api": "fetchGPTSuggestions"
        },
        "brandingZones": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "label": { "type": "string" },
              "x": { "type": "number" },
              "y": { "type": "number" },
              "width": { "type": "number", "minimum": 50 },
              "height": { "type": "number", "minimum": 50 },
              "method": { "type": "string" },
              "logoFile": { "type": "string" },
              "brandedMockupUrl": { "type": "string", "format": "uri" },
              "appliedOn": { "type": "string", "format": "date" }
            },
            "required": ["label", "x", "y", "width", "height", "method"]
          },
          "description": "Branding zones",
          "x-api": "fetchVisionTags"
        }
      }
    },
    "certification": {
      "type": "object",
      "x-conditional": "certificationRequired === 'Yes' || mandatoryCertification[category]",
      "required": ["certificationRequired"],
      "properties": {
        "certificationRequired": {
          "type": "string",
          "enum": ["Yes", "No"],
          "description": "Are certifications required?"
        },
        "certificateType": {
          "type": "string",
          "enum": ["ISO", "FSSAI", "BIS", "RoHS", "CE", "FDA", "Other"],
          "description": "Type of certification",
          "x-options": {
            "electronics": ["BIS", "RoHS", "CE"],
            "edibles": ["FSSAI", "FDA"],
            "bottles": ["BIS", "FDA"],
            "apparel": ["ISO"],
            "diaries": ["ISO"],
            "hampers": ["FSSAI"],
            "bags": ["ISO"],
            "stationery": ["BIS"],
            "utility": ["BIS"],
            "desktop": ["BIS"],
            "packaging": ["ISO"],
            "digital_products": []
          }
        },
        "certificateUpload": {
          "type": "string",
          "format": "binary",
          "description": "Certificate file (PDF)",
          "x-validation": {
            "format": ["application/pdf"],
            "size": { "maxMB": 10 }
          }
        }
      }
    },
    "inserts": {
      "type": "object",
      "x-conditional": "productNature[category] === 'physical' && insertOption === 'Yes'",
      "required": ["insertOption"],
      "properties": {
        "insertOption": {
          "type": "string",
          "enum": ["Yes", "No"],
          "description": "Include inserts?"
        },
        "insertType": {
          "type": "string",
          "enum": ["Manual", "Gift Card", "Sticker", "Thank You Note", "Other"],
          "description": "Type of insert"
        }
      }
    },
    "category_specific": {
      "type": "object",
      "x-dynamic": "category",
      "properties": {
        "diaries": {
          "type": "object",
          "required": ["coverType", "pageCount"],
          "properties": {
            "coverType": {
              "type": "string",
              "enum": ["Hardcover", "Softcover", "Leather"],
              "default": "Hardcover"
            },
            "pageCount": {
              "type": "integer",
              "enum": [100, 200, 300],
              "default": 200
            }
          }
        },
        "bottles": {
          "type": "object",
          "required": ["material", "capacity"],
          "properties": {
            "material": {
              "type": "string",
              "enum": ["Stainless Steel", "Plastic", "Glass"],
              "default": "Stainless Steel",
              "x-api": "fetchVisionTags"
            },
            "capacity": {
              "type": "number",
              "enum": [250, 500, 750, 1000],
              "default": 500,
              "description": "Capacity (ml)"
            },
            "insulation": {
              "type": "string",
              "enum": ["Single Wall", "Double Wall", "None"],
              "default": "None"
            }
          }
        },
        "apparel": {
          "type": "object",
          "required": ["size", "material"],
          "properties": {
            "size": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["XS", "S", "M", "L", "XL", "XXL"]
              }
            },
            "material": {
              "type": "string",
              "enum": ["Cotton", "Polyester", "Blend"],
              "default": "Cotton"
            }
          }
        },
        "hampers": {
          "type": "object",
          "required": ["contents"],
          "properties": {
            "contents": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Items in hamper"
            }
          }
        },
        "electronics": {
          "type": "object",
          "required": ["powerSource"],
          "properties": {
            "powerSource": {
              "type": "string",
              "enum": ["Battery", "USB", "AC"],
              "default": "Battery"
            }
          }
        },
        "bags": {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "enum": ["Backpack", "Tote", "Laptop Bag"],
              "default": "Backpack"
            }
          }
        },
        "edibles": {
          "type": "object",
          "required": ["shelfLife"],
          "properties": {
            "shelfLife": {
              "type": "string",
              "description": "Shelf life (e.g., 6 months)"
            }
          }
        },
        "stationery": {
          "type": "object",
          "required": ["itemType"],
          "properties": {
            "itemType": {
              "type": "string",
              "enum": ["Pen", "Notebook", "Organizer"],
              "default": "Notebook"
            }
          }
        },
        "utility": {
          "type": "object",
          "required": ["function"],
          "properties": {
            "function": {
              "type": "string",
              "enum": ["Tool", "Kitchenware", "Other"],
              "default": "Tool"
            }
          }
        },
        "desktop": {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "enum": ["Organizer", "Decor"],
              "default": "Organizer"
            }
          }
        },
        "packaging": {
          "type": "object",
          "required": ["type"],
          "properties": {
            "type": {
              "type": "string",
              "enum": ["Box", "Bag", "Wrap"],
              "default": "Box"
            }
          }
        },
        "digital_products": {
          "type": "object",
          "required": ["fileFormat"],
          "properties": {
            "fileFormat": {
              "type": "string",
              "enum": ["PDF", "ZIP", "MP4", "EXE"],
              "description": "File format"
            },
            "version": {
              "type": "string",
              "description": "Software version"
            }
          }
        }
      }
    },
    "bulk_import_metadata": {
      "type": "object",
      "properties": {
        "fileName": { "type": "string" },
        "importDate": { "type": "string", "format": "date-time" },
        "rowCount": { "type": "integer", "minimum": 1 },
        "validRows": { "type": "integer", "minimum": 0 },
        "errorRows": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "rowNumber": { "type": "integer" },
              "errorMessage": { "type": "string" }
            }
          }
        }
      }
    }
  },
  "required": ["schema_version", "fixed_fields", "ai_insights"],
  "x-productNature": {
    "diaries": "physical",
    "bottles": "physical",
    "apparel": "physical",
    "hampers": "physical",
    "electronics": "physical",
    "bags": "physical",
    "edibles": "physical",
    "stationery": "physical",
    "utility": "physical",
    "desktop": "physical",
    "packaging": "physical",
    "digital_products": "digital"
  },
  "x-intake_order": [
    {
      "step": "Core Identifiers",
      "fields": ["fixed_fields", "bulk_import_metadata"],
      "triggers": ["GPT", "Vision API"],
      "applicable_nature": "hybrid"
    },
    {
      "step": "AI Insights",
      "fields": ["ai_insights"],
      "triggers": ["GPT"],
      "applicable_nature": "hybrid"
    },
    {
      "step": "Logistics and Pricing",
      "fields": ["logistics_pricing"],
      "applicable_nature": "physical"
    },
    {
      "step": "Delivery and Licensing",
      "fields": ["delivery_licensing"],
      "applicable_nature": "digital"
    },
    {
      "step": "Branding",
      "fields": ["branding"],
      "applicable_nature": "physical"
    },
    {
      "step": "Certification",
      "fields": ["certification"],
      "applicable_nature": "hybrid"
    },
    {
      "step": "Inserts",
      "fields": ["inserts"],
      "applicable_nature": "physical"
    },
    {
      "step": "Category-Specific",
      "fields": ["category_specific"],
      "applicable_nature": "hybrid"
    }
  ],
  "x-features": {
    "reuse_last_listing": true,
    "csv_upload": true,
    "auto_image_tagging": true,
    "branding_preview": true,
    "gpt_tooltips": true,
    "auto_category_detection": true,
    "duplicate_warning": true,
    "quick_submit": true,
    "batch_branding": true,
    "content_scoring": true,
    "live_visual_preview": true
  },
  "x-mandatoryCertification": {
    "electronics": ["BIS"],
    "edibles": ["FSSAI"],
    "bottles": ["BIS"],
    "stationery": ["BIS"],
    "utility": ["BIS"],
    "desktop": ["BIS"]
  }
};

export type Category = 
  | "diaries"
  | "bottles"
  | "apparel" 
  | "hampers"
  | "electronics"
  | "bags"
  | "edibles"
  | "stationery"
  | "utility"
  | "desktop"
  | "packaging"
  | "digital_products";

export const productNature: Record<Category, "physical" | "digital"> = {
  diaries: "physical",
  bottles: "physical",
  apparel: "physical",
  hampers: "physical",
  electronics: "physical",
  bags: "physical",
  edibles: "physical",
  stationery: "physical",
  utility: "physical",
  desktop: "physical",
  packaging: "physical",
  digital_products: "digital"
};

export const categories = schema.properties.fixed_fields.properties.category.enum as string[];

export const subcategories: Record<Category, string[]> = {
  diaries: ["Hardcover", "Softcover", "Spiral"],
  bottles: ["Stainless Steel", "Plastic", "Glass"],
  apparel: ["T-Shirts", "Hoodies", "Caps"],
  hampers: ["Gift Baskets", "Corporate Hampers"],
  electronics: ["Gadgets", "Accessories"],
  bags: ["Backpacks", "Totes", "Laptop Bags"],
  edibles: ["Snacks", "Beverages", "Sweets"],
  stationery: ["Pens", "Notebooks", "Organizers"],
  utility: ["Tools", "Kitchenware"],
  desktop: ["Organizers", "Decor"],
  packaging: ["Boxes", "Bags", "Wraps"],
  digital_products: ["Software", "E-books", "Courses"]
};

export const brandingMethods: Record<Category, string[]> = {
  bottles: ["UV Print", "Screen", "Sticker", "Foil", "Laser"],
  apparel: ["UV Print", "Screen", "Embroidery", "Sticker"],
  diaries: ["UV Print", "Foil", "Laser"],
  hampers: ["Sticker", "Foil"],
  electronics: ["UV Print", "Laser"],
  bags: ["UV Print", "Screen", "Embroidery"],
  edibles: ["Sticker"],
  stationery: ["UV Print", "Foil", "Laser"],
  utility: ["UV Print", "Laser"],
  desktop: ["UV Print", "Foil"],
  packaging: ["Sticker", "Foil"],
  digital_products: []
};

export const mandatoryCertification: Record<string, string[]> = {
  electronics: ["BIS"],
  edibles: ["FSSAI"],
  bottles: ["BIS"],
  stationery: ["BIS"],
  utility: ["BIS"],
  desktop: ["BIS"]
};

export const gstRates = [0, 5, 12, 18, 28];
