"use client";

import { ReadOnlyViewer } from "@/components/blocks/editor-00/readonly-viewer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogDetail } from "@/hooks/useBlog";
import { useUser, useUserProfile } from "@/hooks/useUser";
import { incrementBlogViewsAction } from "@/lib/neon.actions";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Eye,
  Share2,
  SquarePen,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export function estimateReadingMinutes(content?: string): number {
  if (!content) return 1;
  try {
    const extractText = (node: any): string => {
      if (!node) return "";
      if (typeof node.text === "string") return node.text;
      if (Array.isArray(node.children)) {
        return node.children.map(extractText).join(" ");
      }
      if (node.root) return extractText(node.root);
      return "";
    };
    const text = extractText(JSON.parse(content));
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  } catch {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }
}

export function BlogDetailView({
  slug,
  initialBlog,
}: {
  slug: string;
  initialBlog?: any;
}) {
  const { data: fetchedBlog, isPending } = useBlogDetail(slug);
  const data = fetchedBlog ?? initialBlog;
  const { data: user } = useUser();
  const { data: profile } = useUserProfile();

  const [views, setViews] = useState<number>(initialBlog?.views ?? 0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (data?.views !== undefined && views === 0) {
      setViews(Number(data.views));
    }
  }, [data?.views, views]);

  useEffect(() => {
    if (!slug) return;
    incrementBlogViewsAction(slug)
      .then((updated) => {
        if (updated) setViews(Number(updated));
      })
      .catch(() => {});
  }, [slug]);

  const readingMinutes = useMemo(
    () => estimateReadingMinutes(data?.content),
    [data?.content]
  );

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isPending && !data) {
    return (
      <div className='p-4 space-y-8'>
        <Skeleton className='h-8 w-36 rounded-lg' />
        <div className='space-y-4'>
          <Skeleton className='h-6 w-48 rounded-md' />
          <Skeleton className='h-12 w-3/4 rounded-xl' />
          <Skeleton className='h-5 w-2/3 rounded-md' />
        </div>
        <div className='space-y-4 pt-4'>
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-5/6' />
          <Skeleton className='h-5 w-4/5' />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='p-4 py-16 text-center space-y-4'>
        <p className='text-sm font-mono text-muted-foreground'>
          404 — Article not found
        </p>
        <Button variant='outline' size='sm' asChild>
          <Link href='/blogs'>
            <ArrowLeft className='w-3.5 h-3.5 mr-1.5' />
            Back to Articles
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className='p-4 space-y-8 animate-fade-in'>
      {/* Top Action Bar */}
      <div className='flex items-center justify-between gap-3'>
        <Button
          variant='outline'
          size='sm'
          className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs'
          asChild
        >
          <Link href='/blogs'>
            <ArrowLeft className='w-3.5 h-3.5' />
            <span>All Articles</span>
          </Link>
        </Button>

        <div className='flex items-center gap-2'>
          {user && (
            <Button
              variant='outline'
              size='sm'
              className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs'
              asChild
            >
              <Link href={`/blogs/${data.slug}/edit`}>
                <SquarePen className='w-3.5 h-3.5' />
                <span>Edit</span>
              </Link>
            </Button>
          )}
          <Button
            variant='outline'
            size='sm'
            onClick={handleShare}
            className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs'
          >
            {copied ? (
              <>
                <Check className='w-3.5 h-3.5 text-emerald-500' />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Share2 className='w-3.5 h-3.5' />
                <span>Share</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <header className='space-y-4 pb-6 border-b border-border/60'>
        <div className='flex flex-wrap items-center gap-2 text-[11px] font-mono text-muted-foreground'>
          <span
            className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/50 uppercase tracking-wider'
            suppressHydrationWarning
          >
            <Calendar className='w-3 h-3 text-emerald-500/80' />
            {data.$createdAt
              ? new Date(data.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Published"}
          </span>

          <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/50'>
            <Clock className='w-3 h-3 text-sky-500/80' />
            {readingMinutes} min read
          </span>

          <span className='inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/50'>
            <Eye className='w-3 h-3 text-amber-500/80' />
            {views} {views === 1 ? "view" : "views"}
          </span>
        </div>

        <h1 className='text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight'>
          {data.title}
        </h1>

        {data.description && (
          <p className='text-base sm:text-lg text-muted-foreground leading-relaxed'>
            {data.description}
          </p>
        )}
      </header>

      {/* Rich Text Body */}
      <div className='rounded-2xl border border-border/70 bg-card/30 dark:bg-zinc-950/30 p-4 sm:p-6 backdrop-blur-xs shadow-xs'>
        <ReadOnlyViewer editorSerializedState={JSON.parse(data.content)} />
      </div>

      {/* Article Footer */}
      <footer className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border border-border/60 bg-muted/20'>
        <div className='space-y-1'>
          <p className='text-xs font-mono uppercase tracking-wider text-muted-foreground'>
            Written by
          </p>
          <p className='text-sm font-semibold text-foreground'>
            {profile?.name || "Dwi Luthfianto"}
          </p>
          <p className='text-xs text-muted-foreground'>
            {profile?.subheadline || "Software Engineer"}
          </p>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handleShare}
            className='h-8 text-xs gap-1.5 rounded-lg border-border/60 cursor-pointer'
          >
            <Share2 className='w-3.5 h-3.5' />
            <span>Copy Article Link</span>
          </Button>
          <Button
            variant='outline'
            size='sm'
            className='h-8 text-xs gap-1.5 rounded-lg border-border/60 cursor-pointer'
            asChild
          >
            <Link href='/blogs'>
              <BookOpen className='w-3.5 h-3.5' />
              <span>More Articles</span>
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}
