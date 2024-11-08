import { APP_ROUTES } from "@/config/routes";
import { Card, CardContent, CardHeader, Link } from "@jamsr-ui/react";
import NextLink from "next/link";
import { UserData } from "./user-data";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-4xl">
        Hii 👋 there, this is a modern cart(mcart) built with next.js and rust
      </p>
      <UserData />
      <Card>
        <CardHeader heading="Login" />
        <CardContent>HIi there</CardContent>
      </Card>
      <Link
        as={NextLink}
        href={APP_ROUTES.products.root}
      >
        View Products
      </Link>
      <Link
        as={NextLink}
        href={APP_ROUTES.login}
      >
        Go to login
      </Link>
      <Link
        as={NextLink}
        href={APP_ROUTES.search("text")}
      >
        Search Product
      </Link>
      <Link
        as={NextLink}
        href={APP_ROUTES.checkout}
      >
        Checkout
      </Link>
      <Link
        as={NextLink}
        href="/demo"
      >
        View Product
      </Link>
    </div>
  );
}
