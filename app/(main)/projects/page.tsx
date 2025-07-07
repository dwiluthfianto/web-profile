import { databases } from "@/app/appwrite";
import { HeaderImage } from "@/components/section/project-section";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Query } from "appwrite";

export default async function ProjectsPage() {
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

  if (!res || res.length === 0) {
    return (
      <div className='p-4 space-y-8'>
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-muted-foreground'>/</span>projects
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-center text-muted-foreground'>
          A collection of projects I've worked on.
        </p>
      </div>
      <BentoGrid className='md:auto-rows-[20rem] md:grid-cols-2 mt-2'>
        {res?.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={<HeaderImage url={item.image} />}
            link={item.link}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
