"use client";

import { type CreateProductInput } from "@/client";
import {
  Card,
  CardContent,
  CardHeader,
  RHFFileUploadMulti,
  toast,
  Typography,
  type FileUploadError,
} from "@jamsr-ui/react";
import { getFileSrc } from "@repo/utils/url";

export const ProductImages = () => {
  const getFileUrlAfterUpload = (response: { url: string; absUrl: string }) => {
    return response.absUrl;
  };
  const handleError = (error: FileUploadError) => {
    toast.error(error.message);
  };

  const getPreviewUrlFromValue = (value: { url: string }) => {
    return getFileSrc(value.url);
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
          dropzoneOptions={{
            maxFiles: 8,
          }}
          getPreviewUrlFromValue={getPreviewUrlFromValue}
        />
        <Typography
          as="p"
          variant="paragraph2"
          className="text-foreground-secondary"
        >
          Add your product's image in JPG, PNG or JPEG Format within 2MB. (Max.
          8 img allowed)
        </Typography>
      </CardContent>
    </Card>
  );
};
