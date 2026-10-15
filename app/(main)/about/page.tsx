"use client";

import { ExperienceSection } from "@/components/section/experience-section";
import { SkillSection } from "@/components/section/skill-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useFileView } from "@/hooks/useStorage";
import { useUserProfile } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, User } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const { data, isPending } = useUserProfile();
  const { data: file, isPending: filePending } = useFileView(data?.image);

  return (
    <div className='p-4 space-y-10'>
      {/* Page Header */}
      <div className='text-center space-y-2.5'>
        <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit mx-auto'>
          <User className='w-3 h-3 text-emerald-500/80 dark:text-emerald-400/80' />
          <span>Profile & Overview</span>
        </div>
        <h1 className='text-3xl font-mono font-bold tracking-tight'>
          <span className='text-muted-foreground'>/</span>about
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-sm text-muted-foreground max-w-md mx-auto'>
          Who I am, what I build, and the philosophy behind my engineering work.
        </p>
      </div>

      {/* Hero Profile Card */}
      {isPending || filePending ? (
        <div className='rounded-2xl border border-border/70 bg-card/40 dark:bg-zinc-950/40 p-5 sm:p-6 backdrop-blur-xs shadow-xs'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
            <div className='md:col-span-2 space-y-4'>
              <Skeleton className='h-8 w-1/2' />
              <div className='space-y-2 pt-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/5' />
              </div>
              <Skeleton className='h-8 w-28 mt-4 rounded-lg' />
            </div>
            <div className='md:col-span-1 max-w-[240px] mx-auto w-full'>
              <AspectRatio ratio={1 / 1} className='bg-muted rounded-xl overflow-hidden'>
                <Skeleton className='h-full w-full' />
              </AspectRatio>
            </div>
          </div>
        </div>
      ) : data && file ? (
        <div className='relative rounded-2xl border border-border/70 bg-card/40 dark:bg-zinc-950/40 p-5 sm:p-6 backdrop-blur-xs shadow-xs overflow-hidden animate-fade-in'>
          <div className='pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/[0.03] to-transparent' />
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
            <div className='md:col-span-2 space-y-3'>
              <h2 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                Hi, I'm {data.name}
              </h2>
              <p className='text-sm text-muted-foreground leading-relaxed text-justify'>
                {data.about}
              </p>
              <div className='pt-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
                  asChild
                >
                  <a href='#'>
                    <FileText className='w-3.5 h-3.5' />
                    <span>View Resume</span>
                  </a>
                </Button>
              </div>
            </div>
            <div className='md:col-span-1 max-w-[240px] mx-auto w-full'>
              <div className='p-1 rounded-2xl bg-muted/60 border border-border/60 shadow-xs'>
                <AspectRatio ratio={1 / 1} className='bg-muted rounded-xl overflow-hidden'>
                  <Image
                    src={file}
                    alt='profile image'
                    fill
                    className='h-full w-full object-cover rounded-xl'
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Career Experiences */}
      <ExperienceSection />

      {/* Technical Skills */}
      <SkillSection />
    </div>
  );
}
