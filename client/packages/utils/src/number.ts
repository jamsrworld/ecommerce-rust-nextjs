import { ChargeType } from "@repo/db/enums";

const currency = "USD";

export const fPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const fPercent = (value: number) => {
  return `${value}%`;
};

export const fCharge = (charge: number, chargeType: ChargeType) => {
  return chargeType === ChargeType.Fixed
    ? fPrice(charge)
    : fPercent(charge);
};

export const fNumber = (value: number) => {
  return Number(value.toFixed(2));
};

// export const calcDiscoun
