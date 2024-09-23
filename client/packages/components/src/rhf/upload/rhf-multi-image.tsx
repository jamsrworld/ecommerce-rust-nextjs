import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { MultiImageUploadProps } from "../../upload";
import { MultiImageUpload } from "../../upload";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Partial<MultiImageUploadProps>;

export const RHFMultiImage = <T extends FieldValues>(props: Props<T>) => {
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
          <MultiImageUpload
            {...restProps}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            isInvalid={!!error}
            data-invalid={!!error}
            helperText={error?.message}
          />
        );
      }}
    />
  );
};
