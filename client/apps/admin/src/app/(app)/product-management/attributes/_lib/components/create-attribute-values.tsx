import { type CreateAttributeInput } from "@/client";
import { Button } from "@jamsr-ui/react";
import { RHFInput } from "@repo/components/rhf";
import { useFormRepeater } from "@repo/hooks/use-form-repeater";
import { AddIcon, DeleteIcon } from "@repo/icons";

type FormValues = CreateAttributeInput;

export const CreateAttributeValues = () => {
  const { fields, onAddField, onRemoveField } = useFormRepeater<FormValues>({
    name: "values",
    append: [{ value: "" }],
  });
  const onCreate = () => onAddField();
  return (
    <div>
      <Button
        isIconOnly
        onClick={onCreate}
        variant="outlined"
        aria-label="Add New Item"
      >
        <AddIcon />
      </Button>
      {fields.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex items-center justify-between gap-4"
          >
            <RHFInput<FormValues>
              name={`values.${idx}.value`}
              label="Value"
              fullWidth
              endContent={
                <Button
                  color="danger"
                  isIconOnly
                  onClick={() => onRemoveField(idx)}
                  rounded
                  size="sm"
                >
                  <DeleteIcon />
                </Button>
              }
            />
          </div>
        );
      })}
    </div>
  );
};
