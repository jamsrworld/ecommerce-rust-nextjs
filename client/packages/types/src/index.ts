

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequiredFields<T, K extends keyof T> = T &
  Required<Pick<T, K>>;
export type OptionalFields<T, K extends keyof T> = T &
  Partial<Pick<T, K>>;
