import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type FeaturesProps = Entry<
  (typeof keystaticConfig)["collections"]["features"]
>;

export default async function Features(props: FeaturesProps) {
  return (
    <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
      <section className="flex justify-center">
        <div className="prose text-center">
          <DocumentRenderer document={await props.header()} />
        </div>
      </section>

      <div className="space-y-28">
        {await Promise.all(
          props.items.map(async (item) => (
            <section
              key={item.title.slug}
              id={item.title.slug}
              className="flex gap-16 flex-col items-center lg:items-start max-w-screen-sm lg:max-w-full mx-auto even:lg:flex-row-reverse lg:flex-row"
            >
              <div className="space-y-2">
                <div className="prose prose-h2:mt-0 prose-h2:text-3xl">
                  <DocumentRenderer document={await item.content()} />
                </div>
                <Link
                  href="/contact"
                  className="flex gap-2 items-center text-primary"
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
