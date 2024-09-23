export const isObject = (data: unknown): data is object =>
  typeof data === "object" && data !== null;

export const isString = (data: unknown): data is string =>
  typeof data === "string";