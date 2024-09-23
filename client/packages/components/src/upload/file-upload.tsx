"use client";

import type { SingleFileUploadProps as SingleFileUploadPropsUI } from "@jamsr-ui/react";
import {
  SingleFileUpload as SingleFileUploadUI,
  Typography,
  toast,
} from "@jamsr-ui/react";
import { uploadFile } from "@repo/hooks";
import { UploadIcon } from "@repo/icons";
import type { FileMetadata } from "@repo/types/file";
import { cn } from "@repo/utils/class-name";
import { getFileSrc } from "@repo/utils/url";
import { useState } from "react";

export type SingleFileUploadProps = Pick<
  SingleFileUploadPropsUI,
  "classNames" | "className" | "isInvalid" | "helperText" | "onBlur"
> & {
  label?: string;
  value: FileMetadata;
  onChange: (value: FileMetadata) => void;
};

export const SingleFileUpload = (props: SingleFileUploadProps) => {
  const { label, onChange, value, className, ...restProps } = props;
  const [file, setFile] = useState(getFileSrc(value.url));
  const [progress, setProgress] = useState(0);

  const onFileSelect = async (file: File) => {
    try {
      const { data } = await uploadFile({
        file,
        onProgress: (progress) => {
          if (progress < 100) setProgress(progress);
        },
      });
      onChange?.(data as FileMetadata);
      setFile(getFileSrc(data.url));
    } catch (error) {
      //   toast.error(error);
    } finally {
      setProgress(0);
    }
  };

  const handleOnError = ({ message }: { message: string }) => {
    toast.error(message);
  };

  const handleDelete = () => {
    onChange?.({} as unknown as FileMetadata);
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
        value={file}
        onValueChange={setFile}
        onFileSelect={onFileSelect}
        className={cn("aspect-video w-80 max-w-full", className)}
        onError={handleOnError}
        showDeleteBtn
        progress={progress}
        fileName={value.name}
        fileSize={value.size}
        onDelete={handleDelete}
        info="Zip format, up to 500MB"
        dropzoneOptions={{
          accept: {
            "application/zip": [],
          },
          maxSize: 500 * 1024 * 1024,
        }}
        uploadIcon={<UploadIcon className="size-6" />}
      />
    </div>
  );
};
