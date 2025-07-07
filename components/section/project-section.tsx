import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { databases } from "@/app/appwrite";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Query } from "appwrite";

export async function ProjectSection() {
  let res = await databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PROJECT_COLLECTION_ID!,
      [Query.limit(2), Query.orderDesc("$createdAt")]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

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
        {res?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={<HeaderImage url={item.image} />}
            link={item.link}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

export const HeaderImage = ({ url }: { url: string }) => (
  <AspectRatio ratio={16 / 9} className='bg-muted rounded-xl'>
    <Image
      src={url}
      alt='Project Image'
      fill
      className='h-full w-full rounded-xl object-cover dark:brightness-[0.2] dark:grayscale'
    />
  </AspectRatio>
);
