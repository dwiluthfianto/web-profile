"use client";

import { useEffect } from "react";
import { ServerDisturbance } from "@/components/server-disturbance";
import { useQueryClient } from "@tanstack/react-query";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    console.error("Page boundary caught error:", error);
  }, [error]);

  const handleReset = () => {
    // Reset React Query cache to clear query errors and trigger fresh API calls
    queryClient.resetQueries();
    // Reset Next.js error boundary state to remount children
    reset();
  };

  return <ServerDisturbance error={error} reset={handleReset} />;
}
