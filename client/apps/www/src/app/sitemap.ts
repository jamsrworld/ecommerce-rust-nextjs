import { getProducts } from "@/client";
import { APP_ROUTES, protectedRoutes } from "@/config/routes";
import { withAppServerUrl } from "@/utils/url";
import { type MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";

const disallowedRoutes: string[] = [APP_ROUTES.logout, ...protectedRoutes];

const productsSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  try {
    const products = await getProducts();
    const sitemap: MetadataRoute.Sitemap = (products.data ?? []).map(
      (item) => ({
        url: withAppServerUrl(APP_ROUTES.products.view(item.id, item.slug)),
        lastModified: item.updatedAt,
        priority: 1,
        changeFrequency: "daily",
      }),
    );
    return sitemap;
  } catch (err) {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  unstable_noStore();

  const routes = Object.values(APP_ROUTES).filter(
    (item) => typeof item === "string" && !disallowedRoutes.includes(item),
  );

  const products = await productsSitemap();
  return [
    ...routes.map(
      (item) =>
        ({
          url: withAppServerUrl(item as string),
          changeFrequency: item === "/" ? "daily" : "monthly",
          priority: 0.7,
        }) satisfies MetadataRoute.Sitemap[number],
    ),
    ...products,
  ];
}
