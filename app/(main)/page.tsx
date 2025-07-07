import { ProjectSection } from "@/components/section/project-section";
import { databases } from "../appwrite";
import { Query } from "appwrite";

export default async function HomePage() {
  let res = await databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_PROFILE_COLLECTION_ID!,
      [Query.limit(1)]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <div className='p-4 space-y-8'>
      <div className='space-y-4'>
        <h1 className='text-6xl font-bold'>Hi, I'm {res?.[0].name}</h1>
        <span className='text-2xl'>{res?.[0].subheadline}</span>
        <br />
        <br />
        <span className='text-2xl'>{res?.[0].todo}</span>
      </div>
      <ProjectSection />
    </div>
  );
}
