import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";

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
    <>
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
      <Footer />
    </>
  );
}
