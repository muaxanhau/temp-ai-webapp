import { z } from "zod";

export const homeSchema = z.object({
  destination: z
    .string({ required_error: "destination is required" })
    .trim()
    .min(1, "destination is required"),
  startDate: z.date({ required_error: "start date is required" }),
  endDate: z.date().optional(),
});
