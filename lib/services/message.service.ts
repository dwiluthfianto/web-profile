import {
  createMessageAction,
  listMessagesAction,
} from "@/lib/neon.actions";
import z from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name should not be empty" }),
  businessEmail: z
    .string()
    .min(1, { message: "Business email should not be empty" })
    .email(),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number should not be empty" }),
  companyName: z.string().optional(),
  subject: z.string().min(1, { message: "Subject should not be empty" }),
  message: z.string().min(1, { message: "Message should not be empty" }),
});

export const createMessage = async (data: z.infer<typeof ContactSchema>) => {
  return await createMessageAction(data);
};

export const getListMessage = async () => {
  return await listMessagesAction();
};
