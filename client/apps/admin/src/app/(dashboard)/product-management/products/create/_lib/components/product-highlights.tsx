import { type CreateProductInput } from "@/client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  RHFInput,
} from "@jamsr-ui/react";
import { useFormRepeater } from "@repo/hooks/use-form-repeater";
import { AddIcon, MinusIcon } from "@repo/icons";
import { randomId } from "@repo/utils";

type FormValues = CreateProductInput;

export const ProductHighlights = () => {
  const { fields, onAppend, onRemoveField } = useFormRepeater<FormValues>({
    name: "highlights",
    append: [{ highlight: "", id: randomId() }],
  });

  const handleAdd = () => {
    onAppend({ highlight: "", id: randomId() });
  };
  const hasMaximum = fields.length >= 15;

  return (
    <Card>
      <CardHeader
        heading={
          <>
            Product Highlights
            <span className="text-success">*</span>
          </>
        }
        className="flex justify-end"
        endContent={
          hasMaximum ? null : (
            <Button
              onClick={handleAdd}
              isIconOnly
              aria-label="Add Highlight"
            >
              <AddIcon />
            </Button>
          )
        }
      />
      <CardContent className="flex max-h-[500px] flex-col gap-2 overflow-y-auto">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-1"
          >
            <RHFInput<FormValues>
              name={`highlights.${index}.highlight`}
              type="text"
              placeholder="Highlight"
              classNames={{
                endContent: "p-0",
              }}
              endContent={
                <Button
                  isIconOnly
                  aria-label="Delete"
                  onClick={() => onRemoveField(index)}
                  className="rounded-none"
                >
                  <MinusIcon />
                </Button>
              }
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
