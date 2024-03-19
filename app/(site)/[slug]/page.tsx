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
      <main className="mx-auto max-w-screen-lg space-y-20 px-8 pt-16 lg:space-y-40 lg:pt-40">
        <section>
          <div className="prose prose-sm mx-auto md:prose md:prose-base">
            <DocumentRenderer document={await content.content()} />
          </div>
        </section>
      </main>
    );
  }

  if (features) {
    return (
      <main className="mx-auto max-w-screen-lg space-y-20 px-8 pt-16 lg:space-y-40 lg:pt-40">
        <section className="flex justify-center">
          <div className="prose prose-sm text-center md:prose md:prose-base">
            <DocumentRenderer document={await features.header()} />
          </div>
        </section>

        <div className="space-y-28">
          {await Promise.all(
            features.items.map(async (item) => (
              <section
                key={item.title.slug}
                id={item.title.slug}
                className="mx-auto flex max-w-screen-sm flex-col items-center gap-16 py-8 lg:max-w-full lg:flex-row lg:items-start even:lg:flex-row-reverse"
              >
                <div className="space-y-2">
                  <div className="prose prose-sm md:prose md:prose-base prose-h2:mt-0 prose-h2:text-2xl md:prose-h2:text-3xl">
                    <DocumentRenderer document={await item.content()} />
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 font-semibold text-primary"
                  >
                    Boek nu <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
                <Image
                  src={item.image || ""}
                  width={400}
                  height={400}
                  alt="Course image"
                  className="aspect-square max-h-[400px] w-full rounded-lg object-cover lg:w-[400px]"
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
