"use client";

import { useListExperience } from "@/hooks/useExperience";
import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus, SquarePen, Briefcase, Terminal } from "lucide-react";
import { useState } from "react";
import AddExperienceDialog from "@/app/(main)/account/experiences/add-experience-dialog";
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

export function ExperienceSection() {
  const { data: user } = useUser();
  const { data, isPending } = useListExperience();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  return (
    <section className='space-y-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start'>
      {/* Left Column: Heading, Eyebrow, Meta, and Admin Controls */}
      <div className='md:col-span-1 space-y-4'>
        <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
          <Briefcase className='w-3 h-3 text-sky-500/80 dark:text-sky-400/80' />
          <span>Career & Roles</span>
        </div>

        <div className='space-y-1.5'>
          <h2 className='text-3xl font-mono font-bold tracking-tight'>
            <span className='text-muted-foreground'>/</span>experiences
            <span className='text-muted-foreground'>.</span>
          </h2>
          <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
            My professional journey, engineering roles, and track record of building production products.
          </p>
        </div>

        {/* Admin Controls */}
        {user && (
          <>
            <div className='flex items-center gap-2 pt-1'>
              <Button
                variant='outline'
                size='sm'
                className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
                asChild
              >
                <Link href='/account/experiences'>
                  <SquarePen className='w-3.5 h-3.5' />
                  <span>Manage</span>
                </Link>
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
                onClick={() => setAddDialogOpen(true)}
              >
                <Plus className='w-3.5 h-3.5' />
                <span>Add Experience</span>
              </Button>
            </div>
            <AddExperienceDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
            />
          </>
        )}
      </div>

      {/* Right Column: Double-Bezel Card Container */}
      <div className='md:col-span-2'>
        <div className='relative rounded-2xl border border-border/70 bg-card/40 dark:bg-zinc-950/40 p-4 sm:p-5 backdrop-blur-xs shadow-xs'>
          {/* Subtle Ambient Surface Gradient */}
          <div className='pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/[0.03] to-transparent' />

          {/* Machined Top Control Bar */}
          <div className='flex items-center justify-between pb-3.5 mb-5 border-b border-border/50 text-[11px] font-mono text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Terminal className='w-3.5 h-3.5 text-muted-foreground/70' />
              <span className='tracking-wider uppercase'>Career Timeline</span>
            </div>
            <div className='flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted/80 border border-border/50'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
              <span>
                {data?.length ?? 0} {(data?.length ?? 0) === 1 ? "ROLE" : "ROLES"}
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
                    <Skeleton className='h-4 w-32 rounded-md' />
                    <Skeleton className='h-5 w-48 rounded' />
                    <Skeleton className='h-4 w-28 rounded' />
                    <Skeleton className='h-12 w-full rounded' />
                  </div>
                </div>
              ))}
            </div>
          ) : data?.length === 0 ? (
            <div className='py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 rounded-xl border border-dashed border-border/80 bg-muted/10'>
              <div className='w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/50 text-muted-foreground'>
                <Briefcase className='w-5 h-5' />
              </div>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium text-foreground'>No experience listed yet</h3>
                <p className='text-xs text-muted-foreground max-w-xs'>
                  Add your employment history, roles, and milestones to showcase your career growth.
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

              {data &&
                data.map((item, i) => {
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

                      {/* Experience Card */}
                      <div className='p-3.5 sm:p-4 rounded-xl border border-border/60 bg-background/80 dark:bg-zinc-900/60 hover:bg-accent/40 dark:hover:bg-zinc-800/40 hover:border-foreground/20 hover:shadow-xs transition-all duration-200'>
                        {/* Meta Header: Date & Employment Type */}
                        <div className='flex flex-wrap items-center justify-between gap-2 mb-2'>
                          <span
                            className='text-[11px] font-mono tracking-wider uppercase text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60 border border-border/40'
                            suppressHydrationWarning
                          >
                            {item.startDate
                              ? new Date(item.startDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })
                              : "Unknown Date"}{" "}
                            —{" "}
                            {item.endDate
                              ? new Date(item.endDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })
                              : "Present"}
                          </span>
                          {item.employmentType && (
                            <span className='text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-muted/40 text-muted-foreground/90 border border-border/40'>
                              {item.employmentType}
                            </span>
                          )}
                        </div>

                        {/* Role Title & Company */}
                        <div className='space-y-0.5'>
                          <h3 className='text-base sm:text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors'>
                            {item.title}
                          </h3>
                          <p className='text-xs sm:text-sm font-medium text-foreground/80 flex items-center gap-1.5'>
                            <span>{item.company}</span>
                          </p>
                        </div>

                        {/* Description */}
                        {item.description && (
                          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 pt-2.5 border-t border-border/40'>
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
      </div>
    </section>
  );
}
