import {
  getUser,
  getUserProfile,
  logout,
  ProfileSchema,
  updateUserProfile,
} from "@/lib/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const useUser = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
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

export const useUserProfile = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
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

export const useUserMutations = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: z.infer<typeof ProfileSchema>;
    }) => {
      return await updateUserProfile(documentId, data);
    },
    onSuccess: () => {
      toast.success("User profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    logoutMutation,
    updateUserProfileMutation,
  };
};
