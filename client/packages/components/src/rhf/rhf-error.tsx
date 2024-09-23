export const onRHFInvalid = (err: Record<string, unknown>) => {
  console.log("err:->", err)
  const name = Object.keys(err)[0];
  if (name) {
    const formControl = document.querySelector(`[data-invalid=true]`);
    if (!formControl) return false;
    formControl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    // @ts-expect-error TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    formControl?.focus({
      preventScroll: true,
    });
  }
  return false;
};
