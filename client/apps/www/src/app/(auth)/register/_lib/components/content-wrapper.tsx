"use client";

import { type AuthRegisterInput } from "@/client";
import { useState } from "react";
import { RegisterContent } from "./register/register-content";
import { RegisterVerifyContent } from "./verify/register-verify-content";

export const RegisterContentWrapper = () => {
  const [step1FormValues, setStep1FormValues] =
    useState<null | AuthRegisterInput>(null);

  const handleOnSuccessStep1 = (data: AuthRegisterInput) => {
    setStep1FormValues(data);
  };

  const handleOnSuccessStep2 = () => {
    setStep1FormValues(null);
  };

  return !step1FormValues ? (
    <RegisterContent onSuccess={handleOnSuccessStep1} />
  ) : (
    <RegisterVerifyContent
      prevFormData={step1FormValues}
      onSuccess={handleOnSuccessStep2}
    />
  );
};
