import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Cursussen() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const coursespage = await reader.singletons.coursespage.read();
  const courses = await reader.collections.courses.all();

  if (!coursespage) {
    return null;
  }

  return (
    <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
      <section className="flex justify-center">
        <div className="prose text-center">
          <DocumentRenderer document={await coursespage?.headerText()} />
        </div>
      </section>

      <div className="space-y-28">
        {await Promise.all(
          courses.map(async (course) => (
            <section
              key={course.slug}
              id={course.slug}
              className="flex gap-16 flex-col items-center lg:items-start max-w-screen-sm lg:max-w-full mx-auto even:lg:flex-row-reverse lg:flex-row"
            >
              <div className="space-y-2">
                <div className="prose prose-h2:mt-0 prose-h2:text-3xl">
                  <DocumentRenderer document={await course.entry.content()} />
                </div>
                <Link
                  href="/contact"
                  className="flex gap-2 items-center text-primary"
                >
                  Boek nu <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <Image
                src={course.entry.image || ""}
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
