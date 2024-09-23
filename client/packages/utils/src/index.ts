export const switchMatchGuard = (_: never): never => {
  throw new Error("Should not have reached here in the switch case");
};

export const slugify = (text: string) => {
  return text
    .replace(/^\s+|\s+$/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export const asyncCallWithTimeout = async <T>(
  asyncPromise: Promise<T>,
  timeLimit: number,
): Promise<T> => {
  let timeoutHandle: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_resolve, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new Error("Async call timeout limit reached")),
      timeLimit,
    );
  });

  return Promise.race<T>([asyncPromise, timeoutPromise]).then(
    (result) => {
      clearTimeout(timeoutHandle);
      return result;
    },
  );
};
