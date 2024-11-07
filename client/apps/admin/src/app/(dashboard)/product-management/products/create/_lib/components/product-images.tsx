"use client";

import { type CreateProductInput } from "@/client";
import {
  Card,
  CardContent,
  CardHeader,
  RHFFileUploadMulti,
  toast,
  type FileUploadError,
} from "@jamsr-ui/react";

export const ProductImages = () => {
  const getFileUrlAfterUpload = (response: { url: string; absUrl: string }) => {
    return response.absUrl;
  };
  const handleError = (error: FileUploadError) => {
    toast.error(error.message);
  };
  return (
    <Card>
      <CardHeader heading="Product Images" />
      <CardContent>
        <RHFFileUploadMulti<CreateProductInput>
          name="images"
          inputName="file"
          getFileUrlAfterUpload={getFileUrlAfterUpload}
          uploadApiUrl={`${process.env.NEXT_PUBLIC_CDN_API}/upload`}
          onError={handleError}
          helperText="Add your product's image in JPG, PNG or JPEG Format within 2MB. (Max. 6 img allowed)"
        />
      </CardContent>
    </Card>
  );
};
