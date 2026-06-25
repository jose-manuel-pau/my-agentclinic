import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="auth-layout container">
      <article className="auth-panel">
        <header>
          <p className="dashboard-eyebrow">Secure access</p>
          <h1>Sign in to AgentClinic</h1>
          <p>Use the demo agent or staff credentials to open the role-aware workspace.</p>
        </header>
        <LoginForm />
        <footer>
          <small>
            Agent: agent@agentclinic.local / agent-demo
            <br />
            Staff: staff@agentclinic.local / staff-demo
          </small>
        </footer>
      </article>
    </main>
  );
}
