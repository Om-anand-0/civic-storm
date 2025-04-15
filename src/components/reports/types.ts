
import { z } from "zod";

// Form schema
export const formSchema = z.object({
  type: z.enum(["civic", "hazard"]),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  reportType: z.string().min(1, { message: "Please select a report type" }),
  imageUrl: z.string().optional(),
});

export type ReportFormValues = z.infer<typeof formSchema>;
