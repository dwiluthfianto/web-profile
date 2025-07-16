import {
  createProject,
  deleteProject,
  getListProject,
  getProjectDetail,
  ProjectSchema,
  updateProject,
} from "@/lib/services/project.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const useListProject = (limit: number) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-project", limit],
    queryFn: () => getListProject(limit),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useProjectDetail = (slug: string) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["project-detail", slug],
    queryFn: () => getProjectDetail(slug),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useProjectMutations = () => {
  const queryClient = useQueryClient();
  const createProjectMutation = useMutation({
    mutationFn: async (data: z.infer<typeof ProjectSchema>) => {
      return await createProject(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-project"] });
      toast.success("Project successfully added!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: z.infer<typeof ProjectSchema>;
    }) => {
      return await updateProject(documentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-project"] });
      toast.success("Project successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteProject(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-project"] });
      toast.success("Project successfully deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
  };
};
