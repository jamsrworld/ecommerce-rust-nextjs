"use client";

import type {
  MultiFileUploadState,
  MultiFileUploadProps as MultiImageUploadPropsUI,
} from "@jamsr-ui/react";
import { MultiFileUpload, Typography, toast } from "@jamsr-ui/react";
import { uploadFile } from "@repo/hooks";
import type { ImageMetadata } from "@repo/types/file";
import { getFileSrc } from "@repo/utils/url";
import { useEffect, useState } from "react";

type Props = {
  label?: string;
  value: ImageMetadata[];
  onChange: (value: ImageMetadata[]) => void;
};
export type MultiImageUploadProps = Props &
  Partial<Omit<MultiImageUploadPropsUI, keyof Props>>;

type ImageResponseWithId = ImageMetadata & {
  id: string;
};

export const MultiImageUpload = (props: MultiImageUploadProps) => {
  const { label, onChange, value, ...restProps } = props;
  const valuesWithId = value.map((item) => ({
    ...item,
    id: Math.random().toString(36).slice(2),
  }));

  const [files, setValue] = useState<MultiFileUploadState[]>(
    valuesWithId.map((item) => ({
      id: item.id,
      preview: getFileSrc(item.url),
      progress: "COMPLETE",
    })),
  );
  const [images, setImages] = useState<ImageResponseWithId[]>(valuesWithId);

  useEffect(() => {
    onChange(images);
  }, [images, onChange]);

  const handleDelete = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  const onFilesSelect = async (files: MultiFileUploadState[]) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of files) {
      const { file, id } = item;
      if (!file) continue;

      // eslint-disable-next-line no-await-in-loop
      const { data } = await uploadFile({
        file,
        onProgress: (progress) => {
          console.log("progress:->", progress);
        },
      });
      setImages((prev) => [...prev, { ...(data as ImageMetadata), id }]);
    }
  };

  const handleOnError = (error: string) => {
    toast.error(error);
  };

  return (
    <div>
      {label && (
        <Typography as="p" className="mb-1">
          {label}
        </Typography>
      )}
      <MultiFileUpload
        value={files}
        onValueChange={setValue}
        onFilesSelect={onFilesSelect}
        onError={handleOnError}
        dropzoneOptions={{
          maxFiles: 12,
          accept: {
            "image/*": [],
          },
        }}
        onDelete={handleDelete}
        classNames={{
          picker: "aspect-square h-20",
        }}
        {...restProps}
      />
    </div>
  );
};
