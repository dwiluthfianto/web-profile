import { authClient } from "@/lib/auth/client";
import {
  getSessionUser,
  getUserProfileAction,
  updateUserProfileAction,
} from "@/lib/neon.actions";
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
  try {
    // Runs on browser: exchanges ?neon_auth_session_verifier on OAuth redirect & sets session cookie
    const { data } = await authClient.getSession();
    if (data?.user) {
      return { ...data.user, $id: data.user.id };
    }
  } catch {
    // Fallback to server session check
  }
  return await getSessionUser();
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const res = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });
  if (res.error) {
    throw new Error(res.error.message || "Invalid email or password");
  }
  return res.data;
};

export const logout = async () => {
  const res = await authClient.signOut();
  if (res.error) {
    throw new Error(res.error.message || "Failed to sign out");
  }
  return res.data;
};

export const getUsersProfile = async () => {
  const profile = await getUserProfileAction();
  return profile ? [profile] : [];
};

export const getUserProfile = async () => {
  return await getUserProfileAction();
};

export const updateUserProfile = async (
  documentId: string,
  data: z.infer<typeof ProfileSchema>
) => {
  const { imageFile, logoFile, ...payload } = data;
  await updateUserProfileAction(documentId, payload);
};
