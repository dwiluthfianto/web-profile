import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { databases } from "@/app/appwrite";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { useListProject } from "@/hooks/useProject";
import { useFileView } from "@/hooks/useStorage";
import { HeaderImage } from "../image/header-image";

export function ProjectSection() {
  const { data, isPending } = useListProject(2);

  return (
    <div className='space-y-4'>
      <h1 className='text-4xl font-bold'>
        <span className='text-muted-foreground'>/</span>projects
        <span className='text-muted-foreground'>.</span>
      </h1>
      <span className='text-neutral-500 dark:text-neutral-400'>
        I build some projects to help me learn new things and also to help
        other. Follow my journey build in public{" "}
        <a href='#' className='text-blue-500 hover:underline'>
          here
        </a>
        .
      </span>
      <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
        {!isPending &&
          data?.map((item, i) => (
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
    </div>
  );
}
