import { databases } from "@/app/appwrite";
import { ID, Query } from "appwrite";
import z from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, { message: "Title should not be empty" }).max(100),
  description: z
    .string()
    .min(1, { message: "Description should not be empty" })
    .max(200),
  content: z
    .string()
    .min(1, { message: "Content should not be empty" })
    .max(1073741824),
  slug: z.string().min(1, { message: "Slug should not be empty" }),
});

export const getListBlog = async () => {
  const res = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
    [Query.orderDesc("$createdAt")]
  );

  return res.documents;
};

export const createBlog = async (data: z.infer<typeof BlogSchema>) => {
  await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
    ID.unique(),
    data
  );
};

export const updateBlog = async (
  documentId: string,
  data: z.infer<typeof BlogSchema>
) => {
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
    documentId,
    data
  );
};

export const deleteBlog = async (documentId: string) => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
    documentId
  );
};

export const getBlogDetail = async (slug: string) => {
  const res = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID!,
    [Query.equal("slug", [slug])]
  );

  return res.documents[0];
};
