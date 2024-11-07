import { type CreateProductInput } from "@/client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  RHFInput,
} from "@jamsr-ui/react";
import { useFormRepeater } from "@repo/hooks/use-form-repeater";
import { AddIcon, DeleteIcon } from "@repo/icons";
import { randomId } from "@repo/utils";

type FormValues = CreateProductInput;

export const ProductHighlights = () => {
  const { fields, onAppend, onRemoveField } = useFormRepeater<FormValues>({
    name: "highlights",
    append: [{ highlight: "", description: "", id: randomId() }],
  });

  const handleAdd = () => {
    onAppend({ description: "", highlight: "", id: randomId() });
  };

  return (
    <Card>
      <CardHeader
        heading="Product Highlights"
        className="mb-4 flex justify-end"
        endContent={
          <Button
            onClick={handleAdd}
            isIconOnly
            aria-label="Add Highlight"
          >
            <AddIcon />
          </Button>
        }
      />
      <CardContent className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-1"
          >
            <RHFInput<FormValues>
              name={`highlights.${index}.highlight`}
              type="text"
              placeholder="Highlight"
            />
            <RHFInput<FormValues>
              name={`highlights.${index}.description`}
              type="text"
              placeholder="Description"
            />
            <Button
              isIconOnly
              aria-label="Delete"
              onClick={() => onRemoveField(index)}
              color="danger"
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
