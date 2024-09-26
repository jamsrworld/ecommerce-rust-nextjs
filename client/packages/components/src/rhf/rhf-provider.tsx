import { cn } from "@repo/utils/class-name";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  children: React.ReactNode;
  methods: UseFormReturn<T>;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => void | Promise<void>;
  isPending: boolean;
} & {
  isDisabled?: boolean;
  className?: string;
};

export const RHFProvider = <T extends FieldValues>(
  props: Props<T>,
) => {
  const {
    children,
    onSubmit,
    methods,
    className,
    isDisabled,
    isPending,
    ...restProps
  } = props;
  const a= 2;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="relative"
        {...restProps}
      >
        <fieldset
          disabled={isPending || isDisabled}
          className={cn("flex flex-col gap-4", className)}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
