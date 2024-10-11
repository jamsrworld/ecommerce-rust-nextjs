import { Radio, RadioGroup, Typography } from "@jamsr-ui/react";
import { BtcpayIcon, NowpaymentsIcon, PaypalIcon } from "@repo/icons/payment";

const items = [
  {
    value: "Nowpayments",
    label: "Nowpayments",
    Icon: NowpaymentsIcon,
  },
  {
    value: "BtcPay",
    label: "Bitcoin",
    Icon: BtcpayIcon,
  },
  {
    value: "Paypal",
    label: "Paypal",
    Icon: PaypalIcon,
  },
];

export const PaymentMethodForm = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography
        as="h3"
        variant="h6"
      >
        Payment
      </Typography>
      <div>Select your payment method</div>

      <RadioGroup name="paymentMethod">
        {items.map(({ Icon, label, value }) => {
          return (
            <Radio
              key={value}
              value={value}
              className="text-ellipsis"
              classNames={{
                base: "border-2 border-divider rounded-xl p-3 m-0 gap-2 flex data-[selected=true]:border-primary ",
                label: "flex items-center gap-2 justify-between",
              }}
            >
              <span>{label}</span>
              <Icon className="max-h-8 max-w-20" />
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
};
