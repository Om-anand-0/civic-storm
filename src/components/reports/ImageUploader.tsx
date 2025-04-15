
import { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface ImageUploaderProps {
  initialImage?: string | null;
  onImageChange: (imageUrl: string | null) => void;
}

export function ImageUploader({ initialImage, onImageChange }: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Normally we'd upload to a server here, but for this demo we'll just create a preview
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
                onImageChange(null);
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
  );
}
