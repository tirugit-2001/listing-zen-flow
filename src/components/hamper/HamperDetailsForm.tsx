
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

// Define schema for form validation
const hamperDetailsSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  notes: z.string().optional(),
});

// Define categories
const categories = [
  { id: "corporate", name: "Corporate" },
  { id: "festival", name: "Festival" },
  { id: "seasonal", name: "Seasonal" },
  { id: "holiday", name: "Holiday" },
  { id: "anniversary", name: "Anniversary" },
  { id: "wellness", name: "Wellness" },
  { id: "welcome", name: "Welcome Kit" },
  { id: "custom", name: "Custom" },
];

interface HamperDetailsFormProps {
  hamperData: any;
  updateHamperData: (field: string, value: any) => void;
  onNext: () => void;
}

export default function HamperDetailsForm({ hamperData, updateHamperData, onNext }: HamperDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof hamperDetailsSchema>>({
    resolver: zodResolver(hamperDetailsSchema),
    defaultValues: {
      title: hamperData.title || "",
      category: hamperData.category || "",
      description: hamperData.description || "",
      notes: hamperData.notes || "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof hamperDetailsSchema>) {
    setIsLoading(true);
    
    // Update hamper data with form values
    Object.keys(values).forEach((key) => {
      updateHamperData(key, values[key as keyof typeof values]);
    });
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      onNext(); // Move to next step
    }, 500);
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Hamper Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hamper Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a title for your hamper" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your hamper in detail" 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internal Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any notes for your team (not visible to customers)"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Next: Add Products"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
