"use client";

import type { SingleFileUploadProps as SingleFileUploadPropsUI } from "@jamsr-ui/react";
import {
  SingleFileUpload as SingleFileUploadUI,
  Typography,
  toast,
} from "@jamsr-ui/react";
import { uploadFile } from "@repo/hooks/use-upload";
import type { ImageMetadata } from "@repo/types/file";
import { cn } from "@repo/utils/class-name";
import { getFileSrc } from "@repo/utils/url";
import { useState } from "react";

export type SingleImageUploadProps = Pick<
  SingleFileUploadPropsUI,
  | "classNames"
  | "className"
  | "isInvalid"
  | "helperText"
  | "onBlur"
  | "isAvatar"
> & {
  label?: string;
  value: ImageMetadata;
  onChange: (value: ImageMetadata) => void;
  formOnlyUrl?: boolean;
};

export const SingleImageUpload = (props: SingleImageUploadProps) => {
  const {
    label,
    onChange,
    value,
    className,
    formOnlyUrl,
    isAvatar,
    ...restProps
  } = props;
  const [file, setFile] = useState(
    getFileSrc(typeof value === "string" || value === null ? value : value.url),
  );
  const [progress, setProgress] = useState(0);

  const onFileSelect = async (file: File) => {
    try {
      const { data } = await uploadFile({
        file,
        onProgress: (progress) => {
          if (progress < 100) setProgress(progress);
        },
      });
      onChange?.((formOnlyUrl ? data.url : data) as unknown as ImageMetadata);
      setFile(getFileSrc(data.url));
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setProgress(0);
    }
  };

  const handleOnError = ({ message }: { message: string }) => {
    toast.error(message);
  };

  const handleDelete = () => {
    onChange?.({} as unknown as ImageMetadata);
  };

  return (
    <div className="w-full">
      {label && (
        <Typography as="p" className="mb-1">
          {label}
        </Typography>
      )}
      <SingleFileUploadUI
        {...restProps}
        isAvatar={isAvatar}
        value={file}
        onValueChange={setFile}
        onFileSelect={onFileSelect}
        className={cn(
          "max-w-full",
          {
            "": isAvatar,
            "aspect-video w-80 ": !isAvatar,
          },
          className,
        )}
        onError={handleOnError}
        showDeleteBtn
        progress={progress}
        onDelete={handleDelete}
        dropzoneOptions={{
          accept: {
            "image/*": [],
          },
        }}
      />
    </div>
  );
};
