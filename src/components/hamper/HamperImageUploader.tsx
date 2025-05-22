
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Upload, X, Image, Check, AlertTriangle, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface HamperImageUploaderProps {
  images: string[];
  updateImages: (images: string[]) => void;
  onPrevious: () => void;
}

export default function HamperImageUploader({ 
  images,
  updateImages,
  onPrevious 
}: HamperImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [useAI, setUseAI] = useState(false);
  const { toast } = useToast();
  
  // For this demo, we'll use placeholder images
  const placeholderImages = [
    "https://placehold.co/800x800?text=Hamper+Image+1",
    "https://placehold.co/800x800?text=Hamper+Image+2",
    "https://placehold.co/800x800?text=Hamper+Image+3",
    "https://placehold.co/800x800?text=Hamper+Image+4"
  ];
  
  // Handle file selection
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (!files) return;
    
    setIsLoading(true);
    
    // Simulate file upload delay
    setTimeout(() => {
      // For demo purposes, we'll use placeholder URLs
      const newImages = [...images];
      
      for (let i = 0; i < Math.min(files.length, 4 - images.length); i++) {
        newImages.push(placeholderImages[images.length + i]);
      }
      
      updateImages(newImages);
      setIsLoading(false);
      
      toast({
        title: "Images uploaded",
        description: `${Math.min(files.length, 4 - images.length)} images have been uploaded.`
      });
    }, 1500);
  };
  
  // Remove image from list
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    updateImages(newImages);
  };
  
  // Generate AI images (simulated)
  const generateAiImages = () => {
    if (!useAI) return;
    
    setIsLoading(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // For demo purposes, we'll use placeholder URLs
      updateImages([
        "https://placehold.co/800x800?text=AI+Generated+Image+1", 
        "https://placehold.co/800x800?text=AI+Generated+Image+2"
      ]);
      setIsLoading(false);
      
      toast({
        title: "AI Images Generated",
        description: "2 AI-generated images have been created for your hamper."
      });
    }, 2000);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Upload Hamper Images</h2>
      
      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="ai-generate">AI Image Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Requirements */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Image Requirements</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Upload at least one high-quality image of your complete hamper</p>
                    <p>• For best results, use images with 1:1 aspect ratio (square)</p>
                    <p>• Recommended resolution: 1000 × 1000px or higher</p>
                    <p>• Maximum file size: 5MB per image</p>
                    <p>• Acceptable formats: JPG, PNG</p>
                  </div>
                </div>
                
                {/* Upload area */}
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Upload Images</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      Drag and drop or click to browse files
                    </p>
                    <Button disabled={images.length >= 4 || isLoading}>
                      {isLoading ? "Uploading..." : "Select Files"}
                    </Button>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple 
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileSelection}
                      disabled={images.length >= 4 || isLoading}
                    />
                  </div>
                </div>
                
                {/* Preview uploaded images */}
                {images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Uploaded Images ({images.length}/4)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group border rounded-md overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Hamper image ${index + 1}`}
                            className="w-full aspect-square object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(index);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-primary text-primary-foreground">
                              Main Image
                            </Badge>
                          )}
                        </div>
                      ))}
                      {Array.from({ length: 4 - images.length }).map((_, index) => (
                        <div 
                          key={`empty-${index}`} 
                          className="border rounded-md aspect-square flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Image className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-generate" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-2">
                  <Switch
                    id="use-ai"
                    checked={useAI}
                    onCheckedChange={setUseAI}
                  />
                  <div className="grid gap-1">
                    <Label htmlFor="use-ai" className="font-medium">
                      Use AI to generate hamper images
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Our AI will create professional product images based on your hamper contents
                    </p>
                  </div>
                </div>
                
                {useAI && (
                  <div className="space-y-4">
                    <div className="border rounded-md p-4 bg-amber-50 border-amber-200">
                      <div className="flex gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Important Note</h4>
                          <p className="text-sm text-amber-700">
                            AI-generated images are for preview purposes only. For actual product listings, we recommend uploading real photographs of your hamper.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-md font-medium">AI will use:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Product information from your selected items</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Packaging style you've selected</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Branding options you've chosen</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <Button
                      className="w-full"
                      disabled={isLoading || !useAI}
                      onClick={generateAiImages}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      {isLoading ? "Generating Images..." : "Generate AI Images"}
                    </Button>
                    
                    {images.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium mb-3">Generated Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {images.map((image, index) => (
                            <div key={index} className="relative group border rounded-md overflow-hidden">
                              <img 
                                src={image} 
                                alt={`AI-generated hamper image ${index + 1}`}
                                className="w-full aspect-square object-cover"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(index);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Badge className="absolute bottom-2 right-2 bg-purple-600">
                                AI Generated
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous: Packaging
        </Button>
      </div>
    </div>
  );
}
