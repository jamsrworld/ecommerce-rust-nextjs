import { Link } from "@jamsr-ui/react";
import { NextLink } from "@repo/components/next";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="text-4xl">Hii 👋 there, this is a mcart admin panel</p>
      <Link
        as={NextLink}
        href="/general/dashboard"
      >
        Go to dashboard
      </Link>
    </div>
  );
}
