import Link from "next/link";
import type { ReactNode } from "react";
import type { UserRole } from "../lib/roles";

type DashboardShellProps = {
  actions?: ReactNode;
  children: ReactNode;
  description: string;
  role: UserRole;
  title: string;
};

export function DashboardShell({
  actions,
  children,
  description,
  role,
  title,
}: DashboardShellProps) {
  return (
    <main className="dashboard-layout container">
      <nav aria-label={`${role} dashboard navigation`} className="dashboard-nav">
        <ul>
          <li>
            <strong>AgentClinic</strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href={`/dashboard/${role}`}>Dashboard</Link>
          </li>
          {role === "agent" ? (
            <li>
              <Link href="/dashboard/agent/profile">Profile</Link>
            </li>
          ) : null}
          <li>
            <Link href="/api/auth/signout">Sign out</Link>
          </li>
        </ul>
      </nav>

      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">{role} workspace</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {actions ? <div className="dashboard-actions">{actions}</div> : null}
      </header>

      <section className="dashboard-grid">{children}</section>
    </main>
  );
}
