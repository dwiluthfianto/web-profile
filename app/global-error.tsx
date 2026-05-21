"use client";

import { useEffect } from "react";
import { ServerDisturbance } from "@/components/server-disturbance";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ServerDisturbance error={error} reset={reset} />
      </body>
    </html>
  );
}
