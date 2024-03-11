import "../globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { Header } from "@/components/shared/header";

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reader = createReader(process.cwd(), keystaticConfig);

  const settings = await reader.singletons.settings.read();

  const services = await reader.collections.services.all();
  const courses = await reader.collections.courses.all();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Header
          courses={courses.map((course) => ({
            title: course.entry.title,
            description: course.entry.description,
            slug: course.slug,
          }))}
          services={services.map((service) => ({
            title: service.entry.title,
            description: service.entry.description,
            slug: service.slug,
          }))}
        />
        {children}
      </body>
    </html>
  );
}
