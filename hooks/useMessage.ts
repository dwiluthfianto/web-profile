import { ContactSchema, createMessage } from "@/lib/services/message.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";

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
  });

  return {
    createMessageMutation,
  };
};
