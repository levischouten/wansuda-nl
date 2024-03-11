import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Icon from "@/components/ui/icon";

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const homepage = await reader.singletons.homepage.read();

  if (!homepage) {
    return null;
  }

  return (
    <main className="max-w-screen-lg mx-auto px-8 pt-16 lg:pt-40 space-y-28 lg:space-y-40">
      <section className="flex flex-col lg:flex-row items-start gap-12 lg:justify-between max-w-md lg:max-w-full mx-auto">
        <div className="max-w-md">
          <div className="prose">
            <DocumentRenderer document={await homepage?.heroText()} />
          </div>
          <div className="space-x-2">
            <Button asChild>
              <Link href="/services">Bekijk behandelingen</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/services">
                Lees meer <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={homepage.heroImage!}
          alt="hero image"
          width={400}
          height={400}
          className="object-cover w-[400px] h-[400px] rounded-lg aspect-square"
        />
      </section>

      <section className="flex flex-col items-center gap-8">
        <div className="max-w-xl text-center">
          <div className="prose prose-h2:my-2 prose-h2:text-base prose-h2:text-primary prose-h3:text-3xl prose-h3:my-2">
            <DocumentRenderer document={await homepage?.featureText()} />
          </div>
        </div>
        <div className="max-w-3xl">
          <ul className="flex flex-col md:flex-row gap-12">
            {homepage.features?.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <div className="p-2 self-start bg-primary text-primary-foreground rounded-lg">
                  <Icon name={feature.icon} className="w-5 h-5" />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-4">
                    <p className="font-bold">{feature.title}</p>
                    <p className="prose">{feature.description}</p>
                  </div>
                  <Link
                    href={feature.href}
                    className="flex gap-2 items-center text-sm text-primary md:pt-4"
                  >
                    Lees meer
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row items-start justify-between gap-20 max-w-xl lg:max-w-none mx-auto lg:mx-0">
        <div className="relative w-full h-[300px] lg:h-[400px] lg:w-[400px]">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-primary via-primary/90 to-primary/50 rounded-lg">
            <div className="prose prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-h4:text-primary-foreground prose-h4:text-2xl absolute bottom-0 p-4 prose-h4:font-bold">
              <DocumentRenderer document={await homepage?.contentImageText()} />
            </div>
          </div>
          <Image
            src={homepage.contentImage!}
            alt="hero image"
            width={500}
            height={500}
            className="object-cover rounded-lg w-full h-full block"
          />
        </div>
        <div className="max-w-lg">
          <div className="prose prose-h2:my-2 prose-h2: prose-h2:text-base prose-h2:text-primary prose-h3:text-3xl prose-h3:my-2 prose-p:my-0 prose-p:py-3">
            <DocumentRenderer document={await homepage?.contentText()} />
          </div>
          <Link
            href="/services"
            className="flex gap-2 items-center text-primary font-semibold"
          >
            Lees meer over onze diensten
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
