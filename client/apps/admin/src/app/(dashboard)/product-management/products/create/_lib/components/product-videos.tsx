"use client";

import { type CreateProductInput } from "@/client";
import {
  Card,
  CardContent,
  CardHeader,
  type FileUploadError,
  RHFFileUploadSingle,
  RHFInput,
  toast,
  Typography,
} from "@jamsr-ui/react";

type FormValues = CreateProductInput;

export const ProductVideo = () => {
  const getFileUrlAfterUpload = (response: { url: string; absUrl: string }) => {
    return response.absUrl;
  };
  const handleError = (error: FileUploadError) => {
    toast.error(error.message);
  };

  return (
    <Card>
      <CardHeader
        heading={
          <>
            Product Video
            <span className="text-success">*</span>
          </>
        }
      />
      <CardContent className="grid gap-4">
        <RHFInput<FormValues>
          name="video.url"
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
          <RHFFileUploadSingle<FormValues>
            name="video.thumbnail"
            inputName="file"
            getFileUrlAfterUpload={getFileUrlAfterUpload}
            defaultRHFValue={{}}
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
