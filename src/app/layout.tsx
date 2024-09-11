// GLOBAL
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// NEXT
import { ThemeProvider } from "@/components/ui/providers/theme-providers";

// CLERK
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion",
  description: "The connected workspace where better, faster work happens"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="notion-theme-2"
          >
            {children}
          </ThemeProvider>
        </body>
        <head>
          <link
            rel="icon"
            href="/notion.png"
            media="(prefers-color-scheme: light)"
            type="image/png"
            sizes="any"
          />
          <link
            rel="icon"
            href="/notion-dark.png"
            media="(prefers-color-scheme: dark)"
            type="image/png"
            sizes="any"
          />
        </head>
      </html>
    </ClerkProvider>
  );
}
