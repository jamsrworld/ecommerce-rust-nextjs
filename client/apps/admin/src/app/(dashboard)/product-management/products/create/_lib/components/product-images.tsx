"use client";

import {
  Card,
  CardContent,
  CardHeader,
  MultiFileUpload,
  toast,
  type FileUploadError,
} from "@jamsr-ui/react";

export const ProductImages = () => {
  const getFileUrlAfterUpload = (response: { url: string; absUrl: string }) => {
    return response.absUrl;
  };
  const onUploadSuccess = () => {};
  const handleError = (error: FileUploadError) => {
    toast.error(error.message);
  };
  return (
    <Card>
      <CardHeader heading="Product Images" />
      <CardContent>
        <MultiFileUpload
          inputName="file"
          getFileUrlAfterUpload={getFileUrlAfterUpload}
          onUploadSuccess={onUploadSuccess}
          uploadApiUrl={`${process.env.NEXT_PUBLIC_CDN_API}/upload`}
          onError={handleError}
          helperText="Add your product's image in JPG, PNG or JPEG Format within 2MB. (Max. 6 img allowed)"
        />
      </CardContent>
    </Card>
  );
};
