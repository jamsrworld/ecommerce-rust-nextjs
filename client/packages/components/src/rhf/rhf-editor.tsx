"use client";

import type { EditorProps } from "@jamsr-ui/react";
import { Editor, Typography } from "@jamsr-ui/react";
import { uploadFile } from "@repo/hooks/use-upload";
import type { ImageMetadata } from "@repo/types/file";
import { getFileSrc } from "@repo/utils/url";
import { useState } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Partial<EditorProps> & {
    label?: string;
  };

type ImageResponse = {
  src: string;
  width: number;
  height: number;
  alt: string;
  placeholder?: string | undefined;
};

export const RHFEditor = <T extends FieldValues>(props: Props<T>) => {
  const { name, label, ...restProps } = props;
  const { control } = useFormContext<T>();

  const [progress, setProgress] = useState(0);
  const onFileSelect = async (file: File): Promise<ImageResponse> => {
    try {
      const { data } = await uploadFile({
        file,
        onProgress: (progress) => {
          if (progress < 100) setProgress(progress);
        },
      });
      const image = data as ImageMetadata;
      return {
        ...image,
        alt: image.name,
        src: getFileSrc(data.url),
      };
    } finally {
      setProgress(0);
    }
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <div className="flex flex-col gap-1">
            {label && <Typography as="p">{label}</Typography>}
            <Editor
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              isInvalid={!!error}
              data-invalid={!!error}
              helperText={error?.message}
              classNames={{
                content: "max-h-[400px] overflow-y-auto",
              }}
              extensionsProps={{
                imageUpload: {
                  progress,
                  onFileSelect,
                  className: "aspect-video w-80 max-w-full",
                },
              }}
              {...restProps}
            />
          </div>
        );
      }}
    />
  );
};
