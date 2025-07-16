import { databases } from "@/app/appwrite";
import { ID, Query } from "appwrite";
import z from "zod";

export const SkillSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(1, "Title should not be empty").max(50),
  imageFile: z.instanceof(File).optional(),
});

export const getListSkill = async () => {
  let res = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_SKILL_COLLECTION_ID!,
    [Query.orderDesc("$createdAt")]
  );

  return res.documents;
};

export const getSkillDetail = async (documentId: string) => {
  let res = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_SKILL_COLLECTION_ID!,
    documentId
  );

  return res;
};

export const createSkill = async (data: z.infer<typeof SkillSchema>) => {
  const { imageFile, ...payload } = data;
  return await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_SKILL_COLLECTION_ID!,
    ID.unique(),
    payload
  );
};
export const updateSkill = async (
  documentId: string,
  data: z.infer<typeof SkillSchema>
) => {
  const { imageFile, ...payload } = data;
  return await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_SKILL_COLLECTION_ID!,
    documentId,
    payload
  );
};
export const deleteSkill = async (documentId: string) => {
  return await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_SKILL_COLLECTION_ID!,
    documentId
  );
};
