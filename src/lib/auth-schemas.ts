import { z } from "zod";

export const loginCredentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1, "Password is required."),
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
