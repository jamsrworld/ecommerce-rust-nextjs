"use client";

import { type AuthForgotPassword } from "@/api";
import { useState } from "react";
import { ForgotPasswordForm } from "./forgot-password-form";
import { ForgotPasswordSection } from "./forgot-password-section";
import { ResetPasswordForm } from "./reset-password-form";
import { ResetPasswordSection } from "./reset-password-section";

export const ForgotPasswordFormContent = () => {
  const [step1FormData, setStep1FormData] = useState<AuthForgotPassword | null>(
    null,
  );

  const handleOnSuccessStep1 = (data: AuthForgotPassword) => {
    setStep1FormData(data);
  };
  const handleOnSuccessStep2 = () => setStep1FormData(null);

  return step1FormData ? (
    <ResetPasswordSection>
      <ResetPasswordForm
        formData={step1FormData}
        onSuccess={handleOnSuccessStep2}
      />
    </ResetPasswordSection>
  ) : (
    <ForgotPasswordSection>
      <ForgotPasswordForm onSuccess={handleOnSuccessStep1} />
    </ForgotPasswordSection>
  );
};
