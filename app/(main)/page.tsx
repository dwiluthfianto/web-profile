"use client";
import { ProjectSection } from "@/components/section/project-section";
import { useUserProfile } from "@/hooks/useUser";

export default function HomePage() {
  const { data, isPending } = useUserProfile();

  return (
    <div className='p-4 space-y-8'>
      {!isPending && (
        <>
          <div className='space-y-4'>
            <h1 className='text-6xl font-bold'>Hi, I'm {data?.name}</h1>
            <span className='text-2xl'>{data?.subheadline}</span>
            <br />
            <br />
            <span className='text-2xl'>{data?.todo}</span>
          </div>
          <ProjectSection />
        </>
      )}
    </div>
  );
}
