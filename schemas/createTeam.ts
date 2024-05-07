import { z } from "zod";
export const CreateTeamSchema = z.object({
    name: z.string().min(2).max(50),
    people: z.array(z.object({
      id: z.string(),
      clerkId: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      username: z.string(),
      email: z.string(),
      photo: z.string(),
  })).nonempty(),
  });

export type CreateTeamSchemaType = z.infer<typeof CreateTeamSchema>