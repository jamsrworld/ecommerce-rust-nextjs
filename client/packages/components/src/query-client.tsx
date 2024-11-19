"use client";

import { toast } from "@jamsr-ui/react";
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

const getToastMessageFromError = (error: DefaultError) => error.message;

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
  const router = useRouter();
  const pathname = usePathname();
  const onError = (error: Error) => {
    if ("status_code" in error && error.status_code === "401") {
      router.push(`/login?redirect=${pathname}`);
    } else {
      const message = getToastMessageFromError(error);
      if (message) toast.error(message);
    }
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
