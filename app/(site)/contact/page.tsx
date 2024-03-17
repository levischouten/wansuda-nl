import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ResolvingMetadata } from "next";

export async function generateMetadata({}, parent: ResolvingMetadata) {
  const rootMetadata = await parent;

  return {
    title: `${rootMetadata.title?.absolute} - Contact`,
  };
}

export default async function Contact() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const contact = await reader.singletons.contact.read();

  if (!contact) {
    return null;
  }

  return (
    <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
      <section className="">
        <div className="prose-sm md:prose mx-auto">
          <DocumentRenderer document={await contact.content()} />
        </div>
      </section>
    </main>
  );
}
