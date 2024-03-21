import { Document } from "@/components/shared/document";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const [content, features] = await Promise.all([
    reader.collections.content.list(),
    reader.collections.features.list(),
  ]);

  const pages = [...content, ...features];

  return pages.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
) {
  const reader = createReader(process.cwd(), keystaticConfig);

  const [content, features] = await Promise.all([
    reader.collections.content.read(params.slug),
    reader.collections.features.read(params.slug),
  ]);

  const title = content?.title || features?.title;

  const rootMetadata = await parent;

  return {
    title: `${rootMetadata.title?.absolute} - ${title}`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const reader = createReader(process.cwd(), keystaticConfig);

  const [content, features] = await Promise.all([
    reader.collections.content.read(params.slug),
    reader.collections.features.read(params.slug),
  ]);

  if (content) {
    return (
      <main className="mx-auto max-w-screen-lg space-y-20 px-8 pt-8 lg:space-y-40 lg:pt-40">
        <section>
          <Document document={await content.content()} className="mx-auto" />
        </section>
      </main>
    );
  }

  if (features) {
    return (
      <main className="mx-auto max-w-screen-lg px-8 pt-8 lg:space-y-40 lg:pt-40">
        <section className="flex justify-center">
          <Document
            document={await features.header()}
            className="text-center"
          />
        </section>

        <div className="lg:space-y-28">
          {await Promise.all(
            features.items.map(async (item) => (
              <section
                key={item.title.slug}
                id={item.title.slug}
                className="mx-auto flex max-w-screen-sm flex-col items-center gap-8 py-8 pt-24 lg:max-w-full lg:flex-row lg:items-start lg:gap-16 lg:pt-8 even:lg:flex-row-reverse"
              >
                <div className="space-y-2">
                  <Document
                    document={await item.content()}
                    className="prose-h2:mt-0 prose-h2:text-2xl md:prose-h2:text-3xl"
                  />
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Boek nu →
                  </Link>
                </div>
                <Image
                  src={item.image || ""}
                  width={400}
                  height={400}
                  alt="Course image"
                  className="aspect-square rounded-lg object-cover"
                />
              </section>
            )),
          )}
        </div>
      </main>
    );
  }

  return notFound();
}
