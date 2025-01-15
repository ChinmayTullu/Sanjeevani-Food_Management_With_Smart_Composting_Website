"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { UserProvider } from "@/providers/UserProvider";
import { AssignmentProvider } from "@/contexts/AssignmentContext";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Sanjeevni",
  description: "Hypertext Assasins",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <link rel="icon" href="../public/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} w-full h-screen overflow-auto`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AssignmentProvider>
              {children}
            </AssignmentProvider>
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
