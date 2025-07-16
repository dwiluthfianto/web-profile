import { databases } from "@/app/appwrite";
import { ID, Query } from "appwrite";
import z from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Title should not be empty" }).max(50),
  description: z
    .string()
    .min(1, { message: "Description should not be empty" })
    .max(150),
  link: z.string().min(1, { message: "Link should not be empty" }),
  slug: z.string().min(1, { message: "Slug should not be empty" }).max(200),
  image: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export const getListProject = async (limit: number) => {
  let res = await databases
    .listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

  return res;
};

export const createProject = async (data: z.infer<typeof ProjectSchema>) => {
  const { imageFile, ...payload } = data;
  await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
    ID.unique(),
    payload
  );
};

export const updateProject = async (
  documentId: string,
  data: z.infer<typeof ProjectSchema>
) => {
  const { imageFile, ...payload } = data;
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
    documentId,
    payload
  );
};

export const deleteProject = async (documentId: string) => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
    documentId
  );
};

export const getProjectDetail = async (slug: string) => {
  const res = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!,
    [Query.equal("slug", [slug])]
  );

  return res.documents[0];
};
