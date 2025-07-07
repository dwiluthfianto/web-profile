import { databases } from "@/app/appwrite";
import { ExperienceSection } from "@/components/section/experience-section";
import { SkillSection } from "@/components/section/skill-section";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Image from "next/image";

export default async function AboutPage() {
  let res = await databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PROFILE_COLLECTION_ID!,
      []
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-muted-foreground'>/</span>about
          <span className='text-muted-foreground'>.</span>
        </h1>
        {/* <p className='text-center text-muted-foreground'>
          A collection of projects I've worked on.
        </p> */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='md:col-span-2'>
          <div className='space-y-2'>
            <h2 className='text-4xl font-bold'>Hi, I'm {res?.[0].name}</h2>
            <p className='text-sm text-muted-foreground text-justify'>
              {res?.[0].about}
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
              src={res?.[0].image}
              alt='profile image'
              fill
              className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </AspectRatio>
        </div>
      </div>
      <ExperienceSection />
      <SkillSection />
    </div>
  );
}
