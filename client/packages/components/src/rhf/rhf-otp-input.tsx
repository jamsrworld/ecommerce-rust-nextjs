import { type InputProps } from "@jamsr-ui/react";
import { type FieldValues, type UseControllerProps } from "react-hook-form";
import { RHFInput } from "./rhf-input";

type Props<T extends FieldValues> = UseControllerProps<T> & InputProps;

export const RHFOtpInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, label, ...restProps } = props;
  return (
    <RHFInput<T>
      label={label}
      name={name}
      autoComplete="new-password webauthn"
      mask="number"
      precision={0}
      maxLength={6}
      {...restProps}
    />
  );
};
