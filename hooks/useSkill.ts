import {
  createSkill,
  deleteSkill,
  getListSkill,
  getSkillDetail,
  SkillSchema,
  updateSkill,
} from "@/lib/services/skill.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const useListSkill = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-skill"],
    queryFn: () => getListSkill(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useSkillDetail = (documentId: string) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-skill", documentId],
    queryFn: () => getSkillDetail(documentId),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useSkillMutations = () => {
  const queryClient = useQueryClient();
  const createSkillMutation = useMutation({
    mutationFn: async (data: z.infer<typeof SkillSchema>) => {
      return await createSkill(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-skill"] });
      toast.success("Skill successfully added!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateSkillMutation = useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: z.infer<typeof SkillSchema>;
    }) => {
      return await updateSkill(documentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-skill"] });
      toast.success("Skill successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteSkillMutation = useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteSkill(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-skill"] });
      toast.success("Skill successfully deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createSkillMutation,
    updateSkillMutation,
    deleteSkillMutation,
  };
};
