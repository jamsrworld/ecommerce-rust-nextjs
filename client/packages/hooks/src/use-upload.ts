export const postUploadFile = async (
  formData: FormData,
  headers: unknown
) => {};

type Args = {
  onProgress?: (value: number) => void;
  file: File;
};

export const uploadFile = async (args: Args) => {};
