import { account, databases } from "@/app/appwrite";
import { Query } from "appwrite";
import z from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: "Name should not be empty" }).max(50),
  subheadline: z
    .string()
    .min(1, { message: "Subheadline should not be empty" })
    .max(150),
  about: z.string().min(1, { message: "About should not be empty" }).max(500),
  todo: z.string().min(1, { message: "Todo should not be empty" }).max(100),
  image: z.string().min(1, { message: "Image should not be empty" }),
  logo: z.string().min(1, { message: "Logo should not be empty" }),
  logoFile: z.instanceof(File).optional(),
  imageFile: z.instanceof(File).optional(),
});

export const getUser = async () => {
  return await account.get();
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = async (data: z.infer<typeof LoginSchema>) => {
  return await account.createEmailPasswordSession(data.email, data.password);
};

export const logout = async () => {
  return await account.deleteSession("current");
};

export const getUsersProfile = async () => {
  return await databases
    .listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
      [Query.limit(1)]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getUserProfile = async () => {
  const users = await getUsersProfile();

  if (!users || users.length === 0) {
    return null;
  }

  const res = await databases
    .getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
      users[0].$id
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });

  return res;
};

export const updateUserProfile = async (
  documentId: string,
  data: z.infer<typeof ProfileSchema>
) => {
  const { imageFile, logoFile, ...payload } = data;

  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
    documentId,
    payload
  );
};
