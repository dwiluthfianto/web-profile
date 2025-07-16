"use client";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExperiencePage() {
  const router = useRouter();
  return (
    <div className='p-4 space-y-8'>
      <div className='flex items-center gap-6'>
        <Button onClick={() => router.back()}>
          <MoveLeft />
        </Button>
        <div>
          <h1 className='text-4xl font-bold'>
            <span className='text-muted-foreground'>/</span>experiences
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-muted-foreground'>
            Showcase your journey by adding and updating your experiences.
          </p>
        </div>
      </div>
    </div>
  );
}
