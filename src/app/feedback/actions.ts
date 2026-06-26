"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createFeedbackSubmission, feedbackInputSchema } from "../../lib/feedback";

export type FeedbackFormState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "message" | "name" | "rating", string>>;
  success?: string;
};

function getValidationErrors(error: z.ZodError): FeedbackFormState {
  const fieldErrors: FeedbackFormState["fieldErrors"] = {};

  for (const issue of error.issues) {
    const fieldName = issue.path[0];

    if (
      typeof fieldName === "string" &&
      ["email", "message", "name", "rating"].includes(fieldName) &&
      !fieldErrors[fieldName as keyof NonNullable<FeedbackFormState["fieldErrors"]>]
    ) {
      fieldErrors[fieldName as keyof NonNullable<FeedbackFormState["fieldErrors"]>] = issue.message;
    }
  }

  return {
    error: "Check the feedback details and try again.",
    fieldErrors,
  };
}

export async function submitFeedbackAction(
  _previousState: FeedbackFormState,
  formData: FormData,
): Promise<FeedbackFormState> {
  const parsedFeedback = feedbackInputSchema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
    name: formData.get("name"),
    rating: formData.get("rating"),
  });

  if (!parsedFeedback.success) {
    return getValidationErrors(parsedFeedback.error);
  }

  try {
    await createFeedbackSubmission(parsedFeedback.data);
    revalidatePath("/feedback");

    return {
      success:
        "Feedback received. Your agent has been offered a warm blanket and a lint-free stack trace.",
    };
  } catch {
    return {
      error: "The clinic intake desk jammed. Please try again.",
    };
  }
}
