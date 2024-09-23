"use client";

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardProps,
} from "@jamsr-ui/react";
import { useFormEdit } from "@repo/hooks/use-form-edit";
import { AnimatePresence, m } from "framer-motion";
import { type FieldValues,type UseFormReturn } from "react-hook-form";
import { onRHFInvalid } from "./rhf-error";
import { RHFProvider } from "./rhf-provider";

type Props<T extends FieldValues> = Omit<CardProps, "children"> & {
  heading?: React.ReactNode;
  isMutating: boolean;
  methods: UseFormReturn<T>;
  mutateAsync: (data: T) => Promise<unknown>;
  children: ((_: { isEditing: boolean }) => React.ReactNode) | React.ReactNode;
  classNames?: {
    content?: string;
    footer?: string;
    form?: string;
  };
  action?: React.ReactNode;
  disableEditing?: boolean;
};

export const FormCardWithEdit = <T extends FieldValues>(props: Props<T>) => {
  const {
    isMutating,
    methods,
    children,
    mutateAsync,
    heading,
    classNames,
    action,
    disableEditing = false,
    ...restProps
  } = props;
  const { handleSubmit, reset, getValues } = methods;
  const { cancelEditing, editButton, isEditing, stopEditing } = useFormEdit({
    getValues,
    reset,
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      stopEditing();
    } catch (error) {
      console.error("error:->", error);
    }
  }, onRHFInvalid);

  const actionContent = (
    <div className="flex gap-2">
      {action}
      {disableEditing ? null : editButton}
    </div>
  );

  return (
    <Card {...restProps}>
      <CardHeader
        heading={heading}
        endContent={actionContent}
      />
      <CardContent className={classNames?.content}>
        <RHFProvider
          methods={methods}
          onSubmit={onSubmit}
          isPending={isMutating}
          isDisabled={!isEditing}
          className={classNames?.form}
        >
          {typeof children === "function" ? children({ isEditing }) : children}
          <button
            type="submit"
            aria-label="submit"
            className="sr-only"
          />
        </RHFProvider>
      </CardContent>
      <AnimatePresence>
        {isEditing && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <CardFooter className={classNames?.footer}>
              <Button
                variant="outline"
                onClick={cancelEditing}
              >
                Cancel
              </Button>
              <Button
                isLoading={isMutating}
                onClick={onSubmit}
                color="primary"
              >
                Submit
              </Button>
            </CardFooter>
          </m.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
