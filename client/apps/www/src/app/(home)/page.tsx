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
        href="/login"
      >
        Go to login
      </Link>
      <Link
        as={NextLink}
        href="/search/t-shirts"
      >
        Search Product
      </Link>
      <Link
        as={NextLink}
        href="/checkout"
      >
        Checkout
      </Link>
      <Link
        as={NextLink}
        href="/products/id"
      >
        View Product
      </Link>
    </div>
  );
}
