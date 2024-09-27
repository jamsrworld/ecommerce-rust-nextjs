"use client";

import { type AuthForgotPassword } from "@/api";
import React, { useState } from "react";
import { ResetPasswordForm } from "./reset-password-form";
import { ForgotPasswordForm } from "./forgot-password-form";

export const ForgotPasswordFormWrapper = () => {
  const [step1FormData, setStep1FormData] = useState<AuthForgotPassword | null>(
    null,
  );

  const handleOnSuccessStep1 = (data:AuthForgotPassword) => {
    setStep1FormData(data);
  };
  const handleOnSuccessStep2 = () => setStep1FormData(null);

  return step1FormData ? (
    <ResetPasswordForm
      formData={step1FormData}
      onSuccess={handleOnSuccessStep2}
    />
  ) : (
    <ForgotPasswordForm onSuccess={handleOnSuccessStep1} />
  );
};
