"use client";

import { toast } from "@jamsr-ui/react";
import { isObject, isString } from "@repo/utils/assertion";
import {
  type DefaultError,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const getToastMessage = (error: DefaultError) => {
  try {
    const { message } = error;
    const obj: unknown = JSON.parse(message);
    if (
      typeof obj === "object" &&
      obj !== null &&
      "message" in obj &&
      typeof obj.message === "string"
    ) {
      const { message } = obj;
      return message;
    }
    return null;
  } catch {
    return null;
  }
};

const toastMessage = (error: DefaultError, type: "error" | "success") => {
  const message = getToastMessage(error);
  if (message) {
    toast.error(message);
  }
};

const useOnError = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onError = (error: Error) => {
    toastMessage(error, "error");
  };

  return { onError };
};

export const QueryProvider = (props: Props) => {
  const { onError } = useOnError();
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          retry: false,
        },
      },
      mutationCache: new MutationCache({
        onError,
        onSuccess(data) {
          // toastMessage(data, "success");
        },
      }),
    }),
  );
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
