import { getListBlog } from "@/lib/services/blog.service";
import { useQuery } from "@tanstack/react-query";

export const useListBlog = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-blog"],
    queryFn: () => getListBlog(),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};
