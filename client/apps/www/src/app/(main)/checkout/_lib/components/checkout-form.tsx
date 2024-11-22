"use client";

import { type CheckoutUserData, type ProceedCheckoutInput } from "@/client";
import { proceedCheckoutMutation } from "@/client/@tanstack/react-query.gen";
import { APP_ROUTES } from "@/config/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFProvider } from "@jamsr-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "../schema";
import { CheckoutLeftSection } from "./checkout-left-section";
import { CheckoutRightSection } from "./checkout-right-section";

type Props = {
  data: CheckoutUserData;
  userAccount: React.ReactNode;
};

export const CheckoutForm = (props: Props) => {
  const { data, userAccount } = props;
  const router = useRouter();
  const defaultValues: ProceedCheckoutInput = {
    paymentMethod: "" as ProceedCheckoutInput["paymentMethod"],
    addressId: "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(checkoutSchema),
  });
  const { handleSubmit } = methods;

  const mutation = useMutation({
    ...proceedCheckoutMutation(),
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(
      {
        body: data,
      },
      {
        onSuccess() {
          router.push(APP_ROUTES.orders.root);
        },
      },
    );
  });
  return (
    <RHFProvider
      methods={methods}
      onSubmit={onSubmit}
      isPending={mutation.isPaused}
    >
      <div className="grid grow grid-cols-1 divide-x md:grid-cols-2">
        <CheckoutLeftSection
          addresses={data.addresses}
          isMutating={mutation.isPending}
          userAccount={userAccount}
        />
        <CheckoutRightSection data={data} />
      </div>
    </RHFProvider>
  );
};
