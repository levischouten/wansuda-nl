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

  const [content, features] = await Promise.all([
    reader.collections.content.all(),
    reader.collections.features.all(),
  ]);

  const items = [
    {
      label: "Welkom",
      href: "/",
    },
    ...features.map((feature) => ({
      label: feature.entry.title || "",
      href: feature.slug,
      items: [
        {
          label: feature.entry.title || "",
          description: feature.entry.description,
          href: "",
        },
        ...feature.entry.items.map((item) => ({
          label: item.title.name,
          description: item.description,
          href: item.title.slug,
        })),
      ],
    })),
    ...content.map((entry) => ({
      label: entry.entry.title || "",
      href: entry.slug,
    })),
  ];

  return (
    <>
      <Header items={items} />
      {children}
      <Footer items={items} />
    </>
  );
}
