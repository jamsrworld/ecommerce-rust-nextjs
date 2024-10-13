import { createContext, useContext, useMemo, useState } from "react";

type FollowCursorContextType = {
  showCursor: boolean;
  setShowCursor: React.Dispatch<React.SetStateAction<boolean>>;
};

const FollowCursorContext = createContext<FollowCursorContextType>(
  null as unknown as FollowCursorContextType,
);

type Props = {
  children: React.ReactNode;
};

export const FollowCursorProvider = (props: Props) => {
  const { children } = props;
  const [showCursor, setShowCursor] = useState(true);
  const value: FollowCursorContextType = useMemo(
    () => ({ showCursor, setShowCursor }),
    [showCursor],
  );

  return (
    <FollowCursorContext.Provider value={value}>
      {children}
    </FollowCursorContext.Provider>
  );
};

export const useFollowCursor = () => {
  const context = useContext(FollowCursorContext);
  if (!context) {
    throw new Error(
      "useFollowCursor must be used within a FollowCursorProvider",
    );
  }
  return context;
};
