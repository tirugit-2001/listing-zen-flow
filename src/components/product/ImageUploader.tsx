
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Upload, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  minWidth?: number;
  minHeight?: number;
}

export function ImageUploader({
  images = [],
  onChange,
  maxImages = 5,
  minWidth = 1000,
  minHeight = 1000,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  
  const validateImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.size > 5 * 1024 * 1024) {
        reject("Image size must be less than 5MB");
        return;
      }
      
      const img = document.createElement("img");
      const objectUrl = URL.createObjectURL(file);
      
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          URL.revokeObjectURL(objectUrl);
          reject(`Image dimensions must be at least ${minWidth}x${minHeight}px`);
        } else {
          // In a real app, you'd upload to server here
          // For demo, we'll use the object URL
          resolve(objectUrl);
        }
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject("Invalid image file");
      };
      
      img.src = objectUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    const files = Array.from(e.target.files);
    const newImages = [...images];
    
    for (const file of files) {
      if (newImages.length >= maxImages) {
        toast.error(`Maximum ${maxImages} images allowed`);
        break;
      }
      
      try {
        const imageUrl = await validateImage(file);
        newImages.push(imageUrl);
      } catch (error) {
        toast.error(error as string);
      }
    }
    
    onChange(newImages);
    setIsUploading(false);
    e.target.value = ""; // Reset input
  };

  const handleRemove = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const handleAddViaUrl = (url: string) => {
    if (images.length >= maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }
    
    const img = document.createElement("img");
    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        toast.error(`Image dimensions must be at least ${minWidth}x${minHeight}px`);
      } else {
        onChange([...images, url]);
        toast.success("Image added successfully");
      }
    };
    img.onerror = () => {
      toast.error("Invalid image URL");
    };
    img.src = url;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="h-32 w-32 object-cover rounded-md border border-border"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        {images.length < maxImages && (
          <Label
            htmlFor="image-upload"
            className={cn(
              "flex flex-col items-center justify-center h-32 w-32 border-2 border-dashed border-border rounded-md cursor-pointer hover:border-primary transition-colors",
              isUploading && "opacity-50 pointer-events-none"
            )}
          >
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-sm">Upload Image</span>
            <Input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/png,image/svg+xml,application/pdf,application/postscript"
              multiple
              className="hidden"
              disabled={isUploading}
              onChange={handleFileChange}
            />
          </Label>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Or add image via URL" 
          id="image-url" 
          type="url"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const url = (e.target as HTMLInputElement).value;
              if (url) {
                handleAddViaUrl(url);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const input = document.getElementById("image-url") as HTMLInputElement;
            if (input.value) {
              handleAddViaUrl(input.value);
              input.value = "";
            }
          }}
        >
          <Image className="h-4 w-4 mr-2" />
          Add URL
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Upload studio-quality images with white background. Min resolution: {minWidth}x{minHeight}px, Max size: 5MB.
        <br />
        Supported formats: JPEG, PNG, SVG, PDF, AI
      </div>
    </div>
  );
}
