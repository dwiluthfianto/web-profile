import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

try {
  if (endpoint) {
    client.setEndpoint(endpoint);
  }
} catch (e) {
  console.error("Failed to initialize Appwrite endpoint:", e);
}

try {
  if (projectId) {
    client.setProject(projectId);
  }
} catch (e) {
  console.error("Failed to initialize Appwrite project:", e);
}

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);

export { ID } from "appwrite";
