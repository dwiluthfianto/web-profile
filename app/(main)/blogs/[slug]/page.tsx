"use client";
import { ReadOnlyViewer } from "@/components/blocks/editor-00/readonly-viewer";
import { useBlogDetail } from "@/hooks/useBlog";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();

  const { data, isPending } = useBlogDetail(params.slug);

  return (
    <div className='p-4 space-y-8'>
      {isPending ? (
        <div className='space-y-8'>
          <Skeleton className='h-12 w-2/3 animate-pulse' />
          <div className='space-y-4 pt-4'>
            <Skeleton className='h-5 w-full animate-pulse' />
            <Skeleton className='h-5 w-full animate-pulse' />
            <Skeleton className='h-5 w-5/6 animate-pulse' />
            <Skeleton className='h-5 w-4/5 animate-pulse' />
          </div>
        </div>
      ) : data ? (
        <div className='space-y-8 animate-fade-in'>
          <h1 className='text-5xl font-bold'>{data.title}</h1>
          <ReadOnlyViewer editorSerializedState={JSON.parse(data.content)} />
        </div>
      ) : (
        <h1 className='text-center text-muted-foreground'>Blog not found</h1>
      )}
    </div>
  );
}
