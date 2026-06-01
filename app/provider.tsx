"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1, // Only retry once to speed up error boundary redirection (instead of default 3 retries)
            throwOnError: (error: any) => {
              // Appwrite unauthorized error (401) is expected for guests checking session status
              if (
                error &&
                (error.code === 401 || error.type === "user_unauthorized")
              ) {
                return false;
              }
              // Allow all other errors (such as Appwrite 403 or network failures) to bubble up to error boundaries
              return true;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        {children}
        <Toaster richColors />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
