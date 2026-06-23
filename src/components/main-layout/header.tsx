import Link from "next/link";
import styles from "./main-layout.module.css";

export function MainLayoutHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        AgentClinic
      </Link>
      <nav aria-label="Primary">
        <a className={styles.navLink} href="#get-started">
          Get Started
        </a>
      </nav>
    </header>
  );
}
