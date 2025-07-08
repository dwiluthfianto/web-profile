"use client";
import { BlogSection } from "@/components/section/blog-section";

export default function BlogsPage() {
  return (
    <div className='p-4 space-y-8'>
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
      <BlogSection />
    </div>
  );
}
