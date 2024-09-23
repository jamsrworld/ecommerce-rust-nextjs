import {
  Controller,
  useFormContext,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { SingleImageUploadProps } from "../../upload";
import { SingleImageUpload } from "../../upload";

type Props<T extends FieldValues> = UseControllerProps<T> &
  Partial<SingleImageUploadProps>;

export const RHFImage = <T extends FieldValues>(props: Props<T>) => {
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
          <SingleImageUpload
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
