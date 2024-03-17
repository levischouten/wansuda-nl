import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8">
      <p className="text-primary">404</p>
      <h1 className="text-4xl font-bold">Pagina niet gevonden</h1>
      <p className="text-muted-foreground">
        Sorry, deze pagina bestaat helaas niet.
      </p>
      <Link href="/" className="flex items-center gap-2 text-primary">
        <ArrowLeftIcon className="h-4 w-4" />
        Terug naar de homepagina
      </Link>
    </main>
  );
}
