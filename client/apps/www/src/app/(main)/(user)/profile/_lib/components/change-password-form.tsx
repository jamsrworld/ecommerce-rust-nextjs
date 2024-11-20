"use client";

import { type ChangePasswordInput } from "@/client";
import { changePasswordMutation } from "@/client/@tanstack/react-query.gen";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@jamsr-ui/hooks";
import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  RHFInput,
  RHFProvider,
  UIStylesProvider,
} from "@jamsr-ui/react";
import { EditIcon } from "@repo/icons";
import { string, withSchema } from "@repo/utils/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormValues = ChangePasswordInput;

const schema = withSchema<FormValues>()({
  currentPassword: string().min(1, "Current Password is required"),
  confirmPassword: string().min(1, "Confirm Password is required"),
  newPassword: string().min(1, "New Password is required"),
});

type Props = {
  onSuccess: () => void;
};

const ChangePasswordForm = (props: Props) => {
  const { onSuccess } = props;
  const defaultValues: FormValues = {
    confirmPassword: "",
    currentPassword: "",
    newPassword: "",
  };
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...changePasswordMutation({}),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      { body: data },
      {
        onSuccess,
      },
    );
  });

  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
    >
      <UIStylesProvider
        input={{
          classNames: {
            label: "text-foreground",
          },
          // variant: "outlined",
        }}
      >
        <RHFInput<FormValues>
          name="currentPassword"
          label="Current Password"
        />
        <RHFInput<FormValues>
          name="newPassword"
          label="New Password"
        />
        <RHFInput<FormValues>
          name="confirmPassword"
          label="Confirm Password"
        />
      </UIStylesProvider>
      <Button
        color="primary"
        type="submit"
        isLoading={mutation.isPending}
      >
        Update Password
      </Button>
    </RHFProvider>
  );
};

export const ChangePasswordDialog = () => {
  const { isOpen, onClose, onOpen, setIsOpen } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        variant="light"
        isIconOnly
      >
        <EditIcon
          width={20}
          height={20}
        />
      </Button>
      <Dialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent>
          <DialogHeader>Change Password</DialogHeader>
          <DialogBody>
            <ChangePasswordForm onSuccess={onClose} />
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  );
};
