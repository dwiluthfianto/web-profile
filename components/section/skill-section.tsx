"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus, SquarePen, Search, X, Layers, Terminal, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { useListSkill } from "@/hooks/useSkill";
import AddSkillDialog from "@/app/(main)/account/skills/add-skill-dialog";
import { HeaderAvatarImage } from "../image/header-image";
import { Skeleton } from "../ui/skeleton";
import { motion, AnimatePresence } from "motion/react";

function getSkillInitials(title: string): string {
  if (!title) return "SK";
  const clean = title.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 280,
      damping: 22,
    },
  },
};

export function SkillSection() {
  const { data: user } = useUser();
  const { data: skill, isPending } = useListSkill();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSkills = useMemo(() => {
    if (!skill) return [];
    if (!searchQuery.trim()) return skill;
    const q = searchQuery.toLowerCase().trim();
    return skill.filter((s) => s.title?.toLowerCase().includes(q));
  }, [skill, searchQuery]);

  return (
    <section className='space-y-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start'>
      {/* Left Column: Heading, Meta, and Admin Controls */}
      <div className='md:col-span-1 space-y-4'>
        <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
          <Sparkles className='w-3 h-3 text-amber-500/80 dark:text-amber-400/80' />
          <span>Stack & Tools</span>
        </div>

        <div className='space-y-1.5'>
          <h2 className='text-3xl font-mono font-bold tracking-tight'>
            <span className='text-muted-foreground'>/</span>skills
            <span className='text-muted-foreground'>.</span>
          </h2>
          <p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
            Core technologies, frameworks, and developer tools I leverage to build scalable software.
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
                <Link href='/account/skills'>
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
                <span>Add Skill</span>
              </Button>
            </div>
            <AddSkillDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
            />
          </>
        )}

        {/* Quick Filter */}
        {skill && skill.length > 5 && (
          <div className='relative pt-1 max-w-xs'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/70 pointer-events-none' />
            <input
              type='text'
              placeholder='Filter technologies...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/30 transition-all'
            />
            {searchQuery && (
              <button
                type='button'
                onClick={() => setSearchQuery("")}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs p-0.5 cursor-pointer'
                title='Clear filter'
              >
                <X className='w-3 h-3' />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Right Column: Double-Bezel Card Container */}
      <div className='md:col-span-2'>
        <div className='relative rounded-2xl border border-border/70 bg-card/40 dark:bg-zinc-950/40 p-4 sm:p-5 backdrop-blur-xs shadow-xs'>
          {/* Subtle Ambient Surface Gradient */}
          <div className='pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-foreground/[0.03] to-transparent' />

          {/* Machined Top Control Bar */}
          <div className='flex items-center justify-between pb-3.5 mb-4 border-b border-border/50 text-[11px] font-mono text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Terminal className='w-3.5 h-3.5 text-muted-foreground/70' />
              <span className='tracking-wider uppercase'>Verified Capabilities</span>
            </div>
            <div className='flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded-full bg-muted/80 border border-border/50'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
              <span>
                {filteredSkills.length} {filteredSkills.length === 1 ? "TECH" : "TECHS"}
              </span>
            </div>
          </div>

          {/* Body States */}
          {isPending ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2.5'>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center gap-2.5 p-2 sm:px-3 sm:py-2.5 rounded-xl border border-border/40 bg-card/40'
                >
                  <Skeleton className='w-7 h-7 rounded-lg shrink-0' />
                  <Skeleton className='h-4 w-20 rounded' />
                </div>
              ))}
            </div>
          ) : skill?.length === 0 ? (
            <div className='py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 rounded-xl border border-dashed border-border/80 bg-muted/10'>
              <div className='w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/50 text-muted-foreground'>
                <Layers className='w-5 h-5' />
              </div>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium text-foreground'>No skills recorded yet</h3>
                <p className='text-xs text-muted-foreground max-w-xs'>
                  Add your core languages, frameworks, and developer tools to showcase your capabilities.
                </p>
              </div>
            </div>
          ) : filteredSkills.length === 0 ? (
            <div className='py-10 px-4 flex flex-col items-center justify-center text-center space-y-2'>
              <p className='text-xs text-muted-foreground'>
                No technologies matching <span className='font-mono font-medium text-foreground'>"{searchQuery}"</span>
              </p>
              <button
                type='button'
                onClick={() => setSearchQuery("")}
                className='text-xs text-foreground/80 hover:text-foreground underline underline-offset-4 cursor-pointer'
              >
                Clear filter
              </button>
            </div>
          ) : (
            <AnimatePresence mode='wait'>
              <motion.div
                key={searchQuery ? "filtered" : "all"}
                variants={containerVariants}
                initial='hidden'
                animate='show'
                className='grid grid-cols-2 sm:grid-cols-3 gap-2.5'
              >
                {filteredSkills.map((item, i) => (
                  <motion.div
                    key={item.$id ?? i}
                    variants={itemVariants}
                    layout
                    whileHover={{ y: -2 }}
                    className='group relative flex items-center gap-2.5 p-2 sm:px-3 sm:py-2.5 rounded-xl border border-border/60 bg-background/80 dark:bg-zinc-900/60 hover:bg-accent/40 dark:hover:bg-zinc-800/60 hover:border-foreground/20 hover:shadow-xs transition-colors duration-200 active:scale-[0.98] select-none cursor-default overflow-hidden'
                  >
                    {/* Subtle shine on hover */}
                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-foreground/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />

                    {/* Recessed Icon Plate */}
                    <div className='relative flex items-center justify-center w-7 h-7 rounded-lg bg-muted/80 dark:bg-zinc-800/80 border border-border/50 shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-200'>
                      <HeaderAvatarImage
                        fileId={item.image}
                        className='w-5 h-5 rounded-md'
                        fallbackText={getSkillInitials(item.title)}
                      />
                    </div>

                    {/* Skill Label */}
                    <span className='text-xs sm:text-sm font-medium tracking-tight text-foreground/90 group-hover:text-foreground truncate transition-colors'>
                      {item.title}
                    </span>

                    {/* Active micro-indicator dot */}
                    <span className='w-1.5 h-1.5 rounded-full bg-border/80 group-hover:bg-emerald-500/90 dark:group-hover:bg-emerald-400 transition-colors duration-200 shrink-0 ml-auto' />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
}
