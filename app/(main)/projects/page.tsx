"use client";

import { HeaderImage } from "@/components/image/header-image";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { useListProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const { data: user } = useUser();
  const { data, isPending } = useListProject(25);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <div>
          <h1 className='text-4xl font-bold text-center'>
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
      {isPending ? null : data?.length === 0 ? (
        <h1 className='text-center'>Projects not found</h1>
      ) : (
        <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
          {data?.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={<HeaderImage ratio={16 / 9} fileId={item.image} />}
              link={item.link}
              slug={item.slug}
              id={item.$id}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
