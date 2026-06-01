import { ContactSchema, createMessage, getListMessage } from "@/lib/services/message.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

export const useListMessage = () => {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["list-message"],
    queryFn: () => getListMessage(),
  });

  return {
    isPending,
    error,
    data,
    refetch,
  };
};

export const useMessageMutations = () => {
  const createMessageMutation = useMutation({
    mutationFn: async (data: z.infer<typeof ContactSchema>) => {
      return await createMessage(data);
    },
    onSuccess: () => {
      toast.success("Message has successfully sent", {
        description: "Please wait for the response, Thank you.",
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    createMessageMutation,
  };
};
