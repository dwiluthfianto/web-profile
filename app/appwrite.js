import { Client, Account, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_API_ENDPOINT) // Replace with your Appwrite endpoint
  .setProject(process.env.APPWRITE_PROJECT_ID); // Replace with your project ID

export const databases = new Databases(client);
export const account = new Account(client);
export { ID } from "appwrite";
