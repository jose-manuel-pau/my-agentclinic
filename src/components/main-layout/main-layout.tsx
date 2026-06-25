import { MainLayoutFooter } from "./footer";
import { MainLayoutHeader } from "./header";
import styles from "./main-layout.module.css";

type MainLayoutProps = {
  children: React.ReactNode;
};

type MainLayoutMainProps = {
  children: React.ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.shell}>
      <MainLayoutHeader />
      <MainLayoutMain>{children}</MainLayoutMain>
      <MainLayoutFooter />
    </div>
  );
}

export function MainLayoutMain({ children }: MainLayoutMainProps) {
  return <main className={styles.main}>{children}</main>;
}
