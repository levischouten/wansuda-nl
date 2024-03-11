import { FacebookIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center text-sm pb-20 pt-48 gap-8">
      <ul className="flex gap-10">
        <li>
          <Link href="/">Welkom</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/courses">Courses</Link>
        </li>
        <li>
          <Link href="/fotos">Foto&apos;s</Link>
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
