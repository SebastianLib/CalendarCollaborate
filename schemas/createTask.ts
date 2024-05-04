import { z } from "zod";

export const CreateTaskSchema = z.object({
    name: z.string().min(2).max(50),
    date: z.date({
      required_error: "A date is required.",
    }),
    description: z.string().max(1000).optional(),
    startingHour: z.string(),
    endingHour: z.string(),
    color: z.string(),
    type: z.string(),
    team: z.string().optional(),
  });

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>