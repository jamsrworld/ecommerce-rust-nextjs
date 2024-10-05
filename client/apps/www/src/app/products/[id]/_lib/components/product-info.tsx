import { Accordion, AccordionItem, Divider, Typography } from "@jamsr-ui/react";
import React from "react";

const items: { heading: string; description: string }[] = [
  {
    heading: "Shipping & Retuns",
    description: `Delivery:
Delivery is offered in France* from 120 € of purchase.
Preparation: your order will be prepared under 1 to 3 working days.
Delivery: once prepared, your order will be sent under 24 to 72 working hours at your residence or in point relay according to your preference

Return:
The return is offered in metropolitan France*.
You have 60 days from the reception of your shoes to benefit from the free return.the returned items must respect the following conditions:
- they must not have been worn outside
- they must be in a new condition

The procedure for making a return is available on the "Returns and Exchanges" page*.
Shipping costs and return shipping costs for international shipments are available on https://ubac-store.com/retours-echanges/`,
  },
  {
    heading: "Care",
    description: `We recommend hand washing in warm water with a soft sponge or cloth. For stubborn stains, you can add a few drops of washing-up liquid.

In case of stubborn stains, you can put your pair in the washing machine at 30 degrees without spinning in a net. Drying in the open air is mandatory.

Before starting the cleaning, we advise you to remove the laces and the insole. To preserve the quality and to optimize the life of your shoes, hand washing is nevertheless recommended.

Ubac's eco-responsible tip: to preserve your shoes and the planet, prefer hand washing. At least, a machine wash consumes 40 to 50 liters of water and about 1.2 kWh of electricity.`,
  },
  {
    heading: "Durability & Composition",
    description: `VOLA has a carbon footprint of 6.1 kg of CO2e according to an independent assessment by Carbon Fact. This basket is 66% less impactful than the industry average (17 kg CO2e)

Composition:

    GRS certified recycled wool which not only certifies the recycled content of a product but also verifies the respect of environmental and social criteria -Recycled wool upper (70%), recycled polyester (25%) and other recycled fibres (5%) - FRANCE
    Outsole made of Green EVA® from sugar cane, alternative to classic EVA derived from petroleum - Green EVA®, sugar cane ethanol (60%), vinyl acetate (40%) - PORTUGAL
    Recycled plastic bottle laces - Recycled polyester (100%) - PORTUGAL
    Ortholite® insole made of production waste (15%), recycled rubber (5%) and other synthetic materials - SPAIN

    Details:

    Everyday sneaker. Recommended for leisure.
    Wool from recycled clothing (especially sweaters) that have been dropped off at collection points and then sorted by color. No dye is added for the colors of the shoes.
    Unmatched comfort.
    Soft sole for superior cushioning.
    Naturally breathable and antibacterial fiber upper.
    Durable design with ultra-resistant, water-repellent weave.
    Reinforced embroidered eyelets.
    Ankle and heel reinforcement for optimal support.
    Weight: 198 g (size 38).
    Midsole drop: 8 mm (heel: 25 mm, forefoot: 17 mm).
    Assembled with a solvent-free glue (water-based glue).`,
  },
  {
    heading: "Recyclability",
    description: `The future is recyclable

      KOTO is a 100% recyclable sneaker. It can be returned to Ubac by writing to us at contact@ubac-store.com to be recycled and reintegrated into future productions.`,
  },
];

export const ProductInfo = () => {
  return (
    <div>
      <Divider className="py-2" />
      <Accordion>
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <AccordionItem
                title={item.heading}
                className="bg-transparent [&_svg_path]:stroke-2"
              >
                <Typography
                  as="p"
                  className="font-normal text-foreground-secondary"
                >
                  {item.description}
                </Typography>
              </AccordionItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </Accordion>
    </div>
  );
};
