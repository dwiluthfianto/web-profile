"use client";

import { BlogSection } from "@/components/section/blog-section";
import { ExperienceSection } from "@/components/section/experience-section";
import { ProjectSection } from "@/components/section/project-section";
import { SkillSection } from "@/components/section/skill-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserProfile } from "@/hooks/useUser";
import {
  ArrowUpRight,
  BookOpen,
  Command,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function HomeView({ initialProfile }: { initialProfile?: any }) {
  const { data: fetchedProfile, isPending } = useUserProfile();
  const data = fetchedProfile ?? initialProfile;

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <div className='p-4 space-y-16'>
      {/* Hero Section */}
      {isPending && !data ? (
        <div className='space-y-4 py-4'>
          <Skeleton className='h-6 w-48 rounded-full' />
          <Skeleton className='h-14 w-3/4 rounded-xl' />
          <Skeleton className='h-7 w-1/2 rounded-lg' />
          <Skeleton className='h-7 w-2/3 rounded-lg' />
          <div className='flex gap-3 pt-2'>
            <Skeleton className='h-9 w-28 rounded-lg' />
            <Skeleton className='h-9 w-32 rounded-lg' />
          </div>
        </div>
      ) : (
        <section className='space-y-6 animate-fade-in py-4'>
          {/* Status & Eyebrow Badges */}
          <div className='flex flex-wrap items-center gap-2'>
            <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
              <Sparkles className='w-3 h-3 text-amber-500/80 dark:text-amber-400/80' />
              <span>Software Engineer</span>
            </div>

            <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400 w-fit'>
              <span className='relative flex h-1.5 w-1.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500' />
              </span>
              <span>Available for new projects</span>
            </div>
          </div>

          <div className='space-y-4'>
            <h1 className='text-4xl sm:text-6xl font-bold tracking-tight text-foreground'>
              Hi, I'm {data?.name || "Dwi Luthfianto"}
            </h1>
            <p className='text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-2xl'>
              {data?.subheadline}
            </p>
            {data?.todo && (
              <p className='text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl pt-1'>
                {data.todo}
              </p>
            )}
          </div>

          {/* Hero CTA Bar */}
          <div className='flex flex-wrap items-center gap-2.5 pt-2'>
            <Button
              size='sm'
              className='h-9 px-4 text-xs gap-1.5 rounded-lg font-medium cursor-pointer shadow-xs active:scale-[0.98]'
              asChild
            >
              <Link href='/contact'>
                <Mail className='w-3.5 h-3.5' />
                <span>Let's Talk</span>
              </Link>
            </Button>

            <Button
              variant='outline'
              size='sm'
              className='h-9 px-3.5 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
              asChild
            >
              <Link href='/about'>
                <FileText className='w-3.5 h-3.5' />
                <span>About & Profile</span>
              </Link>
            </Button>

            <Button
              variant='ghost'
              size='sm'
              onClick={openCommandPalette}
              className='h-9 px-3 text-xs gap-2 rounded-lg text-muted-foreground hover:text-foreground font-mono cursor-pointer'
            >
              <Command className='w-3.5 h-3.5' />
              <span>Press</span>
              <kbd className='text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded border border-border/60 text-foreground'>
                ⌘K
              </kbd>
              <span>to jump</span>
            </Button>
          </div>
        </section>
      )}

      {/* 1. Featured Projects */}
      <ProjectSection />

      {/* 2. Recent Writing / Articles */}
      <section className='space-y-6'>
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          <div className='space-y-2'>
            <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
              <BookOpen className='w-3 h-3 text-emerald-500/80 dark:text-emerald-400/80' />
              <span>Technical Writing</span>
            </div>
            <h2 className='text-3xl font-mono font-bold tracking-tight'>
              <span className='text-muted-foreground'>/</span>blogs
              <span className='text-muted-foreground'>.</span>
            </h2>
            <p className='text-sm text-muted-foreground max-w-lg leading-relaxed'>
              Engineering notes, system design breakdowns, and lessons learned building production software.
            </p>
          </div>

          <div>
            <Button
              variant='outline'
              size='sm'
              className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
              asChild
            >
              <Link href='/blogs'>
                <span>All Articles</span>
                <ArrowUpRight className='w-3.5 h-3.5' />
              </Link>
            </Button>
          </div>
        </div>

        <BlogSection />
      </section>

      {/* 3. Career Experience Timeline */}
      <ExperienceSection />

      {/* 4. Technical Stack & Tools */}
      <SkillSection />
    </div>
  );
}
