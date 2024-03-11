import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

export default async function Page({ params }: { params: { slug: string } }) {
  const reader = createReader(process.cwd(), keystaticConfig);

  const service = await reader.collections.services.read(params.slug);

  if (!service) {
    return <div>Not found</div>;
  }

  const content = await service.content();

  console.log(content);

  return (
    <main>
      {service?.title}
      <div className="prose">
        <DocumentRenderer document={await service.content()} />
      </div>
    </main>
  );
}
