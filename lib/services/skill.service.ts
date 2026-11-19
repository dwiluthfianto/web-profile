import {
  createSkillAction,
  deleteSkillAction,
  getSkillDetailAction,
  listSkillsAction,
  updateSkillAction,
} from "@/lib/neon.actions";
import z from "zod";

export const SkillSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(1, "Title should not be empty").max(50),
  imageFile: z.instanceof(File).optional(),
});

export const getListSkill = async () => {
  return await listSkillsAction();
};

export const getSkillDetail = async (documentId: string) => {
  return await getSkillDetailAction(documentId);
};

export const createSkill = async (data: z.infer<typeof SkillSchema>) => {
  const { imageFile, ...payload } = data;
  return await createSkillAction(payload);
};

export const updateSkill = async (
  documentId: string,
  data: z.infer<typeof SkillSchema>
) => {
  const { imageFile, ...payload } = data;
  return await updateSkillAction(documentId, payload);
};

export const deleteSkill = async (documentId: string) => {
  return await deleteSkillAction(documentId);
};
