import { describe, expect, it } from "vitest";
import { feedbackInputSchema } from "../src/lib/feedback";

describe("feedback validation", () => {
  it("validates public feedback input", () => {
    const input = feedbackInputSchema.parse({
      email: " human@example.com ",
      message: "I asked my agent for one last tiny change after the demo.",
      name: " Demo Human ",
      rating: "5",
    });

    expect(input).toEqual({
      email: "human@example.com",
      message: "I asked my agent for one last tiny change after the demo.",
      name: "Demo Human",
      rating: 5,
    });
  });

  it("rejects invalid ratings and short messages", () => {
    expect(() =>
      feedbackInputSchema.parse({
        email: "human@example.com",
        message: "Too short",
        name: "Demo Human",
        rating: "6",
      }),
    ).toThrow();
  });
});
