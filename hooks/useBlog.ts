import {
  BlogSchema,
  createBlog,
  deleteBlog,
  getBlogDetail,
  getListBlog,
  updateBlog,
} from "@/lib/services/blog.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

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

export const useBlogDetail = (documentId: string) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["blog-detail", documentId],
    queryFn: () => getBlogDetail(documentId),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useBlogMutations = () => {
  const queryClient = useQueryClient();
  const createBlogMutation = useMutation({
    mutationFn: async (data: z.infer<typeof BlogSchema>) => {
      return await createBlog(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-blog"] });
      toast.success("Blog successfully added!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: z.infer<typeof BlogSchema>;
    }) => {
      return await updateBlog(documentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-blog"] });
      toast.success("Blog successfully updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: async (documentId: string) => {
      return await deleteBlog(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["list-blog"] });
      toast.success("Blog successfully deleted!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createBlogMutation,
    updateBlogMutation,
    deleteBlogMutation,
  };
};
