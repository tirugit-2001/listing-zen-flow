
// This is a mock API service to simulate AI suggestions and validations

export type GPTSuggestion = {
  text: string;
  confidence: number;
};

export type VisionTag = {
  label: string;
  confidence: number;
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async fetchGPTSuggestions(prompt: string, field: string): Promise<GPTSuggestion[]> {
    console.log(`Fetching GPT suggestions for field: ${field}, prompt: ${prompt}`);
    await delay(1000); // Simulate API delay
    
    const suggestions: Record<string, GPTSuggestion[]> = {
      productName: [
        { text: "Premium Stainless Steel Water Bottle", confidence: 0.95 },
        { text: "BaseCamp Hydro Flask", confidence: 0.92 },
        { text: "ECO Insulated Bottle", confidence: 0.88 }
      ],
      description: [
        { 
          text: "Durable stainless steel water bottle with double-wall vacuum insulation. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.", 
          confidence: 0.95 
        },
        { 
          text: "Premium insulated bottle perfect for outdoor activities. Leak-proof design with easy-grip exterior. Fits most cup holders.", 
          confidence: 0.90 
        }
      ],
      features: [
        { text: "24-hour cold retention", confidence: 0.96 },
        { text: "12-hour hot retention", confidence: 0.94 },
        { text: "BPA-free construction", confidence: 0.93 },
        { text: "Leak-proof lid", confidence: 0.91 },
        { text: "Sweat-free exterior", confidence: 0.89 }
      ],
      tags: [
        { text: "outdoor", confidence: 0.97 },
        { text: "hiking", confidence: 0.95 },
        { text: "camping", confidence: 0.93 },
        { text: "gym", confidence: 0.91 },
        { text: "office", confidence: 0.89 },
        { text: "travel", confidence: 0.87 }
      ],
      hsnCode: [
        { text: "7323.93.00", confidence: 0.90 }
      ],
      tieredPricing: [
        { 
          text: JSON.stringify({
            "1-99": 499,
            "100-499": 450,
            "500-999": 425,
            "1000+": 399
          }), 
          confidence: 0.92 
        }
      ],
      brandingMethods: [
        { text: "UV Print", confidence: 0.96 },
        { text: "Laser", confidence: 0.94 },
        { text: "Screen", confidence: 0.92 }
      ]
    };
    
    return suggestions[field] || [];
  },
  
  async fetchVisionTags(imageUrl: string): Promise<VisionTag[]> {
    console.log(`Analyzing image: ${imageUrl}`);
    await delay(1500); // Simulate API delay
    
    return [
      { label: "water bottle", confidence: 0.98 },
      { label: "stainless steel", confidence: 0.95 },
      { label: "insulated", confidence: 0.91 },
      { label: "double wall", confidence: 0.89 },
      { label: "silver", confidence: 0.87 }
    ];
  },
  
  async detectCategory(imageUrl: string): Promise<{ category: string; confidence: number }> {
    console.log(`Detecting category for image: ${imageUrl}`);
    await delay(1200); // Simulate API delay
    
    return { category: "bottles", confidence: 0.96 };
  },
  
  async checkDuplicate(name: string): Promise<boolean> {
    console.log(`Checking for duplicate: ${name}`);
    await delay(800); // Simulate API delay
    
    return false; // No duplicate found
  },
  
  async fetchDynamicMockup(
    imageUrl: string, 
    logoUrl: string, 
    zones: any[], 
    method: string
  ): Promise<string> {
    console.log(`Generating mockup for ${method} branding`);
    await delay(2000); // Simulate API delay
    
    // In a real implementation, this would return a URL to a generated mockup
    return "/placeholder.svg";
  },
  
  async saveTemplate(template: any): Promise<{ id: string }> {
    console.log(`Saving template:`, template);
    await delay(1000); // Simulate API delay
    
    return { id: "template-" + Math.random().toString(36).substring(2, 11) };
  },
  
  async fetchTemplate(id: string): Promise<any> {
    console.log(`Fetching template: ${id}`);
    await delay(1000); // Simulate API delay
    
    return null; // Would return the template data in a real implementation
  }
};
