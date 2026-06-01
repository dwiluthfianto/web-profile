"use client";

import { HeaderImage } from "@/components/image/header-image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { useListProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: user } = useUser();
  const { data, isPending } = useListProject(25);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <div>
          <h1 className='text-3xl font-mono font-bold text-center'>
            <span className='text-muted-foreground'>/</span>projects
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-center text-muted-foreground'>
            A collection of projects I've worked on.
          </p>
        </div>
        {user && (
          <div className='flex justify-end'>
            <Button asChild>
              <Link href='/projects/create'>
                <Plus /> New Project
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
              className="row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-white/[0.2] dark:bg-black h-full"
            >
              <Skeleton className="w-full h-[180px] rounded-lg animate-pulse" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3 animate-pulse" />
                <Skeleton className="h-4 w-5/6 animate-pulse" />
              </div>
            </div>
          ))}
        </BentoGrid>
      ) : data?.length === 0 ? (
        <h1 className='text-center'>Projects not found</h1>
      ) : (
        <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
          {data?.map((item, i) => (
            <div key={i} className="animate-fade-in">
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
