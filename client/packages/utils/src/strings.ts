export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const obscureEmail = (email: string) => {
  const atIndex = email.indexOf("@");
  if (atIndex <= 1) return "";

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  const obscuredUsername =
    username.slice(0, 3) + "*".repeat(3) + username.slice(-1);
  const obscuredDomain = domain.slice(
    domain.lastIndexOf(".") - domain.length,
  );

  return `${obscuredUsername}@**${obscuredDomain}`;
};

export const generateRandomString = (length = 4) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength),
    );
  }
  return result;
};
