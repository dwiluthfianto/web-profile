import {
  createExperienceAction,
  deleteExperienceAction,
  getExperienceDetailAction,
  listExperiencesAction,
  updateExperienceAction,
} from "@/lib/neon.actions";
import z from "zod";

export const ExperienceSchema = z.object({
  title: z.string().min(1, "Title should not be empty").max(50),
  company: z.string().min(1, "Title should not be empty").max(50),
  employmentType: z.enum([
    "Full-time",
    "Part-time",
    "Freelance",
    "Internship",
    "Contract",
  ]),
  description: z.string().min(1, "Title should not be empty").max(500),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const getListExperience = async () => {
  return await listExperiencesAction();
};

export const getExperienceDetail = async (documentId: string) => {
  return await getExperienceDetailAction(documentId);
};

export const createExperience = async (
  data: z.infer<typeof ExperienceSchema>
) => {
  return await createExperienceAction(data);
};

export const updateExperience = async (
  documentId: string,
  data: z.infer<typeof ExperienceSchema>
) => {
  return await updateExperienceAction(documentId, data);
};

export const deleteExperience = async (documentId: string) => {
  return await deleteExperienceAction(documentId);
};
