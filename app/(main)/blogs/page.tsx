import { databases } from "@/app/appwrite";
import { BlogSection } from "@/components/section/blog-section";
import { HeaderImage } from "@/components/section/project-section";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Query } from "appwrite";

export default async function BlogsPage() {
  let res = await databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PROJECT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
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
