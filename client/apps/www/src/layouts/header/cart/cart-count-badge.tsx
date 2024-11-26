type Props = { children: React.ReactNode };

export const CartCountBadge = (props: Props) => {
  const { children } = props;
  return (
    <div className="absolute right-0 top-0 flex size-[18px] items-center justify-center rounded-full bg-background-inverse text-xs text-foreground-inverse">
      {children}
    </div>
  );
};
