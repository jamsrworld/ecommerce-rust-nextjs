export const onRHFInvalid = (err: Record<string, unknown>) => {
  console.log("err:->", err);
  const name = Object.keys(err)[0];
  if (name) {
    const formControl = document.querySelector(`[data-invalid=true]`);
    if (!formControl) return false;

    // void animate(
    //   formControl,
    //   {
    //     // scale: 2,
    //     x: [-10, 10, -10, 10, 0],
    //   },
    //   {
    //     duration:1,

    //     repeatType: "loop",
    //   },
    // );

    formControl.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // @ts-expect-error todo
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    formControl?.focus({
      preventScroll: true,
    });
  }
  return false;
};
