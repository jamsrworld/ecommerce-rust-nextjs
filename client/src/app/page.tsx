import { Link } from "@jamsr-ui/react";
import NextLink from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-4xl">
        Hii 👋 there, this is a modern cart(mcart) built with next.js and rust
      </p>
      <Link as={NextLink} href="/login">
        Go to login
      </Link>
    </div>
  );
}
