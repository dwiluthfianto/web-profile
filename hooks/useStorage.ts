import { createFile, getFileView } from "@/lib/services/storage.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFileView = (fileId: string) => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["file-view", fileId],
    queryFn: () => getFileView(fileId),
    enabled: !!fileId,
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useFileMutations = () => {
  const createFileMutation = useMutation({
    mutationFn: async (file: File) => {
      return await createFile(file);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createFileMutation,
  };
};
