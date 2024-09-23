import { Switch } from "@jamsr-ui/react";
import type { ComponentProps } from "react";
import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = UseControllerProps<T> &
  ComponentProps<typeof Switch>;

export const RHFSwitch = <T extends FieldValues>(props: Props<T>) => {
  const { name, ...restProps } = props;
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => {
        return (
          <Switch
            checked={value}
            onCheckedChange={onChange}
            // value={value}
            // onValueChange={onChange}
            // onBlur={onBlur}
            // isInvalid={!!error}
            // helperText={error?.message}
            // data-form-control={name}
            {...restProps}
          />
        );
      }}
    />
  );
};
