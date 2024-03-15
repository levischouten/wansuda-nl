import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";

export default async function Contact() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const contact = await reader.singletons.contact.read();

  if (!contact) {
    return null;
  }

  return (
    <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-20 lg:space-y-40">
      <section className="">
        <div className="prose mx-auto">
          <DocumentRenderer document={await contact.content()} />
        </div>
      </section>
    </main>
  );
}
