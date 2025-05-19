
export type BrandingZoneTemplate = {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ZoneTemplates = Record<string, BrandingZoneTemplate[]>;

export const zoneTemplates: ZoneTemplates = {
  bottles: [
    { label: "Front Face", x: 200, y: 150, width: 100, height: 200 },
    { label: "Back Face", x: 300, y: 150, width: 100, height: 200 },
    { label: "Cap", x: 250, y: 50, width: 80, height: 80 }
  ],
  apparel: [
    { label: "Front Center", x: 200, y: 150, width: 200, height: 200 },
    { label: "Back", x: 200, y: 150, width: 200, height: 200 },
    { label: "Sleeve", x: 100, y: 150, width: 80, height: 80 }
  ],
  diaries: [
    { label: "Front Cover", x: 150, y: 150, width: 200, height: 250 },
    { label: "Back Cover", x: 150, y: 150, width: 200, height: 250 },
    { label: "Spine", x: 50, y: 150, width: 50, height: 200 }
  ],
  bags: [
    { label: "Front Pocket", x: 200, y: 150, width: 150, height: 100 },
    { label: "Main Compartment", x: 200, y: 250, width: 200, height: 150 }
  ],
  hampers: [
    { label: "Box Lid", x: 200, y: 100, width: 200, height: 150 },
    { label: "Card", x: 150, y: 300, width: 150, height: 100 }
  ],
  stationery: [
    { label: "Front", x: 150, y: 150, width: 200, height: 100 },
    { label: "Back", x: 150, y: 250, width: 200, height: 100 }
  ],
  electronics: [
    { label: "Front Panel", x: 200, y: 150, width: 150, height: 80 },
    { label: "Back Panel", x: 200, y: 250, width: 150, height: 80 }
  ],
  utility: [
    { label: "Handle", x: 200, y: 100, width: 100, height: 50 },
    { label: "Main Body", x: 200, y: 200, width: 150, height: 150 }
  ],
  desktop: [
    { label: "Top", x: 200, y: 100, width: 150, height: 100 },
    { label: "Side", x: 100, y: 200, width: 80, height: 150 }
  ],
  packaging: [
    { label: "Top", x: 200, y: 100, width: 200, height: 150 },
    { label: "Side", x: 100, y: 200, width: 100, height: 200 }
  ],
  edibles: [
    { label: "Package Front", x: 200, y: 150, width: 200, height: 150 },
    { label: "Package Back", x: 200, y: 300, width: 200, height: 150 }
  ]
};

export const methodCompatibility: Record<string, { [method: string]: boolean }> = {
  "Stainless Steel": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": false,
    "Sticker": true,
    "Foil": false,
    "Laser": true
  },
  "Plastic": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": false,
    "Sticker": true,
    "Foil": true,
    "Laser": false
  },
  "Glass": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": false,
    "Sticker": true,
    "Foil": false,
    "Laser": false
  },
  "Cotton": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": true,
    "Sticker": true,
    "Foil": false,
    "Laser": false
  },
  "Polyester": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": true,
    "Sticker": true,
    "Foil": false,
    "Laser": false
  },
  "Blend": {
    "UV Print": true,
    "Screen": true,
    "Embroidery": true,
    "Sticker": true,
    "Foil": false,
    "Laser": false
  },
  "Hardcover": {
    "UV Print": true,
    "Screen": false,
    "Embroidery": false,
    "Sticker": true,
    "Foil": true,
    "Laser": true
  },
  "Softcover": {
    "UV Print": true,
    "Screen": false,
    "Embroidery": false,
    "Sticker": true,
    "Foil": true,
    "Laser": false
  }
};

export const defaultLogos = [
  "/placeholder.svg",
  "/placeholder.svg",
  "/placeholder.svg"
];
