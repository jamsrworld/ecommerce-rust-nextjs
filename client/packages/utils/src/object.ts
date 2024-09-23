export const removeAttrsFromObject = <
  O extends object,
  A extends keyof O,
>(
  object: O,
  attrs: A[],
): Omit<O, A> =>
  Object.fromEntries(
    Object.entries(object).filter(
      // @ts-expect-error Key
      ([key]) => !attrs.includes(key),
    ),
  ) as unknown as Omit<O, A>;

export const extractAttrsFromObject = <
  O extends object,
  A extends keyof O,
>(
  object: O,
  attrs: A[],
): Pick<O, A> =>
  Object.fromEntries(
    Object.entries(object).filter(
      // @ts-expect-error Key
      ([key]) => attrs.includes(key),
    ),
  ) as unknown as Pick<O, A>;

export const resolvePromiseObject = async <
  T extends Record<keyof T, unknown>,
>(
  obj: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  Promise.all(
    Object.entries(obj).map(async ([k, v]) => [k, await v]),
  ).then(Object.fromEntries);
