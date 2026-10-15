"use client";

import { HeaderImage } from "@/components/image/header-image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { useListProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, FolderGit2 } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: user } = useUser();
  const { data, isPending } = useListProject(25);

  return (
    <div className='p-4 space-y-8'>
      <div className='space-y-4'>
        <div className='text-center space-y-2'>
          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit mx-auto'>
            <FolderGit2 className='w-3 h-3 text-indigo-500/80 dark:text-indigo-400/80' />
            <span>Portfolio & Works</span>
          </div>
          <h1 className='text-3xl font-mono font-bold tracking-tight'>
            <span className='text-muted-foreground'>/</span>projects
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-sm text-muted-foreground max-w-md mx-auto'>
            A showcase of applications, developer tools, and digital experiences I've engineered.
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
              <Link href='/projects/create'>
                <Plus className='w-3.5 h-3.5' />
                <span>New Project</span>
              </Link>
            </Button>
          </div>
        )}
      </div>

      {isPending ? (
        <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-border/60 bg-card/40 p-4 h-full'
            >
              <Skeleton className='w-full h-[180px] rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-5 w-1/3 rounded' />
                <Skeleton className='h-4 w-5/6 rounded' />
              </div>
            </div>
          ))}
        </BentoGrid>
      ) : data?.length === 0 ? (
        <div className='py-12 px-4 flex flex-col items-center justify-center text-center space-y-3 rounded-2xl border border-dashed border-border/80 bg-muted/10'>
          <div className='w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center border border-border/50 text-muted-foreground'>
            <FolderGit2 className='w-5 h-5' />
          </div>
          <div className='space-y-1'>
            <h3 className='text-sm font-medium text-foreground'>No projects found</h3>
            <p className='text-xs text-muted-foreground max-w-xs'>
              Showcased projects will appear here once published.
            </p>
          </div>
        </div>
      ) : (
        <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
          {data?.map((item, i) => (
            <div key={item.$id ?? i} className='animate-fade-in'>
              <BentoGridItem
                title={item.title}
                description={item.description}
                header={<HeaderImage ratio={16 / 9} fileId={item.image} />}
                link={item.link}
                slug={item.slug}
                id={item.$id}
              />
            </div>
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
