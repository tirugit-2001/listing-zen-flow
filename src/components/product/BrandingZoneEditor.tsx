
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Transformer, Text } from "react-konva";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brandingMethods } from "@/lib/schema";
import { toast } from "sonner";
import { CircleIcon, Square } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type ZoneShape = "rectangle" | "circle";

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
  shape?: ZoneShape;
}

interface BrandingZoneEditorProps {
  imageUrl: string;
  category: string;
  zones: BrandingZone[];
  onChange: (zones: BrandingZone[]) => void;
}

export function BrandingZoneEditor({
  imageUrl,
  category,
  zones = [],
  onChange,
}: BrandingZoneEditorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [scale, setScale] = useState(1);
  const [newZoneShape, setNewZoneShape] = useState<ZoneShape>("rectangle");
  const containerRef = useRef<HTMLDivElement>(null);
  const transformerRef = useRef<any>(null);

  // Load image and calculate stage size
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;
    
    img.onload = () => {
      setImage(img);
      
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight || 400;
        
        // Calculate scale to fit image in container
        const scaleX = containerWidth / img.width;
        const scaleY = containerHeight / img.height;
        const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1
        
        setScale(newScale);
        setStageSize({
          width: img.width * newScale,
          height: img.height * newScale,
        });
      }
    };
    
    img.onerror = () => {
      toast.error("Failed to load image");
    };
  }, [imageUrl]);

  // Update transformer when selected zone changes
  useEffect(() => {
    if (!transformerRef.current || selectedId === null) return;
    
    const stage = transformerRef.current.getStage();
    const selectedNode = stage.findOne(`#${selectedId}`);
    
    if (selectedNode) {
      transformerRef.current.nodes([selectedNode]);
      transformerRef.current.getLayer().batchDraw();
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedId, zones]);

  const addNewZone = () => {
    if (!image) return;
    
    const id = `zone-${Date.now()}`;
    const newZone: BrandingZone = {
      id,
      label: `Zone ${zones.length + 1}`,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      method: (brandingMethods[category as keyof typeof brandingMethods] || [])[0] || "UV Print",
      shape: newZoneShape
    };
    
    onChange([...zones, newZone]);
    setSelectedId(id);
  };

  const updateZone = (id: string, updates: Partial<BrandingZone>) => {
    onChange(
      zones.map((zone) => (zone.id === id ? { ...zone, ...updates } : zone))
    );
  };

  const deleteZone = () => {
    if (selectedId === null) return;
    onChange(zones.filter((zone) => zone.id !== selectedId));
    setSelectedId(null);
  };

  const handleTransformEnd = (e: any) => {
    if (selectedId === null) return;
    
    // Get the transformer node
    const node = e.target;
    const selectedZone = zones.find(zone => zone.id === selectedId);
    if (!selectedZone) return;
    
    if (selectedZone.shape === "circle") {
      // For circles, we need to handle differently
      const scaleX = node.scaleX();
      node.scaleX(1);
      node.scaleY(1);
      
      // Calculate new dimensions based on the average of width and height
      const newRadius = node.radius() * scaleX;
      const newDiameter = newRadius * 2;
      
      updateZone(selectedId, {
        x: node.x() - newRadius,
        y: node.y() - newRadius,
        width: newDiameter,
        height: newDiameter
      });
    } else {
      // For rectangles, use standard approach
      updateZone(selectedId, {
        x: node.x(),
        y: node.y(),
        width: Math.max(50, node.width() * node.scaleX()),
        height: Math.max(50, node.height() * node.scaleY()),
      });
      
      // Reset scale as it's already applied to width and height
      node.scaleX(1);
      node.scaleY(1);
    }
  };

  // Find the selected zone
  const selectedZone = zones.find((zone) => zone.id === selectedId);

  if (!image) {
    return <div className="h-64 bg-muted flex items-center justify-center">Loading image...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-2">
          <ToggleGroup type="single" value={newZoneShape} onValueChange={(value) => value && setNewZoneShape(value as ZoneShape)}>
            <ToggleGroupItem value="rectangle" aria-label="Rectangle zone">
              <Square className="h-4 w-4 mr-2" />
              Rectangle
            </ToggleGroupItem>
            <ToggleGroupItem value="circle" aria-label="Circle zone">
              <CircleIcon className="h-4 w-4 mr-2" />
              Circle
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button type="button" variant="outline" onClick={addNewZone}>
            Add Branding Zone
          </Button>
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={deleteZone}
          disabled={selectedId === null}
        >
          Remove Selected Zone
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Canvas */}
        <div 
          ref={containerRef} 
          className="border rounded-md overflow-hidden bg-background flex items-center justify-center h-[400px]"
        >
          <Stage width={stageSize.width} height={stageSize.height}>
            {/* Background Image */}
            <Layer>
              <Rect
                width={image.width}
                height={image.height}
                fillPatternImage={image}
                fillPatternScale={{ x: scale, y: scale }}
              />
            </Layer>
            
            {/* Branding Zones */}
            <Layer>
              {zones.map((zone) => (
                zone.shape === "circle" ? (
                  <Circle
                    key={zone.id}
                    id={zone.id}
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2}
                    radius={Math.min(zone.width, zone.height) / 2}
                    fill="rgba(255, 0, 0, 0.3)"
                    stroke="red"
                    strokeWidth={2}
                    draggable
                    onClick={() => setSelectedId(zone.id)}
                    onTap={() => setSelectedId(zone.id)}
                    onDragEnd={(e) => {
                      // Update position for circle
                      const radius = Math.min(zone.width, zone.height) / 2;
                      updateZone(zone.id, {
                        x: e.target.x() - radius,
                        y: e.target.y() - radius
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
                    fill="rgba(255, 0, 0, 0.3)"
                    stroke="red"
                    strokeWidth={2}
                    draggable
                    onClick={() => setSelectedId(zone.id)}
                    onTap={() => setSelectedId(zone.id)}
                    onDragEnd={handleTransformEnd}
                  />
                )
              ))}
              
              {/* Zone labels */}
              {zones.map((zone) => (
                <Text
                  key={`text-${zone.id}`}
                  x={zone.x}
                  y={zone.y - 20}
                  text={zone.label}
                  fontSize={14}
                  fill="black"
                  padding={2}
                  background="white"
                />
              ))}
              
              <Transformer
                ref={transformerRef}
                boundBoxFunc={(oldBox, newBox) => {
                  // Min size constraints
                  if (newBox.width < 50 || newBox.height < 50) {
                    return oldBox;
                  }
                  return newBox;
                }}
                onTransformEnd={handleTransformEnd}
                rotateEnabled={false}
              />
            </Layer>
          </Stage>
        </div>
        
        {/* Properties panel */}
        <div className="min-w-[300px] p-4 border rounded-md bg-muted/20">
          <h3 className="font-medium mb-4">Branding Zone Properties</h3>
          
          {selectedZone ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="zone-label">Zone Label</Label>
                <Input
                  id="zone-label"
                  value={selectedZone.label}
                  onChange={(e) => updateZone(selectedId!, { label: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="zone-method">Branding Method</Label>
                <Select
                  value={selectedZone.method}
                  onValueChange={(value) => updateZone(selectedId!, { method: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select branding method" />
                  </SelectTrigger>
                  <SelectContent>
                    {(brandingMethods[category as keyof typeof brandingMethods] || []).map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="zone-shape">Shape</Label>
                <Select
                  value={selectedZone.shape || "rectangle"}
                  onValueChange={(value: ZoneShape) => updateZone(selectedId!, { shape: value })}
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
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="zone-x">X Position</Label>
                  <Input
                    id="zone-x"
                    type="number"
                    value={Math.round(selectedZone.x)}
                    onChange={(e) => updateZone(selectedId!, { x: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="zone-y">Y Position</Label>
                  <Input
                    id="zone-y"
                    type="number"
                    value={Math.round(selectedZone.y)}
                    onChange={(e) => updateZone(selectedId!, { y: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="zone-width">Width</Label>
                  <Input
                    id="zone-width"
                    type="number"
                    min={50}
                    value={Math.round(selectedZone.width)}
                    onChange={(e) => {
                      const width = Math.max(50, Number(e.target.value));
                      updateZone(selectedId!, { width });
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="zone-height">Height</Label>
                  <Input
                    id="zone-height"
                    type="number"
                    min={50}
                    value={Math.round(selectedZone.height)}
                    onChange={(e) => {
                      const height = Math.max(50, Number(e.target.value));
                      updateZone(selectedId!, { height });
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Select a zone to edit its properties or create a new zone
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
