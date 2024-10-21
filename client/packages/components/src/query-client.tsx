"use client";

import { toast } from "@jamsr-ui/react";
import {
  type DefaultError,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const getToastMessageFromError = (error: DefaultError) => {
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

const getToastMessageFromResponse = (response: unknown) => {
  if (
    typeof response === "object" &&
    response !== null &&
    "message" in response &&
    typeof response.message === "string"
  ) {
    const { message } = response;
    return message;
  }
  return null;
};

const useOnError = () => {
  const onError = (error: Error) => {
    const message = getToastMessageFromError(error);
    if (message) toast.error(message);
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
          const message = getToastMessageFromResponse(data);
          if (message) toast.success(message);
        },
      }),
    }),
  );
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
