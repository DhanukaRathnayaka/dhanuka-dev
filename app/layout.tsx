
import type React from "react";
import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "../hero.css";
import Navbar from "@/components/navbar";
import SocialSidebar from "@/components/social-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dhnauka Rathnayaka",
  icons: {
    icon: 'https://ncmttztvfuwnkyuekrvv.supabase.co/storage/v1/object/public/portfolio/yyy.png', // must be inside /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <SocialSidebar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
