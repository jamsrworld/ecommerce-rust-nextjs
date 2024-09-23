import {
  useFieldArray,
  useFormContext,
  type ArrayPath,
  type FieldArray,
  type FieldValues,
} from "react-hook-form";

type Data<T extends FieldValues> = FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[];

export const useFormRepeater = <T extends FieldValues>({
  name,
  append: appendData,
}: {
  name: ArrayPath<T>;
  append: Data<T>;
}) => {
  const { control } = useFormContext<T>();
  const { fields, append, remove, replace, insert } = useFieldArray<T>({
    control,
    name,
  });
  const onAddField = (data?: Data<T>) => append(data ?? appendData);
  const onRemoveField = (index: number) => remove(index);

  return {
    append,
    insert,
    fields,
    replace,
    onAddField,
    onRemoveField,
  };
};
