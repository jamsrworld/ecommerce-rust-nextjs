import { Button } from "@jamsr-ui/react";
import { EditIcon } from "@repo/icons";
import { cn } from "@repo/utils/class-name";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type FieldValues,
  type UseFormGetValues,
  type UseFormReset,
} from "react-hook-form";

export const useFormEdit = <T extends FieldValues>({
  getValues,
  reset,
}: {
  getValues: UseFormGetValues<T>;
  reset: UseFormReset<T>;
}) => {
  const [prevVal, setPrevVal] = useState<T | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = useCallback(() => {
    setIsEditing((isEditing) => !isEditing);
    setPrevVal(getValues());
  }, [getValues]);

  const stopEditing = () => setIsEditing(false);

  const cancelEditing = useCallback(() => {
    stopEditing();
    if (prevVal) reset(prevVal);
  }, [prevVal, reset]);

  const editButton = useMemo(
    () => (
      <Button
        size="sm"
        isIconOnly
        onClick={startEditing}
        className={cn({
          "border-primary border": isEditing,
        })}
      >
        <EditIcon className="size-4" />
      </Button>
    ),
    [isEditing, startEditing],
  );

  const handleEscapeKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEditing) {
        cancelEditing();
      }
    },
    [cancelEditing, isEditing],
  );

  // Effect to add event listener for "Escape" key press
  useEffect(() => {
    if (isEditing) {
      document.addEventListener("keydown", handleEscapeKeyPress);
    } else {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKeyPress);
    };
  }, [handleEscapeKeyPress, isEditing]);

  return {
    editButton,
    isEditing,
    stopEditing,
    cancelEditing,
  };
};
