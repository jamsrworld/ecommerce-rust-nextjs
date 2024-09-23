import { CDN_UPLOAD_URL } from "@repo/shared/config";
import type { FileMetadata, ImageMetadata } from "@repo/types/file";
import axios, {
  type AxiosProgressEvent,
  type AxiosRequestConfig,
} from "axios";

export const postUploadFile = async (
  formData: FormData,
  headers: AxiosRequestConfig,
) =>
  axios.post<ImageMetadata | FileMetadata>(
    CDN_UPLOAD_URL,
    formData,
    headers,
  );

type Args = {
  onProgress?: (value: number) => void;
  file: File;
};

export const uploadFile = async (args: Args) => {
  const { onProgress, file } = args;

  const formData = new FormData();
  formData.append("file", file);

  return postUploadFile(formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const progressVal =
        (progressEvent.loaded / (progressEvent.total ?? 0)) * 100;
      onProgress?.(Number(progressVal.toFixed(0)));
    },
  });
};
