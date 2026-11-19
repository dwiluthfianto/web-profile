import {
  createProjectAction,
  deleteProjectAction,
  getProjectDetailAction,
  listProjectsAction,
  updateProjectAction,
} from "@/lib/neon.actions";
import z from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Title should not be empty" }).max(50),
  description: z
    .string()
    .min(1, { message: "Description should not be empty" })
    .max(150),
  link: z.string().min(1, { message: "Link should not be empty" }),
  slug: z.string().min(1, { message: "Slug should not be empty" }).max(200),
  image: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
});

export const getListProject = async (limit: number) => {
  return await listProjectsAction(limit);
};

export const createProject = async (data: z.infer<typeof ProjectSchema>) => {
  const { imageFile, ...payload } = data;
  await createProjectAction(payload);
};

export const updateProject = async (
  documentId: string,
  data: z.infer<typeof ProjectSchema>
) => {
  const { imageFile, ...payload } = data;
  await updateProjectAction(documentId, payload);
};

export const deleteProject = async (documentId: string) => {
  await deleteProjectAction(documentId);
};

export const getProjectDetail = async (slug: string) => {
  return await getProjectDetailAction(slug);
};
