import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import keystaticConfig from "@/keystatic.config";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { ArrowRightIcon } from "lucide-react";
import { ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({}, parent: ResolvingMetadata) {
  const rootMetadata = await parent;

  return {
    title: `${rootMetadata.title?.absolute} - Welkom`,
  };
}

export default async function Home() {
  const reader = createReader(process.cwd(), keystaticConfig);

  const homepage = await reader.singletons.homepage.read();

  if (!homepage) {
    return null;
  }

  return (
    <main className="mx-auto max-w-screen-lg space-y-28 px-8 pt-16 lg:space-y-40 lg:pt-40">
      <section
        id="hero"
        className="mx-auto flex max-w-lg flex-col items-start gap-12 lg:max-w-full lg:flex-row lg:justify-between"
      >
        <div className="max-w-lg">
          <div className="prose prose-sm md:prose-base">
            <DocumentRenderer document={await homepage.heroText()} />
          </div>
          <div className="space-x-2">
            <Button asChild>
              <Link href={homepage.heroCta.href}>{homepage.heroCta.title}</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={homepage.heroSecondaryCta.href}>
                {homepage.heroSecondaryCta.title}{" "}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Image
          src={homepage.heroImage!}
          alt="hero image"
          width={400}
          height={400}
          className="aspect-square h-[400px] w-[400px] rounded-lg object-cover"
        />
      </section>

      <section id="features" className="flex flex-col items-center gap-8">
        <div className="max-w-xl text-center">
          <div className="prose prose-sm md:prose-base prose-h2:my-2 prose-h2:text-base prose-h2:text-primary prose-h3:my-2 prose-h3:text-2xl md:prose-h3:text-3xl">
            <DocumentRenderer document={await homepage.featureText()} />
          </div>
        </div>
        <div className="max-w-3xl">
          <ul className="flex flex-col gap-12 md:flex-row">
            {homepage.features?.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <div className="self-start rounded-sm bg-primary p-2 text-primary-foreground">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="space-y-4">
                    <p className="font-bold">{feature.title}</p>
                    <p className="prose">{feature.description}</p>
                  </div>
                  <Link
                    href={feature.href}
                    className="flex items-center gap-2 text-sm font-semibold text-primary md:pt-4"
                  >
                    Lees meer
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto flex max-w-xl flex-col items-start justify-between gap-20 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div className="relative h-[300px] w-full lg:h-[400px] lg:w-[400px]">
          <div className="absolute inset-0 h-full w-full rounded-lg bg-gradient-to-tr from-black/100 from-5% via-primary/80 via-80% to-primary/40">
            <div className="prose prose-sm absolute bottom-0 p-4 md:prose-base prose-h4:text-2xl prose-h4:font-bold prose-h4:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground">
              <DocumentRenderer document={await homepage.contentImageText()} />
            </div>
          </div>
          <Image
            src={homepage.contentImage!}
            alt="hero image"
            width={500}
            height={500}
            className="block h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="max-w-lg">
          <div className="prose-h2: prose prose-sm md:prose md:prose-base prose-h2:my-2 prose-h2:text-base prose-h2:text-primary prose-h3:my-2 prose-h3:text-2xl prose-p:my-0 prose-p:py-3 md:prose-h3:text-3xl">
            <DocumentRenderer document={await homepage.contentText()} />
          </div>
          <Link
            href={homepage.contentCta.href}
            className="flex items-center gap-2 font-semibold text-primary"
          >
            {homepage.contentCta.title}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
