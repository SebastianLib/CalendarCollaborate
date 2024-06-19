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
    people: z.array(z.object({
      id: z.string(),
      clerkId: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      username: z.string(),
      email: z.string(),
      photo: z.string(),
  })).nonempty().optional(),
  });

export type CreateTaskSchemaType = z.infer<typeof CreateTaskSchema>