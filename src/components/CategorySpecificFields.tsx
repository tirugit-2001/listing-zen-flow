
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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
                value={field.value as string}
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
                  value={field.value as number}
                  onChange={(e) => field.onChange(Number(e.target.value))}
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
                value={field.value as string}
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
                value={field.value as string}
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
        
        {/* Size checkboxes would be implemented here */}
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
                value={field.value as string}
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
                  value={field.value as number}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  return <div>No specific fields for this category</div>;
}
