"use client";
import { ExperienceSection } from "@/components/section/experience-section";
import { SkillSection } from "@/components/section/skill-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useFileView } from "@/hooks/useStorage";
import { useUserProfile } from "@/hooks/useUser";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const { data, isPending } = useUserProfile();
  const { data: file, isPending: filePending } = useFileView(data?.image);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-muted-foreground'>/</span>about
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-center text-muted-foreground'>
          Who I am, what I do, and why it matters.
        </p>
      </div>
      {!isPending && !filePending && data! && file! && (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='md:col-span-2'>
            <div className='space-y-2'>
              <h2 className='text-4xl font-bold'>Hi, I'm {data.name}</h2>
              <p className='text-sm text-muted-foreground text-justify'>
                {data.about}
              </p>
              <a href=''>
                <Button variant={"outline"} className='cursor-pointer'>
                  <FileText />
                  Resume
                </Button>
              </a>
            </div>
          </div>
          <div className='md:col-span-1'>
            <AspectRatio ratio={1 / 1} className='bg-muted rounded-lg'>
              <Image
                src={file}
                alt='profile image'
                fill
                className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
              />
            </AspectRatio>
          </div>
        </div>
      )}
      <ExperienceSection />
      <SkillSection />
    </div>
  );
}
