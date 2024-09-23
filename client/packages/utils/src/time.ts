import {
  format,
  formatDistanceToNowStrict
} from "date-fns";

export const getCurrentDateTime = () => {
  const date = new Date();
  return date;
};

export const sleep = async (timeout?: number) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeout ?? 0);
  });
};

export const fDateTime = (date: string | Date) => {
  if (!date) return "-";
  return format(new Date(date), "dd MMM yyyy HH:mm:ss");
};

export const fDateAgo = (date: string | Date) => {
  return `${formatDistanceToNowStrict(date)} ago`;
};
