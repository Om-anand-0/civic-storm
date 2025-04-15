
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ReportFormValues } from "./types";

interface ReportTypeSelectorProps {
  form: UseFormReturn<ReportFormValues>;
}

export function ReportTypeSelector({ form }: ReportTypeSelectorProps) {
  return (
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
  );
}
