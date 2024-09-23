import { toast } from "@jamsr-ui/react";

export const copyToClipboard = async (
  text: string,
  options: {
    onSuccess?: () => void;
    success?: string;
    error?: string;
  } = {},
) => {
  const {
    onSuccess,
    error = "Error copying to clipboard",
    success = "Copied to clipboard",
  } = options;
  try {
    await window.navigator.clipboard.writeText(text);
    onSuccess?.();
    return toast.success(success);
  } catch (err) {
    console.error(err);
    if (window.isSecureContext) {
      return toast.error(error);
    }
    return toast.error("Unable to copy not a secure connection");
  }
};
