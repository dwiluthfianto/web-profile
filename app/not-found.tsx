"use client";

import Link from "next/link";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Ambient Glowing Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[80px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative z-10 max-w-md w-full space-y-8 animate-fade-in">
        {/* Animated Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-muted/40 dark:bg-muted/15 border border-border/80 flex items-center justify-center text-black shadow-sm">
          <FileQuestion className="w-8 h-8 stroke-[1.5]" />
        </div>

        {/* 404 Text */}
        <div className="space-y-2">
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter font-mono text-black select-none leading-none">
            404
          </h1>
          <h2 className="text-lg md:text-xl font-bold tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan, telah dihapus,
            atau alamat URL yang dimasukkan salah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-xs mx-auto">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="sm"
            className="w-full sm:flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer h-10 transition-all duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="w-full sm:flex-1 font-mono uppercase tracking-wider text-xs cursor-pointer h-10 transition-all duration-200"
          >
            <Link href="/">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
