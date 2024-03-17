import { FacebookIcon, MailIcon } from "lucide-react";
import Link from "next/link";

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
};

export function Footer(props: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center text-sm pb-20 pt-48 gap-8 max-w-screen-lg mx-auto px-8">
      <ul className="flex gap-8 md:gap-12 flex-col md:flex-row justify-start md:justify-center w-full">
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
      <div className="flex gap-8 text-muted-foreground">
        <FacebookIcon className="w-4 h-4" />
        <MailIcon className="w-4 h-4" />
      </div>
      <p className="text-xs text-muted-foreground">
        © {year} Wansuda. Alle rechten voorbehouden.
      </p>
    </footer>
  );
}
