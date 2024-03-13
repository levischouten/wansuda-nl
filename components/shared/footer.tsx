import { FacebookIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center text-sm pb-20 pt-48 gap-8 max-w-screen-lg mx-auto px-8">
      <ul className="flex gap-10 flex-col md:flex-row justify-start md:justify-center w-full">
        <li>
          <Link href="/">Welkom</Link>
        </li>
        <li>
          <Link href="/behandelingen">Behandelingen</Link>
        </li>
        <li>
          <Link href="/cursussen">Cursussen</Link>
        </li>
        <li>
          <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link>
        </li>
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
