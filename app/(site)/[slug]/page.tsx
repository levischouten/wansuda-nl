import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ArrowRightIcon } from "lucide-react";
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
  parent: ResolvingMetadata
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
      <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
        <section className="">
          <div className="prose-sm md:prose mx-auto">
            <DocumentRenderer document={await content.content()} />
          </div>
        </section>
      </main>
    );
  }

  if (features) {
    return (
      <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
        <section className="flex justify-center">
          <div className="prose-sm md:prose text-center">
            <DocumentRenderer document={await features.header()} />
          </div>
        </section>

        <div className="space-y-28">
          {await Promise.all(
            features.items.map(async (item) => (
              <section
                key={item.title.slug}
                id={item.title.slug}
                className="flex gap-16 flex-col items-center lg:items-start max-w-screen-sm lg:max-w-full mx-auto even:lg:flex-row-reverse lg:flex-row"
              >
                <div className="space-y-2">
                  <div className="prose-sm md:prose prose-h2:mt-0 prose-h2:text-2xl prose-h2:font-semibold md:prose-h2:text-3xl">
                    <DocumentRenderer document={await item.content()} />
                  </div>
                  <Link
                    href="/contact"
                    className="flex gap-2 items-center text-primary font-semibold"
                  >
                    Boek nu <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
                <Image
                  src={item.image || ""}
                  width={400}
                  height={400}
                  alt="Course image"
                  className="object-cover w-full lg:w-[400px] rounded-lg aspect-square max-h-[400px]"
                />
              </section>
            ))
          )}
        </div>
      </main>
    );
  }

  return notFound();
}
