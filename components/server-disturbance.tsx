"use client";

import { useState } from "react";
import { Server, RefreshCw, Home, ChevronDown, ChevronUp, Copy, Check, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerDisturbanceProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export function ServerDisturbance({ error, reset }: ServerDisturbanceProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopyLogs = () => {
    if (!error) return;
    const logText = `Error: ${error.name || "Error"}
Message: ${error.message}
Digest: ${error.digest || "N/A"}
Stack: ${error.stack || "N/A"}`;

    navigator.clipboard.writeText(logText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-background text-foreground p-6 overflow-hidden transition-colors duration-300">
      {/* Background Glowing Aura (Eclipse Effect) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-destructive/10 dark:bg-destructive/5 blur-[80px] pointer-events-none animate-pulse duration-[8000ms]" />
      
      <div className="relative w-full max-w-md border border-border/80 bg-card/60 dark:bg-card/45 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl transition-all duration-300">
        
        {/* Header Indicator & Status */}
        <div className="flex items-center justify-between mb-6 border-b border-border/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/5 dark:bg-destructive/10 border border-destructive/20 text-destructive animate-pulse">
              <Server className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase font-mono">
              Server Error
            </span>
          </div>
          
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive dark:bg-destructive/20 border border-destructive/30 px-2 py-0.5 rounded-full">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-destructive"></span>
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase font-mono">
              Disturbance
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3 mb-8">
          <h2 className="text-base font-semibold tracking-tight">
            Koneksi ke server terputus atau tidak dapat dibangun.
          </h2>
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
            className="flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer h-10 transition-all duration-200 hover:opacity-95"
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
            className="flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer h-10 transition-all duration-200"
          >
            <a href="/">
              <Home className="w-3.5 h-3.5" />
              Home
            </a>
          </Button>
        </div>

        {/* Technical Details Accordion */}
        {error && (
          <div className="border-t border-border/50 pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer py-1"
            >
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-muted-foreground" />
                <span>Diagnostics</span>
              </div>
              {showDetails ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            {showDetails && (
              <div className="mt-3 relative rounded-lg bg-zinc-950 text-zinc-300 border border-zinc-800/80 p-4 font-mono text-[10px] leading-relaxed shadow-inner overflow-hidden select-text animate-fade-in">
                {/* Copy logs button in top right */}
                <button
                  onClick={handleCopyLogs}
                  title="Copy diagnostics to clipboard"
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-all cursor-pointer focus:outline-none"
                >
                  {isCopied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
                
                <div className="flex items-center gap-1.5 text-zinc-500 border-b border-zinc-900 pb-2 mb-2 mr-6">
                  <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                  <span>SYSTEM_ERROR_LOG</span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <div>
                    <span className="text-zinc-500">error_class:</span>{" "}
                    <span className="text-red-400 font-semibold">{error.name || "Error"}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">message:</span>{" "}
                    <span className="text-zinc-200 break-words">{error.message}</span>
                  </div>
                  {error.digest && (
                    <div>
                      <span className="text-zinc-500">digest:</span>{" "}
                      <span className="text-amber-400">{error.digest}</span>
                    </div>
                  )}
                  {error.stack && (
                    <div className="mt-2 border-t border-zinc-900 pt-2">
                      <span className="text-zinc-500 block mb-1">stack_trace:</span>
                      <pre className="text-[9px] text-zinc-400 leading-normal overflow-x-auto whitespace-pre">
                        {error.stack.split("\n").slice(0, 5).join("\n")}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
