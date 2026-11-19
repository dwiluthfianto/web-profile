import {
  createBlogAction,
  deleteBlogAction,
  getBlogDetailAction,
  listBlogsAction,
  updateBlogAction,
} from "@/lib/neon.actions";
import z from "zod";

export const BlogSchema = z.object({
  title: z.string().min(1, { message: "Title should not be empty" }).max(100),
  description: z
    .string()
    .min(1, { message: "Description should not be empty" })
    .max(200),
  content: z
    .string()
    .min(1, { message: "Content should not be empty" })
    .max(1073741824),
  slug: z.string().min(1, { message: "Slug should not be empty" }),
});

export const getListBlog = async () => {
  return await listBlogsAction();
};

export const createBlog = async (data: z.infer<typeof BlogSchema>) => {
  await createBlogAction(data);
};

export const updateBlog = async (
  documentId: string,
  data: z.infer<typeof BlogSchema>
) => {
  await updateBlogAction(documentId, data);
};

export const deleteBlog = async (documentId: string) => {
  await deleteBlogAction(documentId);
};

export const getBlogDetail = async (slug: string) => {
  return await getBlogDetailAction(slug);
};
