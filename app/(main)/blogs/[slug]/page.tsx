import { BlogDetailView } from "@/components/blog-detail-view";
import { getBlogDetailAction } from "@/lib/neon.actions";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogDetailAction(slug);
    if (blog) {
      return {
        title: blog.title,
        description: blog.description,
        openGraph: {
          title: blog.title,
          description: blog.description,
          type: "article",
          publishedTime: blog.$createdAt,
        },
        twitter: {
          card: "summary_large_image",
          title: blog.title,
          description: blog.description,
        },
      };
    }
  } catch {
    // Fallback metadata
  }
  return {
    title: "Article",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let initialBlog = null;
  try {
    initialBlog = await getBlogDetailAction(slug);
  } catch {
    // Client hook will retry if needed
  }

  return <BlogDetailView slug={slug} initialBlog={initialBlog} />;
}
