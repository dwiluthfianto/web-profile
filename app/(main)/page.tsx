"use client";

import { ProjectSection } from "@/components/section/project-section";
import { useUserProfile } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  const { data, isPending } = useUserProfile();

  return (
    <div className='p-4 space-y-12'>
      {isPending ? (
        <div className='space-y-4 py-4'>
          <Skeleton className='h-6 w-32 rounded-full' />
          <Skeleton className='h-14 w-3/4 rounded-xl' />
          <Skeleton className='h-7 w-1/2 rounded-lg' />
          <div className='h-4' />
          <Skeleton className='h-7 w-2/3 rounded-lg' />
        </div>
      ) : (
        <div className='space-y-5 animate-fade-in py-4'>
          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
            <Sparkles className='w-3 h-3 text-amber-500/80 dark:text-amber-400/80' />
            <span>Software Engineer</span>
          </div>
          <h1 className='text-4xl sm:text-6xl font-bold tracking-tight text-foreground'>
            Hi, I'm {data?.name}
          </h1>
          <p className='text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl'>
            {data?.subheadline}
          </p>
          {data?.todo && (
            <p className='text-lg sm:text-xl text-foreground/80 leading-relaxed max-w-2xl pt-1'>
              {data?.todo}
            </p>
          )}
        </div>
      )}
      <ProjectSection />
    </div>
  );
}
