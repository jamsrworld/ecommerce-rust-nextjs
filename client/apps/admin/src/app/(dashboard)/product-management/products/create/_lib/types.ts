export type ProductCreateSchema = {
  title: string;
  skuID: string;
  minimumOrder: number;
  maximumOrder: number;
  stock: number;
  mrp: number;
  lowStockWarning: number;
  sellingPrice: number;
  visibility: "public" | "private";
  isRefundable: boolean;
  images: string[];
  details: {
    color: string;
    size: string;
    style: string;
  };
  description: string;
  highlights: { highlight: string; description: string; id: string }[];
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
};
