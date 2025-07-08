import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT) // Replace with your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export { ID } from "appwrite";
