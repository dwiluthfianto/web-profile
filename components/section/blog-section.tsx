"use client";

import { useListBlog } from "@/hooks/useBlog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Eraser, SquarePen, BookOpen, Terminal } from "lucide-react";
import { useState } from "react";
import { DeleteBlogDialog } from "@/app/(main)/blogs/delete-dialog";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "../ui/skeleton";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export function BlogSection() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
  const { data: user } = useUser();
  const { data, isPending } = useListBlog();

  return (
    <div className='relative rounded-2xl border border-border/70 bg-card/40 dark:bg-zinc-950/40 p-4 sm:p-5 backdrop-blur-xs shadow-xs'>
      {/* Subtle Ambient Surface Gradient */}
      <div className='pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/[0.03] to-transparent' />

      {/* Machined Top Control Bar */}
      <div className='flex items-center justify-between pb-3.5 mb-5 border-b border-border/50 text-[11px] font-mono text-muted-foreground'>
        <div className='flex items-center gap-2'>
          <Terminal className='w-3.5 h-3.5 text-muted-foreground/70' />
          <span className='tracking-wider uppercase'>Articles & Publications</span>
        </div>
        <div className='flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted/80 border border-border/50'>
          <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
          <span>
            {data?.length ?? 0} {(data?.length ?? 0) === 1 ? "POST" : "POSTS"}
          </span>
        </div>
      </div>

      {/* Content States */}
      {isPending ? (
        <div className='relative pl-6 sm:pl-7 space-y-6'>
          <div className='absolute left-2.5 sm:left-3 top-2 bottom-3 w-px bg-border/40' />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='relative'>
              <div className='absolute -left-6 sm:-left-7 top-1.5 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted border border-border/40'>
                <Skeleton className='w-2 h-2 rounded-full' />
              </div>
              <div className='p-3.5 sm:p-4 rounded-xl border border-border/40 bg-card/40 space-y-2.5'>
                <Skeleton className='h-4 w-28 rounded-md' />
                <Skeleton className='h-5 w-52 rounded' />
                <Skeleton className='h-12 w-full rounded' />
              </div>
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className='py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 rounded-xl border border-dashed border-border/80 bg-muted/10'>
          <div className='w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/50 text-muted-foreground'>
            <BookOpen className='w-5 h-5' />
          </div>
          <div className='space-y-1'>
            <h3 className='text-sm font-medium text-foreground'>No articles published yet</h3>
            <p className='text-xs text-muted-foreground max-w-xs'>
              Technical writings, thought pieces, and tutorials will appear here.
            </p>
          </div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='show'
          className='relative pl-6 sm:pl-7 space-y-6'
        >
          {/* Continuous vertical timeline guide */}
          <div className='absolute left-2.5 sm:left-3 top-2 bottom-3 w-px bg-border/70' />

          {data?.map((item, i) => {
            const isLatest = i === 0;
            return (
              <motion.div
                key={item.$id ?? i}
                variants={itemVariants}
                className='relative group'
              >
                {/* Timeline Node Marker */}
                <div
                  className={cn(
                    "absolute -left-6 sm:-left-7 top-1.5 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background border transition-all duration-300 z-10",
                    isLatest
                      ? "border-emerald-500/60 shadow-xs ring-2 ring-emerald-500/10"
                      : "border-border/80 group-hover:border-foreground/30"
                  )}
                >
                  {isLatest ? (
                    <span className='relative flex h-2 w-2'>
                      <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                      <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-500' />
                    </span>
                  ) : (
                    <span className='w-1.5 h-1.5 rounded-full bg-muted-foreground/50 group-hover:bg-foreground/70 transition-colors' />
                  )}
                </div>

                {/* Blog Card */}
                <div className='p-3.5 sm:p-4 rounded-xl border border-border/60 bg-background/80 dark:bg-zinc-900/60 hover:bg-accent/40 dark:hover:bg-zinc-800/40 hover:border-foreground/20 hover:shadow-xs transition-all duration-200'>
                  {/* Meta: Date & Actions */}
                  <div className='flex items-center justify-between gap-2 mb-2'>
                    <span
                      className='text-[11px] font-mono tracking-wider uppercase text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60 border border-border/40'
                      suppressHydrationWarning
                    >
                      {item.$createdAt
                        ? new Date(item.$createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "Unknown Date"}
                    </span>

                    {user && (
                      <div className='flex items-center'>
                        <DropdownMenu>
                          <DropdownMenuTrigger className='h-7 w-7 p-0 flex items-center justify-center rounded-lg bg-muted/60 hover:bg-accent border border-border/60 text-muted-foreground hover:text-foreground shadow-xs transition-all active:scale-[0.98] cursor-pointer'>
                            <Ellipsis className='w-3.5 h-3.5' />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuItem asChild className='cursor-pointer'>
                              <Link href={`/blogs/${item.slug}/edit`}>
                                <SquarePen className='w-3.5 h-3.5 mr-2' />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className='cursor-pointer text-destructive focus:text-destructive'
                              onClick={() => setDeleteDialogOpen(item.$id)}
                            >
                              <Eraser className='w-3.5 h-3.5 mr-2' /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DeleteBlogDialog
                          documentId={item.$id}
                          open={deleteDialogOpen === item.$id}
                          onOpenChange={(open) =>
                            setDeleteDialogOpen(open ? item.$id : null)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <Link
                    className='cursor-pointer inline-block group/link'
                    href={`/blogs/${item.slug ?? item.$id}`}
                  >
                    <h3 className='text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover/link:text-primary transition-colors'>
                      {item.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  {item.description && (
                    <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2'>
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
