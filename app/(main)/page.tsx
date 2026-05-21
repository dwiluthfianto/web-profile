"use client";
import { ProjectSection } from "@/components/section/project-section";
import { useUserProfile } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomePage() {
  const { data, isPending } = useUserProfile();

  return (
    <div className='p-4 space-y-8'>
      {isPending ? (
        <div className='space-y-4'>
          <Skeleton className='h-16 w-3/4' />
          <Skeleton className='h-8 w-1/2' />
          <div className='h-8' />
          <Skeleton className='h-8 w-2/3' />
        </div>
      ) : (
        <div className='space-y-4 animate-fade-in'>
          <h1 className='text-6xl font-bold'>Hi, I'm {data?.name}</h1>
          <span className='text-2xl'>{data?.subheadline}</span>
          <br />
          <br />
          <span className='text-2xl'>{data?.todo}</span>
        </div>
      )}
      <ProjectSection />
    </div>
  );
}
