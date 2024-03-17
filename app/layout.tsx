import "./globals.css";

import { Montserrat as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const fontSans = FontSans({
  weight: ["100", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Wansuda",
  description: "Thaise Massages bij Wansuda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-sm antialiased md:text-base",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
