import { includes } from "@repo/utils/array";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props<T extends string[]> = {
  defaultValue: T[number];
  values: T;
};

export const useTabState = <T extends string[]>(props: Props<T>) => {
  const { defaultValue, values } = props;
  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();

  const getActiveTab = useCallback(() => {
    return includes(values, activeTab) ? activeTab : defaultValue;
  }, [activeTab, defaultValue, values]);

  const [value, setValue] = useState(getActiveTab());
  useEffect(() => {
    setValue(getActiveTab());
  }, [activeTab, getActiveTab]);

  return {
    value,
    setValue,
  };
};
