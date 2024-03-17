import { FacebookIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Entry } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

type FooterProps = {
  items: (
    | {
        label: string;
        href: string;
      }
    | {
        label: string;
        href: string;
        items: {
          label: string;
          description: string;
          href: string;
        }[];
      }
  )[];
  settings: Entry<(typeof keystaticConfig)["singletons"]["settings"]>;
};

export function Footer(props: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex max-w-screen-lg flex-col items-center gap-8 px-8 pb-20 pt-48 text-sm">
      <ul className="flex w-full flex-col justify-start gap-8 md:flex-row md:justify-center md:gap-12">
        {props.items.map((item) => {
          if ("items" in item) {
            return (
              <li key={item.href} className="flex flex-col gap-2">
                <ul className="flex flex-col gap-2">
                  <li className="font-semibold">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                  {item.items.map((nestedItem) => (
                    <li key={nestedItem.href}>
                      <Link
                        href={
                          nestedItem.href
                            ? `/${item.href}#${nestedItem.href}`
                            : `/${item.href}`
                        }
                      >
                        {nestedItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={item.href} className="font-semibold">
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-2 text-muted-foreground">
        <Button size="icon" variant="ghost" asChild>
          <Link href={props.settings.facebook} target="_blank">
            <FacebookIcon className="h-4 w-4" />
          </Link>
        </Button>
        <Button size="icon" variant="ghost" asChild>
          <Link href={`mailto:${props.settings.email}`} target="_blank">
            <MailIcon className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        © {year} Wansuda. Alle rechten voorbehouden.
      </p>
    </footer>
  );
}
