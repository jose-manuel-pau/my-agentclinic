"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { loginCredentialsSchema } from "../../lib/auth-schemas";

type LoginState = {
  error: string;
  isSubmitting: boolean;
};

export function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>({
    error: "",
    isSubmitting: false,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ error: "", isSubmitting: true });

    const formData = new FormData(event.currentTarget);
    const parsedCredentials = loginCredentialsSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!parsedCredentials.success) {
      setState({ error: "Enter a valid email and password.", isSubmitting: false });
      return;
    }

    const result = await signIn("credentials", {
      ...parsedCredentials.data,
      redirect: false,
    });

    if (!result?.ok) {
      setState({ error: "The credentials were not accepted.", isSubmitting: false });
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          autoComplete="email"
          defaultValue="agent@agentclinic.local"
          id="email"
          name="email"
          required
          type="email"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          autoComplete="current-password"
          defaultValue="agent-demo"
          id="password"
          name="password"
          required
          type="password"
        />
      </label>
      {state.error ? <p role="alert">{state.error}</p> : null}
      <button aria-busy={state.isSubmitting} disabled={state.isSubmitting} type="submit">
        Sign in
      </button>
    </form>
  );
}
