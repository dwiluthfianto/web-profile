import { databases } from "@/app/appwrite";
import { ID, Query } from "appwrite";
import z from "zod";

export const ExperienceSchema = z.object({
  title: z.string().min(1, "Title should not be empty").max(50),
  company: z.string().min(1, "Title should not be empty").max(50),
  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Freelance",
    "Internship",
    "Contract",
  ]),
  description: z.string().min(1, "Title should not be empty").max(500),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const getListExperience = async () => {
  let res = await databases
    .listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID!,
      [Query.orderDesc("startDate")]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

  return res;
};

export const getExperienceDetail = async (documentId: string) => {
  let res = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID!,
    documentId
  );

  return res;
};

export const createExperience = async (
  data: z.infer<typeof ExperienceSchema>
) => {
  return await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID!,
    ID.unique(),
    data
  );
};
export const updateExperience = async (
  documentId: string,
  data: z.infer<typeof ExperienceSchema>
) => {
  return await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID!,
    documentId,
    data
  );
};
export const deleteExperience = async (documentId: string) => {
  return await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCE_COLLECTION_ID!,
    documentId
  );
};
