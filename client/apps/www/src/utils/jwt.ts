import type { JWTPayload } from "jose";
import { jwtVerify, SignJWT } from "jose";

export const createJwtToken = async ({
  payload,
  secret,
  expireDate,
}: {
  payload: JWTPayload;
  secret: string;
  expireDate: Date;
}) => {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expires = expireDate.getTime() / 1000;

  return new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(expires)
    .setIssuedAt(issuedAt)
    .setNotBefore(issuedAt)
    .sign(new TextEncoder().encode(secret));
};

export const verifyJwtToken = async ({
  secret,
  token,
}: {
  secret: string;
  token: string;
}) => {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
};
