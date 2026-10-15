import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useListProject } from "@/hooks/useProject";
import { HeaderImage } from "../image/header-image";
import { Skeleton } from "../ui/skeleton";
import { FolderGit2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export function ProjectSection() {
  const { data, isPending } = useListProject(2);

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
        <div className='space-y-2'>
          <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit'>
            <FolderGit2 className='w-3 h-3 text-indigo-500/80 dark:text-indigo-400/80' />
            <span>Featured Work</span>
          </div>
          <h2 className='text-3xl font-mono font-bold tracking-tight'>
            <span className='text-muted-foreground'>/</span>projects
            <span className='text-muted-foreground'>.</span>
          </h2>
          <p className='text-sm text-muted-foreground max-w-lg leading-relaxed'>
            Selected engineering projects and software products I've crafted to solve real problems.
          </p>
        </div>

        <div>
          <Button
            variant='outline'
            size='sm'
            className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
            asChild
          >
            <Link href='/projects'>
              <span>All Projects</span>
              <ArrowUpRight className='w-3.5 h-3.5' />
            </Link>
          </Button>
        </div>
      </div>

      <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
        {isPending
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className='row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-border/60 bg-card/40 p-4 h-full'
              >
                <Skeleton className='w-full h-[160px] rounded-xl' />
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-1/3 rounded' />
                  <Skeleton className='h-4 w-5/6 rounded' />
                </div>
              </div>
            ))
          : data?.map((item, i) => (
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
    </div>
  );
}
