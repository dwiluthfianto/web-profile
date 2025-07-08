import { getListProject } from "@/lib/services/project.service";
import { useQuery } from "@tanstack/react-query";

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
