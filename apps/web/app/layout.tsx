import "./globals.css";
import { ReactNode } from "react";
import { Providers } from "../components/providers";

export const metadata = {
  title: "Aurora Automate",
  description: "AI-powered marketing automation for modern teams"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-950/5 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
