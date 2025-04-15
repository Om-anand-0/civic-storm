
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { issueTypes, hazardTypes, locations } from "@/data/mockData";
import { useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import { useReports } from "@/context/ReportContext";
import { useNavigate } from "react-router-dom";
import { IssueType, HazardType } from "@/types";

// Form schema
const formSchema = z.object({
  type: z.enum(["civic", "hazard"]),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  reportType: z.string().min(1, { message: "Please select a report type" }),
  imageUrl: z.string().optional(),
});

type ReportFormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  defaultType?: "civic" | "hazard";
}

export function ReportForm({ defaultType = "civic" }: ReportFormProps) {
  const { addReport } = useReports();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Initialize form
  const form = useForm<ReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: defaultType,
      title: "",
      description: "",
      location: "",
      reportType: "",
      imageUrl: "",
    },
  });

  const reportType = form.watch("type");
  
  // Handle form submission
  function onSubmit(values: ReportFormValues) {
    setIsSubmitting(true);
    
    try {
      // Convert the string reportType to the appropriate type based on the report type
      const typedReportType = values.type === "civic" 
        ? values.reportType as IssueType 
        : values.reportType as HazardType;
        
      // Pass all required fields and ensure proper typing
      addReport({
        type: values.type,
        title: values.title,
        description: values.description,
        location: values.location,
        reportType: typedReportType,
        imageUrl: imagePreview || undefined,
      });
      
      // Navigate to dashboard after successful submission
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Report submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle image upload (simulated)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Normally we'd upload to a server here, but for this demo we'll just create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        form.setValue("imageUrl", "image-url-placeholder"); // Placeholder URL
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Report Type</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant={field.value === "civic" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => field.onChange("civic")}
                  >
                    Civic Issue
                  </Button>
                  <Button
                    type="button"
                    variant={field.value === "hazard" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => field.onChange("hazard")}
                  >
                    Road Hazard
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Brief title of the issue" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Detailed description of the issue" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
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
              name="reportType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reportType === "civic" 
                        ? issueTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))
                        : hazardTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Image upload */}
          <div className="space-y-2">
            <FormLabel>Image (Optional)</FormLabel>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mx-auto h-40 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null);
                      form.setValue("imageUrl", "");
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <label 
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center h-32"
                >
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload an image</span>
                </label>
              )}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting report...
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
