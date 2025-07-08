import { databases } from "@/app/appwrite";
import { Query } from "appwrite";

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
