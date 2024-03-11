import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-screen h-screen flex items-center justify-center flex-col gap-8">
      <p className="text-primary">404</p>
      <h1 className="text-4xl font-bold">Pagina niet gevonden</h1>
      <p className="text-muted-foreground">
        Sorry, deze pagina bestaat helaas niet.
      </p>
      <Link href="/" className="text-primary flex items-center gap-2">
        <ArrowLeftIcon className="w-4 h-4" />
        Terug naar de homepagina
      </Link>
    </main>
  );
}
