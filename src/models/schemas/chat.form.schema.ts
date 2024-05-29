import { z } from "zod";

export const chatFormSchema = z.object({
  chatText: z
    .string({ required_error: "chat is required" })
    .trim()
    .min(1, "chat is required"),
});
