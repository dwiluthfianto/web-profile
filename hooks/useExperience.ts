import {
  createExperience,
  deleteExperience,
  ExperienceSchema,
  getExperienceDetail,
  getListExperience,
  updateExperience,
} from "@/lib/services/experience.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const useListExperience = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-experience"],
    queryFn: () => getListExperience(),
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

export const useExperienceDetail = (documentId: string) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-experience", documentId],
    queryFn: () => getExperienceDetail(documentId),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useExperienceMutations = () => {
  const queryClient = useQueryClient();
  const createExperienceMutation = useMutation({
    mutationFn: async (data: z.infer<typeof ExperienceSchema>) => {
      return await createExperience(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-experience"] });
      toast.success("Experience successfully added!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateExperienceMutation = useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: z.infer<typeof ExperienceSchema>;
    }) => {
      return await updateExperience(documentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-experience"] });
      toast.success("Experience successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteExperienceMutation = useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteExperience(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-experience"] });
      toast.success("Experience successfully deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createExperienceMutation,
    updateExperienceMutation,
    deleteExperienceMutation,
  };
};
