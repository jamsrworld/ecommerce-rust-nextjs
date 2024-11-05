"use client";

import {
  Card,
  CardContent,
  CardHeader,
  type FileUploadError,
  RHFInput,
  SingleFileUpload,
  toast,
  Typography,
} from "@jamsr-ui/react";
import { type ProductCreateSchema } from "../types";

export const ProductVideo = () => {
  const getFileUrlAfterUpload = (response: { url: string; absUrl: string }) => {
    return response.absUrl;
  };
  const onUploadSuccess = () => {};
  const handleError = (error: FileUploadError) => {
    toast.error(error.message);
  };

  return (
    <Card>
      <CardHeader heading="Product Video" />
      <CardContent className="grid gap-4">
        <RHFInput<ProductCreateSchema>
          name="video"
          label="Youtube Video Url"
        />
        <div>
          <Typography
            as="p"
            variant="paragraph2"
            className="font-normal text-foreground-secondary"
          >
            Video Thumbnail
          </Typography>
          <SingleFileUpload
            inputName="file"
            getFileUrlAfterUpload={getFileUrlAfterUpload}
            onUploadSuccess={onUploadSuccess}
            uploadApiUrl={`${process.env.NEXT_PUBLIC_CDN_API}/upload`}
            onError={handleError}
            className="w-full md:w-[300px]"
            info="Video thumbnail within 2MB"
            description="Choose a image or drag and drop it here"
            
          />
        </div>
      </CardContent>
    </Card>
  );
};
