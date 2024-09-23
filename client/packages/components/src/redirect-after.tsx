"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  timeout?: number;
  className?: string;
};

export const RedirectAfter = (props: Props) => {
  const { timeout = 5, className } = props;
  const router = useRouter();
  const [time, setTime] = useState(timeout);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    timerRef.current = interval;
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time < 2) {
      if (timerRef.current) clearInterval(timerRef.current);
      router.replace("/");
    }
  }, [router, time]);

  return (
    <p className={className}>Redirecting to home page after {time} seconds</p>
  );
};
