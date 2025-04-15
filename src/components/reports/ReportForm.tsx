
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useReports } from "@/context/ReportContext";
import { useNavigate } from "react-router-dom";
import { IssueType, HazardType } from "@/types";
import { ReportTypeSelector } from "./ReportTypeSelector";
import { ReportFormFields } from "./ReportFormFields";
import { ImageUploader } from "./ImageUploader";
import { SubmitButton } from "./SubmitButton";
import { formSchema, ReportFormValues } from "./types";

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

  // Handle image change
  const handleImageChange = (imageUrl: string | null) => {
    setImagePreview(imageUrl);
    if (imageUrl) {
      form.setValue("imageUrl", "image-url-placeholder"); // Placeholder URL
    } else {
      form.setValue("imageUrl", "");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ReportTypeSelector form={form} />
          <ReportFormFields form={form} />
          <ImageUploader 
            initialImage={imagePreview} 
            onImageChange={handleImageChange} 
          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </div>
  );
}
