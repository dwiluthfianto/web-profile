"use client";

import { BlogSection } from "@/components/section/blog-section";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Plus, BookOpen } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  const { data: user } = useUser();
  return (
    <div className='p-4 space-y-8'>
      <div className='space-y-4'>
        <div className='text-center space-y-2'>
          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit mx-auto'>
            <BookOpen className='w-3 h-3 text-amber-500/80 dark:text-amber-400/80' />
            <span>Writing & Thoughts</span>
          </div>
          <h1 className='text-3xl font-mono font-bold tracking-tight'>
            <span className='text-muted-foreground'>/</span>blogs
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            Thoughts, technical deep dives, software engineering insights, and lessons learned along the way.
          </p>
        </div>
        {user && (
          <div className='flex justify-end'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
              asChild
            >
              <Link href='/blogs/create'>
                <Plus className='w-3.5 h-3.5' />
                <span>New Blog</span>
              </Link>
            </Button>
          </div>
        )}
      </div>
      <BlogSection />
    </div>
  );
}
