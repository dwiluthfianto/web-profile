import { databases } from "@/app/appwrite";
import { Query } from "appwrite";

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
