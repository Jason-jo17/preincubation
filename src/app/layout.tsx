import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Super App | Pre-Incubation Platform",
  description: "Unified platform for pre-incubation and MSME intelligence.",
};

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="h-screen bg-bg-base text-text-primary flex selection:bg-accent/30 selection:text-accent overflow-hidden" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto relative custom-scrollbar overflow-x-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--color-accent-muted),transparent_50%)] pointer-events-none" />
              <div className="relative z-10 min-h-full">
                {children}
              </div>
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
