"use client";
import { BlogSection } from "@/components/section/blog-section";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  const { data: user } = useUser();
  return (
    <div className='p-4 space-y-8'>
      <div>
        <div>
          <h1 className='text-4xl font-bold text-center'>
            <span className='text-muted-foreground'>/</span>blogs
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-center text-muted-foreground'>
            This is where I write whatever I want, <br />
            software engineering, life, and other things.
          </p>
        </div>
        {user && (
          <div className='flex justify-end'>
            <Button asChild>
              <Link href='/blogs/create'>
                <Plus /> New Blog
              </Link>
            </Button>
          </div>
        )}
      </div>
      <BlogSection />
    </div>
  );
}
