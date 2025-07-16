"use client";
import { ReadOnlyViewer } from "@/components/blocks/editor-00/readonly-viewer";
import { useBlogDetail } from "@/hooks/useBlog";
import { useParams } from "next/navigation";
import React from "react";

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();

  const { data } = useBlogDetail(params.slug);

  return (
    <div className='p-4 space-y-8'>
      {data && (
        <div className='space-y-8'>
          <h1 className='text-5xl font-bold'>{data.title}</h1>
          <ReadOnlyViewer editorSerializedState={JSON.parse(data.content)} />
        </div>
      )}
    </div>
  );
}
