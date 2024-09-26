"use client";

import { type AuthRegister } from "@/api";
import { useState } from "react";
import { RegisterForm } from "./register-form";
import { RegisterVerifyForm } from "./register-verify-form";

export const RegisterFormWrapper = () => {
  const [step1FormValues, setStep1FormValues] = useState<null | AuthRegister>(
    null,
  );

  const handleOnSuccessStep1 = (data: AuthRegister) => {
    setStep1FormValues(data);
  };

  const handleOnSuccessStep2 = () => {
    setStep1FormValues(null);
  };

  return !step1FormValues ? (
    <RegisterForm onSuccess={handleOnSuccessStep1} />
  ) : (
    <RegisterVerifyForm
      prevFormData={step1FormValues}
      onSuccess={handleOnSuccessStep2}
    />
  );
};
