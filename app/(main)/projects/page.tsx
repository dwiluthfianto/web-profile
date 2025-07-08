"use client";

import { HeaderImage } from "@/components/section/project-section";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { useListProject } from "@/hooks/useProject";

export default function ProjectsPage() {
  const { data, isPending } = useListProject(25);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-muted-foreground'>/</span>projects
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-center text-muted-foreground'>
          A collection of projects I've worked on.
        </p>
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
              header={<HeaderImage fileId={item.image} />}
              link={item.link}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
