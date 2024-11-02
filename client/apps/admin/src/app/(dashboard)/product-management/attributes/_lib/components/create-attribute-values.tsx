import { type AttributeValue, type CreateAttributeInputDto } from "@/client";
import { Button } from "@jamsr-ui/react";
import { RHFInput } from "@repo/components/rhf";
import { useFormRepeater } from "@repo/hooks/use-form-repeater";
import { AddIcon, DeleteIcon } from "@repo/icons";
import { randomId } from "@repo/utils";
import { AnimatePresence, m } from "framer-motion";

type AttributeValueWithId = AttributeValue & { id: string };

type FormValues = Omit<CreateAttributeInputDto, "values"> & {
  values: AttributeValueWithId[];
};

export const CreateAttributeValues = () => {
  const { fields, onPrepend, onRemoveField } = useFormRepeater<FormValues>({
    name: "values",
    append: [{ value: "", id: randomId() }],
  });
  const onCreate = () =>
    onPrepend({
      value: "",
      id: randomId(),
    });
  return (
    <div className="flex flex-col gap-4">
      <Button
        isIconOnly
        onClick={onCreate}
        aria-label="Add New Item"
        className="ml-auto"
        variant="outlined"
      >
        <AddIcon />
      </Button>
      <ul className="max-h-[500px] overflow-y-auto overflow-x-hidden px-4">
        <AnimatePresence initial={false}>
          {fields.map((item, idx) => {
            return (
              <m.li
                key={item.id}
                className="flex items-center justify-between gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  default: { duration: 0.15 },
                  layout: {
                    type: "spring",
                    bounce: 0.4,
                    duration: 1,
                  },
                }}
                layout
              >
                <RHFInput<FormValues>
                  name={`values.${idx}.value`}
                  placeholder={`Value #${fields.length - idx}`}
                  fullWidth
                  classNames={{
                    input: "placeholder:text-sm",
                    endContent: "p-0",
                  }}
                  endContent={
                    <Button
                      color="danger"
                      isIconOnly
                      onClick={() => onRemoveField(idx)}
                      className="rounded-none"
                    >
                      <DeleteIcon />
                    </Button>
                  }
                />
              </m.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
};
