import { ID, storage } from "@/app/appwrite";
import { Permission, Role } from "appwrite";

export const getFileView = async (fileId: string) => {
  return storage.getFileView(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
    fileId
  );
};

export const createFile = async (file: File) => {
  return await storage.createFile(
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
    ID.unique(),
    file,
    []
  );
};
