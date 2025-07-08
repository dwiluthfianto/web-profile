import { getListExperience } from "@/lib/services/experience.service";
import { useQuery } from "@tanstack/react-query";

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
