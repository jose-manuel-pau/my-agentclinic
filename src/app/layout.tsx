import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentClinic",
  description: "AgentClinic platform",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html data-theme="light" lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
