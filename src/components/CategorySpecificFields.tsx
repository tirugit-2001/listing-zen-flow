
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Category } from "@/lib/schema";
import { useFormContext } from "react-hook-form";

interface CategorySpecificFieldsProps {
  category: Category;
  disabled?: boolean;
}

export function CategorySpecificFields({ category, disabled = false }: CategorySpecificFieldsProps) {
  const form = useFormContext();

  if (category === "bottles") {
    return (
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="categorySpecific.material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Stainless Steel", "Plastic", "Glass"].map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categorySpecific.capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity (ml)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Capacity in ml"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categorySpecific.insulation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Insulation</FormLabel>
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select insulation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Single Wall", "Double Wall", "None"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  if (category === "apparel") {
    return (
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="categorySpecific.material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select material" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Cotton", "Polyester", "Blend"].map((material) => (
                    <SelectItem key={material} value={material}>
                      {material}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categorySpecific.size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Sizes</FormLabel>
              <div className="grid grid-cols-4 gap-2">
                {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <FormItem
                    key={size}
                    className="flex flex-row items-center space-x-2 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(size)}
                        onCheckedChange={(checked) => {
                          const updatedSizes = checked
                            ? [...(field.value || []), size]
                            : (field.value || []).filter((s: string) => s !== size);
                          field.onChange(updatedSizes);
                        }}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {size}
                    </FormLabel>
                  </FormItem>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  if (category === "diaries") {
    return (
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="categorySpecific.coverType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Type</FormLabel>
              <Select
                disabled={disabled}
                value={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cover type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Hardcover", "Softcover", "Leather"].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="categorySpecific.pageCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Count</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Number of pages"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  return (
    <div className="p-4 border rounded-md bg-muted/20 text-center text-muted-foreground">
      No specific fields for this category
    </div>
  );
}
