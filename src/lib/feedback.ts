import { z } from "zod";
import { getPrismaClient } from "./prisma";

export const feedbackInputSchema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(1200),
  name: z.string().trim().min(2).max(120),
  rating: z.coerce.number().int().min(1).max(5),
});

export type FeedbackInput = z.infer<typeof feedbackInputSchema>;

export type PublicFeedbackSubmission = {
  createdAt: Date;
  id: string;
  message: string;
  name: string;
  rating: number;
};

export async function createFeedbackSubmission(input: FeedbackInput) {
  const feedback = feedbackInputSchema.parse(input);

  return getPrismaClient().feedbackSubmission.create({
    data: feedback,
    select: {
      id: true,
    },
  });
}

export function listPublicFeedbackSubmissions(): Promise<PublicFeedbackSubmission[]> {
  return getPrismaClient().feedbackSubmission.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      createdAt: true,
      id: true,
      message: true,
      name: true,
      rating: true,
    },
  });
}
