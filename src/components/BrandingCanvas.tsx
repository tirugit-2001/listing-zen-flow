import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, Image as KonvaImage, Transformer } from "react-konva";
import Konva from "konva"; // Add this import for the Konva namespace
import { useToast } from "@/hooks/use-toast";
import { mockApi } from "@/lib/mock-api";
import { Category } from "@/lib/schema";
import { zoneTemplates, BrandingZoneTemplate, defaultLogos } from "@/lib/branding-templates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Download, 
  Plus, 
  Trash, 
  Check, 
  Image as ImageIcon, 
  RefreshCw, 
  Sparkles, 
  Menu, 
  Copy, 
  Share, 
  BarChart2,
  Circle as CircleIcon,
  Square
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrandingZone } from "@/lib/product-form-schema";

type BrandingCanvasProps = {
  category?: Category;
  initialImage?: string;
  isCrossListing?: boolean;
  isTemplateMode?: boolean;
  onSaveZones?: (zones: BrandingZone[]) => void;
};

type ZoneShape = "rectangle" | "circle";

type Zone = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  method: string;
  selected: boolean;
  shape: ZoneShape;
};

type Logo = {
  id: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zoneId: string | null;
  selected: boolean;
};

type ABTestVariant = {
  id: string;
  name: string;
  zones: Zone[];
  logos: Logo[];
  performance?: {
    views: number;
    clicks: number;
    ctr: number;
  };
};

type CrossListingProfile = {
  id: string;
  name: string;
  vendorId: string;
  vendorType: string;
  customBranding: boolean;
  customPricing?: {
    basePriceWithoutGST: number;
    gstRate: number;
    brandingCost: number;
    brandingGstRate: number;
  };
};

const brandingMethods = ["UV Print", "Screen", "Embroidery", "Sticker", "Foil", "Laser", "Digital Print", "Pad Print"];

export default function BrandingCanvas({ 
  category = "bottles", 
  initialImage,
  isCrossListing = false,
  isTemplateMode = false,
  onSaveZones
}: BrandingCanvasProps) {
  const { toast } = useToast();
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const [productImage, setProductImage] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 600, height: 600 });
  const [zones, setZones] = useState<Zone[]>([]);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<Logo | null>(null);
  const [canvasMode, setCanvasMode] = useState<"zone" | "logo">("zone");
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mockups, setMockups] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [newZoneShape, setNewZoneShape] = useState<ZoneShape>("rectangle");
  
  // State for A/B testing
  const [abTestingEnabled, setAbTestingEnabled] = useState(false);
  const [abTestVariants, setAbTestVariants] = useState<ABTestVariant[]>([
    { id: "default", name: "Default", zones: [], logos: [] }
  ]);
  const [currentVariant, setCurrentVariant] = useState<string>("default");
  
  // State for cross-listing
  const [crossListingEnabled, setCrossListingEnabled] = useState(false);
  const [crossListingProfiles, setCrossListingProfiles] = useState<CrossListingProfile[]>([]);
  const [selectedCrossListingProfile, setSelectedCrossListingProfile] = useState<string | null>(null);

  // Multiple images support
  const [productImages, setProductImages] = useState<string[]>(initialImage ? [initialImage] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load initial image
  useEffect(() => {
    if (initialImage) {
      setProductImages([initialImage]);
      loadImage(initialImage);
    } else {
      loadImage("/placeholder.svg");
    }
  }, [initialImage]);

  const loadImage = (src: string) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setProductImage(img);
      
      // Adjust stage size based on image dimensions
      const maxWidth = containerRef.current?.clientWidth || 600;
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      
      setStageSize({ width, height });
    };
  };

  // Sync zones and logos with current A/B test variant
  useEffect(() => {
    const variant = abTestVariants.find(v => v.id === currentVariant);
    if (variant) {
      setZones(variant.zones);
      setLogos(variant.logos);
    }
  }, [currentVariant, abTestVariants]);

  // Auto-detect zones based on category
  const detectZones = async () => {
    if (!productImages[currentImageIndex]) {
      toast({
        title: "Error",
        description: "No image available for zone detection.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // In a real app, this would use Vision API to analyze the image
      await mockApi.fetchVisionTags(productImages[currentImageIndex]);
      
      // Get templates for this category
      const templates = zoneTemplates[category] || [];
      
      if (templates.length > 0) {
        // Create zones from templates
        const newZones = templates.map((template, index) => ({
          id: `zone-${Date.now()}-${index}`,
          ...template,
          method: brandingMethods[0],
          selected: false,
          shape: "rectangle" as ZoneShape
        }));
        
        setZones(newZones);
        
        // Update current A/B test variant
        if (abTestingEnabled) {
          setAbTestVariants(prev => 
            prev.map(v => 
              v.id === currentVariant 
                ? { ...v, zones: newZones } 
                : v
            )
          );
        }
        
        toast({
          title: "Zones detected",
          description: `${newZones.length} branding zones detected for this ${category} product.`,
        });
      } else {
        toast({
          title: "No zones detected",
          description: "Please create branding zones manually.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to detect zones. Please try again or create zones manually.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle zone selection
  const handleSelectZone = (zone: Zone) => {
    if (canvasMode !== "zone") return;
    
    const newZones = zones.map(z => ({
      ...z,
      selected: z.id === zone.id
    }));
    
    setZones(newZones);
    setSelectedZone(zone);
    setSelectedLogo(null);
    
    // Update current A/B test variant
    if (abTestingEnabled) {
      setAbTestVariants(prev => 
        prev.map(v => 
          v.id === currentVariant 
            ? { ...v, zones: newZones } 
            : v
        )
      );
    }
  };

  // Add a new zone
  const handleAddZone = () => {
    if (!productImage) return;
    
    const centerX = stageSize.width / 2 - 50;
    const centerY = stageSize.height / 2 - 50;
    
    const newZone: Zone = {
      id: `zone-${Date.now()}`,
      label: `Zone ${zones.length + 1}`,
      x: centerX,
      y: centerY,
      width: 100,
      height: 100,
      method: brandingMethods[0],
      selected: true,
      shape: newZoneShape
    };
    
    const newZones = zones.map(z => ({ ...z, selected: false }));
    newZones.push(newZone);
    
    setZones(newZones);
    setSelectedZone(newZone);
    
    // Update current A/B test variant
    if (abTestingEnabled) {
      setAbTestVariants(prev => 
        prev.map(v => 
          v.id === currentVariant 
            ? { ...v, zones: newZones } 
            : v
        )
      );
    }
  };

  // Remove a zone
  const handleRemoveZone = (id: string) => {
    const newZones = zones.filter(z => z.id !== id);
    setZones(newZones);
    
    if (selectedZone?.id === id) {
      setSelectedZone(null);
    }
    
    // Remove any logos in this zone
    const newLogos = logos.filter(l => l.zoneId !== id);
    setLogos(newLogos);
    
    // Update current A/B test variant
    if (abTestingEnabled) {
      setAbTestVariants(prev => 
        prev.map(v => 
          v.id === currentVariant 
            ? { ...v, zones: newZones, logos: newLogos } 
            : v
        )
      );
    }
  };

  // Update zone properties
  const handleUpdateZone = (id: string, updates: Partial<Zone>) => {
    const newZones = zones.map(z => 
      z.id === id ? { ...z, ...updates } : z
    );
    
    setZones(newZones);
    
    if (selectedZone?.id === id) {
      setSelectedZone(prev => prev ? { ...prev, ...updates } : null);
    }
    
    // Update current A/B test variant
    if (abTestingEnabled) {
      setAbTestVariants(prev => 
        prev.map(v => 
          v.id === currentVariant 
            ? { ...v, zones: newZones } 
            : v
        )
      );
    }
  };

  // Handle zone transform (resize/move)
  const handleZoneTransform = (e: any) => {
    if (!selectedZone) return;
    
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Reset scale to avoid accumulation
    node.scaleX(1);
    node.scaleY(1);
    
    const updatedZone = {
      ...selectedZone,
      x: node.x(),
      y: node.y(),
      width: Math.max(50, node.width() * scaleX),
      height: Math.max(50, node.height() * scaleY)
    };
    
    handleUpdateZone(selectedZone.id, updatedZone);
  };

  // Add logo to a zone
  const handleAddLogo = (zoneId: string, logoUrl: string) => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;
    
    const img = new Image();
    img.src = logoUrl;
    img.onload = () => {
      // Scale logo to fit in zone while maintaining aspect ratio
      const aspectRatio = img.width / img.height;
      let logoWidth = zone.width * 0.8;
      let logoHeight = logoWidth / aspectRatio;
      
      if (logoHeight > zone.height * 0.8) {
        logoHeight = zone.height * 0.8;
        logoWidth = logoHeight * aspectRatio;
      }
      
      const logoX = zone.x + (zone.width - logoWidth) / 2;
      const logoY = zone.y + (zone.height - logoHeight) / 2;
      
      const newLogo: Logo = {
        id: `logo-${Date.now()}`,
        url: logoUrl,
        x: logoX,
        y: logoY,
        width: logoWidth,
        height: logoHeight,
        rotation: 0,
        zoneId,
        selected: true
      };
      
      // Remove any existing logo in this zone
      const filteredLogos = logos.filter(l => l.zoneId !== zoneId);
      filteredLogos.push(newLogo);
      
      setLogos(filteredLogos);
      setSelectedLogo(newLogo);
      setCanvasMode("logo");
      
      // Update current A/B test variant
      if (abTestingEnabled) {
        setAbTestVariants(prev => 
          prev.map(v => 
            v.id === currentVariant 
              ? { ...v, logos: filteredLogos } 
              : v
          )
        );
      }
    };
  };

  // Generate a mockup
  const generateMockup = async () => {
    if (zones.length === 0 || logos.length === 0) {
      toast({
        title: "Cannot generate mockup",
        description: "Please add at least one zone and logo first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For each zone with a logo, generate a mockup
      const mockupPromises = zones.map(async zone => {
        const logo = logos.find(l => l.zoneId === zone.id);
        if (!logo) return null;
        
        const mockupUrl = await mockApi.fetchDynamicMockup(
          productImages[currentImageIndex] || "/placeholder.svg",
          logo.url,
          [{
            x: zone.x,
            y: zone.y,
            width: zone.width,
            height: zone.height,
            label: zone.label
          }],
          zone.method
        );
        
        return mockupUrl;
      });
      
      const results = await Promise.all(mockupPromises);
      const validMockups = results.filter(Boolean) as string[];
      
      setMockups(validMockups);
      
      toast({
        title: "Mockups generated",
        description: `${validMockups.length} branding mockups have been generated.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate mockups. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Export canvas as PNG
  const exportCanvasAsPng = () => {
    if (!stageRef.current) {
      toast({
        title: "Error",
        description: "Canvas is not ready for export.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      // Temporarily hide transformer
      const transformer = transformerRef.current;
      if (transformer) {
        transformer.nodes([]);
      }
      
      // Get data URL from stage
      const dataURL = stageRef.current.toDataURL({ 
        pixelRatio: 2, 
        mimeType: "image/png" 
      });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = `branding-mockup-${Date.now()}.png`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Export successful",
        description: "Canvas exported as PNG.",
      });
      
      return dataURL;
    } catch (error) {
      console.error("Export error:", error);
      toast({
        title: "Export failed",
        description: "Unable to export canvas as PNG.",
        variant: "destructive"
      });
      return null;
    }
  };

  // Add new image
  const handleAddImage = (url: string) => {
    if (productImages.includes(url)) {
      toast({
        title: "Duplicate image",
        description: "This image has already been added.",
        variant: "destructive"
      });
      return;
    }
    
    setProductImages(prev => [...prev, url]);
    setCurrentImageIndex(productImages.length);
    loadImage(url);
  };

  useEffect(() => {
    if (!selectedZone && !selectedLogo) {
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
      }
      return;
    }
    
    if (transformerRef.current) {
      const node = stageRef.current.findOne(
        `#${selectedZone ? selectedZone.id : selectedLogo?.id}`
      );
      
      if (node) {
        transformerRef.current.nodes([node]);
      } else {
        transformerRef.current.nodes([]);
      }
    }
  }, [selectedZone, selectedLogo]);

  // Convert internal zones format to BrandingZones format for saving
  const convertZonesToBrandingZones = (): BrandingZone[] => {
    return zones.map(zone => {
      const logo = logos.find(l => l.zoneId === zone.id);
      return {
        id: zone.id,
        label: zone.label,
        x: zone.x,
        y: zone.y,
        width: zone.width,
        height: zone.height,
        method: zone.method,
        shape: zone.shape,
        logoFile: logo?.url,
        brandedMockupUrl: mockups.length > 0 ? mockups[0] : undefined,
        appliedOn: productImages[currentImageIndex],
        isCrossListing: isCrossListing
      };
    });
  };

  // Save the zones when requested
  useEffect(() => {
    if (onSaveZones) {
      const brandingZones = convertZonesToBrandingZones();
      onSaveZones(brandingZones);
    }
  }, [zones, logos, mockups, isCrossListing, productImages, currentImageIndex, onSaveZones]);

  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Branding Canvas</span>
            <Badge>{category}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="ab-testing" className="text-sm font-normal">A/B Testing</Label>
              <Switch
                id="ab-testing"
                checked={abTestingEnabled}
                onCheckedChange={setAbTestingEnabled}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Canvas Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={exportCanvasAsPng}>
                  <Download className="mr-2 h-4 w-4" />
                  Export as PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCrossListingEnabled(!crossListingEnabled)}>
                  <Share className="mr-2 h-4 w-4" />
                  {crossListingEnabled ? "Hide Cross-listing" : "Enable Cross-listing"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={generateMockup}>
                  <Copy className="mr-2 h-4 w-4" />
                  Generate Mockups
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardTitle>
        <CardDescription>
          Add branding zones and preview different branding methods on your product
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* A/B Testing Variant Selector */}
        {abTestingEnabled && (
          <div className="mb-4 border rounded-md p-4 bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">A/B Testing Variants</h3>
              <Button size="sm" variant="outline" onClick={() => {
                const newVariant: ABTestVariant = {
                  id: `variant-${Date.now()}`,
                  name: `Variant ${abTestVariants.length + 1}`,
                  zones: [],
                  logos: []
                };
                
                setAbTestVariants(prev => [...prev, newVariant]);
                setCurrentVariant(newVariant.id);
              }}>
                <Plus className="h-4 w-4 mr-1" />
                Add Variant
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {abTestVariants.map(variant => (
                <div 
                  key={variant.id}
                  className={`border rounded-md px-3 py-1.5 cursor-pointer transition-colors ${
                    currentVariant === variant.id 
                      ? 'bg-primary/20 border-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setCurrentVariant(variant.id)}
                >
                  <div className="flex items-center gap-2">
                    <span>{variant.name}</span>
                    {variant.performance && (
                      <Badge variant="outline" className="text-xs">
                        CTR: {variant.performance.ctr.toFixed(1)}%
                      </Badge>
                    )}
                    {abTestVariants.length > 1 && (
                      <button
                        className="text-muted-foreground hover:text-destructive ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (abTestVariants.length <= 1) return;
                          
                          setAbTestVariants(prev => prev.filter(v => v.id !== variant.id));
                          
                          if (currentVariant === variant.id) {
                            setCurrentVariant(abTestVariants[0].id);
                          }
                        }}
                      >
                        <Trash className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Multi-image selector */}
        {productImages.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium mb-2">Product Images</h3>
            <div className="flex overflow-x-auto gap-2 pb-2">
              {productImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer border-2 rounded-md overflow-hidden ${
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    loadImage(img);
                  }}
                >
                  <img 
                    src={img} 
                    alt={`Product view ${index + 1}`} 
                    className="h-16 w-16 object-contain"
                  />
                  {index === currentImageIndex && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
              
              <div className="flex-shrink-0 h-16 w-16 border-2 border-dashed rounded-md flex items-center justify-center">
                <Input
                  type="url"
                  placeholder="Add URL"
                  className="w-full h-full opacity-0 absolute cursor-pointer"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const url = (e.target as HTMLInputElement).value.trim();
                      if (url) {
                        handleAddImage(url);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <Plus className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}

        {/* Cross-listing Profiles */}
        {crossListingEnabled && (
          <div className="mb-4 border rounded-md p-4 bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Cross-listing Profiles</h3>
              {crossListingProfiles.length === 0 && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    const mockProfiles: CrossListingProfile[] = [
                      {
                        id: "profile-1",
                        name: "ABC Enterprises",
                        vendorId: "vendor-123",
                        vendorType: "Corporate",
                        customBranding: true,
                        customPricing: {
                          basePriceWithoutGST: 450,
                          gstRate: 18,
                          brandingCost: 50,
                          brandingGstRate: 18
                        }
                      },
                      {
                        id: "profile-2",
                        name: "XYZ Solutions",
                        vendorId: "vendor-456",
                        vendorType: "Corporate",
                        customBranding: false
                      }
                    ];
                    
                    setCrossListingProfiles(mockProfiles);
                    setSelectedCrossListingProfile(mockProfiles[0].id);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Profiles
                </Button>
              )}
            </div>
            {crossListingProfiles.length > 0 ? (
              <div className="space-y-2">
                <Select
                  value={selectedCrossListingProfile || ""}
                  onValueChange={setSelectedCrossListingProfile}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {crossListingProfiles.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        {profile.name} ({profile.vendorType})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {selectedCrossListingProfile && (
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {crossListingProfiles
                      .filter(p => p.id === selectedCrossListingProfile)
                      .map(profile => (
                        <div key={profile.id} className="border rounded-md p-3 bg-background">
                          <div className="font-medium mb-2">{profile.name}</div>
                          <div className="text-muted-foreground">Vendor ID: {profile.vendorId}</div>
                          <div className="text-muted-foreground">Type: {profile.vendorType}</div>
                          <div className="mt-2">
                            <span className="text-xs font-medium">Custom Branding:</span>
                            <Badge 
                              variant={profile.customBranding ? "default" : "outline"} 
                              className="ml-2"
                            >
                              {profile.customBranding ? "Yes" : "No"}
                            </Badge>
                          </div>
                          {profile.customPricing && (
                            <div className="mt-2 space-y-1 text-xs">
                              <div className="font-medium">Custom Pricing:</div>
                              <div>Base: ₹{profile.customPricing.basePriceWithoutGST}</div>
                              <div>GST: {profile.customPricing.gstRate}%</div>
                              <div>Branding: ₹{profile.customPricing.brandingCost}</div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                No cross-listing profiles available. Click "Add Profiles" to create some.
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div 
            className="w-full md:w-2/3 border rounded-lg overflow-hidden bg-gray-50"
            ref={containerRef}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant={canvasMode === "zone" ? "default" : "outline"}
                  onClick={() => setCanvasMode("zone")}
                >
                  Zones
                </Button>
                <Button
                  size="sm"
                  variant={canvasMode === "logo" ? "default" : "outline"}
                  onClick={() => setCanvasMode("logo")}
                >
                  Logos
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={detectZones}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    "Auto-detect Zones"
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      onClick={handleAddZone}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Zone
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Zone Shape</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setNewZoneShape("rectangle")}>
                      <Square className="h-4 w-4 mr-2" />
                      Rectangle
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewZoneShape("circle")}>
                      <CircleIcon className="h-4 w-4 mr-2" />
                      Circle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <Stage
                width={stageSize.width}
                height={stageSize.height}
                ref={stageRef}
              >
                <Layer>
                  {productImage && (
                    <KonvaImage
                      image={productImage}
                      width={stageSize.width}
                      height={stageSize.height}
                    />
                  )}
                  
                  {zones.map((zone) => (
                    zone.shape === "circle" ? (
                      <Circle
                        key={zone.id}
                        id={zone.id}
                        x={zone.x + zone.width / 2}
                        y={zone.y + zone.height / 2}
                        radius={Math.min(zone.width, zone.height) / 2}
                        fill={zone.selected ? "rgba(242, 204, 59, 0.2)" : "rgba(255, 255, 255, 0.2)"}
                        stroke={zone.selected ? "#f2cc3b" : "#ddd"}
                        strokeWidth={2}
                        dash={[5, 5]}
                        draggable={canvasMode === "zone"}
                        onClick={() => handleSelectZone(zone)}
                        onTap={() => handleSelectZone(zone)}
                        onDragEnd={(e) => {
                          // Update position for circle
                          const radius = Math.min(zone.width, zone.height) / 2;
                          handleUpdateZone(zone.id, {
                            x: e.target.x() - radius,
                            y: e.target.y() - radius
                          });
                        }}
                        onTransformEnd={(e) => {
                          const node = e.target;
                          const scaleX = node.scaleX();
                          const scaleY = node.scaleY();
                          
                          // Reset scale
                          node.scaleX(1);
                          node.scaleY(1);
                          
                          // Get new radius (average of width and height)
                          // Type cast node to access the radius property
                          const circleNode = node as Konva.Circle;
                          const newRadius = circleNode.radius() * Math.max(scaleX, scaleY);
                          const newDiameter = newRadius * 2;
                          
                          handleUpdateZone(zone.id, {
                            width: newDiameter,
                            height: newDiameter,
                            x: node.x() - newRadius,
                            y: node.y() - newRadius
                          });
                        }}
                      />
                    ) : (
                      <Rect
                        key={zone.id}
                        id={zone.id}
                        x={zone.x}
                        y={zone.y}
                        width={zone.width}
                        height={zone.height}
                        fill={zone.selected ? "rgba(242, 204, 59, 0.2)" : "rgba(255, 255, 255, 0.2)"}
                        stroke={zone.selected ? "#f2cc3b" : "#ddd"}
                        strokeWidth={2}
                        dash={[5, 5]}
                        draggable={canvasMode === "zone"}
                        onClick={() => handleSelectZone(zone)}
                        onTap={() => handleSelectZone(zone)}
                        onDragEnd={handleZoneTransform}
                        onTransformEnd={handleZoneTransform}
                      />
                    )
                  ))}
                  
                  {logos.map((logo) => (
                    <KonvaImage
                      key={logo.id}
                      id={logo.id}
                      image={(() => {
                        const img = new Image();
                        img.src = logo.url;
                        return img;
                      })()}
                      x={logo.x}
                      y={logo.y}
                      width={logo.width}
                      height={logo.height}
                      rotation={logo.rotation}
                      draggable={canvasMode === "logo"}
                      visible={true}
                      onClick={() => {
                        if (canvasMode === "logo") {
                          setSelectedLogo(logo);
                          setSelectedZone(null);
                          
                          const newLogos = logos.map(l => ({
                            ...l,
                            selected: l.id === logo.id
                          }));
                          
                          setLogos(newLogos);
                          
                          // Update current A/B test variant
                          if (abTestingEnabled) {
                            setAbTestVariants(prev => 
                              prev.map(v => 
                                v.id === currentVariant 
                                  ? { ...v, logos: newLogos } 
                                  : v
                              )
                            );
                          }
                        }
                      }}
                      onDragEnd={(e) => {
                        const newLogos = logos.map(l => 
                          l.id === logo.id 
                            ? { 
                                ...l,
                                x: e.target.x(),
                                y: e.target.y()
                              }
                            : l
                        );
                        
                        setLogos(newLogos);
                        
                        // Update current A/B test variant
                        if (abTestingEnabled) {
                          setAbTestVariants(prev => 
                            prev.map(v => 
                              v.id === currentVariant 
                                ? { ...v, logos: newLogos } 
                                : v
                            )
                          );
                        }
                      }}
                      onTransformEnd={(e) => {
                        const node = e.target;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        
                        node.scaleX(1);
                        node.scaleY(1);
                        
                        const newLogos = logos.map(l => 
                          l.id === logo.id 
                            ? { 
                                ...l,
                                x: node.x(),
                                y: node.y(),
                                width: node.width() * scaleX,
                                height: node.height() * scaleY,
                                rotation: node.rotation()
                              }
                            : l
                        );
                        
                        setLogos(newLogos);
                        
                        // Update current A/B test variant
                        if (abTestingEnabled) {
                          setAbTestVariants(prev => 
                            prev.map(v => 
                              v.id === currentVariant 
                                ? { ...v, logos: newLogos } 
                                : v
                            )
                          );
                        }
                      }}
                    />
                  ))}
                  
                  <Transformer
                    ref={transformerRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      // Minimum size is 50px
                      if (newBox.width < 50 || newBox.height < 50) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                    rotateEnabled={canvasMode === "logo"}
                  />
                </Layer>
              </Stage>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            {selectedZone ? (
              <div className="space-y-4">
                <h3 className="font-medium">Zone Properties</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Label</label>
                      <input
                        type="text"
                        value={selectedZone.label}
                        onChange={(e) => {
                          handleUpdateZone(selectedZone.id, { label: e.target.value });
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Method</label>
                      <Select
                        value={selectedZone.method}
                        onValueChange={(value) => {
                          handleUpdateZone(selectedZone.id, { method: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandingMethods.map((method) => (
                            <SelectItem key={method} value={method}>
                              {method}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Shape</label>
                      <Select
                        value={selectedZone.shape}
                        onValueChange={(value: ZoneShape) => {
                          handleUpdateZone(selectedZone.id, { shape: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select shape" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rectangle">Rectangle</SelectItem>
                          <SelectItem value="circle">Circle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Width (px)</label>
                      <input
                        type="number"
                        min="50"
                        value={Math.round(selectedZone.width)}
                        onChange={(e) => {
                          const width = Math.max(50, Number(e.target.value));
                          handleUpdateZone(selectedZone.id, { width });
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Height (px)</label>
                      <input
                        type="number"
                        min="50"
                        value={Math.round(selectedZone.height)}
                        onChange={(e) => {
                          const height = Math.max(50, Number(e.target.value));
                          handleUpdateZone(selectedZone.id, { height });
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">X Position</label>
                      <input
                        type="number"
                        value={Math.round(selectedZone.x)}
                        onChange={(e) => {
                          handleUpdateZone(selectedZone.id, { x: Number(e.target.value) });
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Y Position</label>
                      <input
                        type="number"
                        value={Math.round(selectedZone.y)}
                        onChange={(e) => {
                          handleUpdateZone(selectedZone.id, { y: Number(e.target.value) });
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Add Logo to Zone</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {defaultLogos.map((logo, index) => (
                        <div 
                          key={index}
                          className="aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-primary"
                          onClick={() => handleAddLogo(selectedZone.id, logo)}
                        >
                          <img
                            src={logo}
                            alt={`Logo ${index + 1}`}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/png,image/jpeg,image/svg+xml';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              const dataUrl = reader.result as string;
                              handleAddLogo(selectedZone.id, dataUrl);
                            };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Custom Logo
                    </Button>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleRemoveZone(selectedZone.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Remove Zone
                  </Button>
                </div>
              </div>
            ) : selectedLogo ? (
              <div className="space-y-4">
                <h3 className="font-medium">Logo Properties</h3>
                
                <div className="space-y-3">
                  <div className="border rounded-md p-2 bg-muted/20">
                    <img 
                      src={selectedLogo.url} 
                      alt="Selected logo" 
                      className="h-20 object-contain mx-auto"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Width (px)</label>
                      <input
                        type="number"
                        min="10"
                        value={Math.round(selectedLogo.width)}
                        onChange={(e) => {
                          const width = Math.max(10, Number(e.target.value));
                          const newLogos = logos.map(l => 
                            l.id === selectedLogo.id 
                              ? { ...l, width } 
                              : l
                          );
                          setLogos(newLogos);
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Height (px)</label>
                      <input
                        type="number"
                        min="10"
                        value={Math.round(selectedLogo.height)}
                        onChange={(e) => {
                          const height = Math.max(10, Number(e.target.value));
                          const newLogos = logos.map(l => 
                            l.id === selectedLogo.id 
                              ? { ...l, height } 
                              : l
                          );
                          setLogos(newLogos);
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-muted-foreground">X Position</label>
                      <input
                        type="number"
                        value={Math.round(selectedLogo.x)}
                        onChange={(e) => {
                          const x = Number(e.target.value);
                          const newLogos = logos.map(l => 
                            l.id === selectedLogo.id 
                              ? { ...l, x } 
                              : l
                          );
                          setLogos(newLogos);
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Y Position</label>
                      <input
                        type="number"
                        value={Math.round(selectedLogo.y)}
                        onChange={(e) => {
                          const y = Number(e.target.value);
                          const newLogos = logos.map(l => 
                            l.id === selectedLogo.id 
                              ? { ...l, y } 
                              : l
                          );
                          setLogos(newLogos);
                        }}
                        className="w-full rounded-md border px-3 py-1 text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-muted-foreground">Rotation (degrees)</label>
                    <input
                      type="number"
                      value={Math.round(selectedLogo.rotation)}
                      onChange={(e) => {
                        const rotation = Number(e.target.value);
                        const newLogos = logos.map(l => 
                          l.id === selectedLogo.id 
                            ? { ...l, rotation } 
                            : l
                        );
                        setLogos(newLogos);
                      }}
                      className="w-full rounded-md border px-3 py-1 text-sm"
                    />
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      const newLogos = logos.filter(l => l.id !== selectedLogo.id);
                      setLogos(newLogos);
                      setSelectedLogo(null);
                      
                      // Update current A/B test variant
                      if (abTestingEnabled) {
                        setAbTestVariants(prev => 
                          prev.map(v => 
                            v.id === currentVariant 
                              ? { ...v, logos: newLogos } 
                              : v
                          )
                        );
                      }
                    }}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Remove Logo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border rounded-md p-4 bg-muted/20">
                <h3 className="font-medium mb-2">Branding Canvas Instructions</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Select "Auto-detect Zones" for automatic zone detection
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Click on a zone to select it and edit its properties
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Add a logo to a zone by selecting the zone first
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Choose different branding methods for each zone
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Create both rectangular and circular branding zones
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5" />
                    Add multiple product images to create zones for each view
                  </li>
                </ul>
                
                {zones.length > 0 && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      Click on a zone to edit its properties and add a logo
                    </AlertDescription>
                  </Alert>
                )}
                
                {zones.length === 0 && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      No branding zones defined yet. Click "Auto-detect Zones" or "Add Zone"
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={generateMockup}
                disabled={isLoading || zones.length === 0 || logos.length === 0}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Mockups...
                  </>
                ) : (
                  <>Generate Branding Mockups</>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={exportCanvasAsPng}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Canvas as PNG
              </Button>
            </div>
          </div>
        </div>
        
        {mockups.length > 0 && (
          <div className="mt-6">
            <h3 className="font-medium mb-4">Branding Mockups</h3>
            
            <Tabs defaultValue="preview">
              <TabsList className="mb-4">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="mockups">All Mockups ({mockups.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-square max-h-[400px] overflow-hidden">
                    <img
                      src={mockups[0]}
                      alt="Branding Mockup"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                    <div>
                      <p className="font-medium">Final Branding Preview</p>
                      <p className="text-sm text-muted-foreground">
                        {zones.length} zone(s), {logos.length} logo(s)
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.download = `branding-mockup-${Date.now()}.png`;
                        link.href = mockups[0];
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mockups">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockups.map((mockup, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square">
                        <img
                          src={mockup}
                          alt={`Mockup ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-2 border-t bg-gray-50 flex justify-between items-center">
                        <span className="text-sm font-medium">Mockup {index + 1}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.download = `branding-mockup-${Date.now()}-${index}.png`;
                            link.href = mockup;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Use the branding canvas to define zones and preview branding methods
        </p>
      </CardFooter>
    </Card>
  );
}
