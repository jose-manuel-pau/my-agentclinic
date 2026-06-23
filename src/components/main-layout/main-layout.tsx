import { MainLayoutFooter } from "./footer";
import { MainLayoutHeader } from "./header";
import styles from "./main-layout.module.css";

type LayoutChildren = {
  children: React.ReactNode;
};

export function MainLayout({ children }: LayoutChildren) {
  return (
    <div className={styles.shell}>
      <MainLayoutHeader />
      <MainLayoutMain>{children}</MainLayoutMain>
      <MainLayoutFooter />
    </div>
  );
}

export function MainLayoutMain({ children }: LayoutChildren) {
  return <main className={styles.main}>{children}</main>;
}
