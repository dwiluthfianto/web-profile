"use client";

import { useState } from "react";
import { Server, RefreshCw, Home, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerDisturbanceProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export function ServerDisturbance({ error, reset }: ServerDisturbanceProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      if (reset) {
        reset();
      } else {
        window.location.reload();
      }
      setIsRetrying(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-6 transition-colors duration-300">
      <div className="w-full max-w-md border border-border bg-card text-card-foreground rounded-lg p-6 md:p-8 shadow-sm">
        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 mb-6">
          <Server className="w-5 h-5 text-foreground stroke-[1.5]" />
          <h1 className="text-sm font-bold tracking-wider uppercase font-mono">
            Server Disturbance
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-2 mb-8">
          <p className="text-sm font-medium">
            Koneksi ke server terputus atau tidak dapat dibangun.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Kami sedang mengalami kendala jaringan atau server sedang tidak
            aktif. Silakan coba lagi dalam beberapa saat atau kembali ke halaman
            utama.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            variant="default"
            size="sm"
            className="flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`}
            />
            {isRetrying ? "Retrying..." : "Retry"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer"
          >
            <a href="/">
              <Home className="w-3.5 h-3.5" />
              Home
            </a>
          </Button>
        </div>

        {/* Technical Details Accordion */}
        {error && (
          <div className="border-t border-border pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer"
            >
              <span>Diagnostics</span>
              {showDetails ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 p-3 rounded bg-muted/30 border border-border font-mono text-[10px] text-muted-foreground overflow-x-auto max-h-40 whitespace-pre-wrap leading-normal select-text">
                <div className="font-semibold text-foreground mb-1">
                  Error: {error.name || "Error"}
                </div>
                <div className="mb-2 break-all">{error.message}</div>
                {error.digest && (
                  <div className="mb-2">Digest: {error.digest}</div>
                )}
                {error.stack && (
                  <div className="text-[9px] opacity-85 break-words">
                    {error.stack.split("\n").slice(0, 5).join("\n")}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
