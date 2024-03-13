"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type HeaderProps = {
  services: {
    title: string;
    description: string;
    slug: string;
  }[];
  courses: {
    title: string;
    description: string;
    slug: string;
  }[];
};

export function Header(props: HeaderProps) {
  return (
    <header className="justify-between items-center max-w-screen-lg mx-auto py-4 px-8 flex">
      <Link href="/" legacyBehavior passHref>
        <h1 className="uppercase font-bold text-lg">Icon</h1>
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Welkom
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Behandelingen</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
                {props.services.map((service) => (
                  <ListItem
                    key={service.slug}
                    title={service.title}
                    href={`/behandelingen#${service.slug}`}
                  >
                    {service.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Cursussen</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
                {props.courses.map((course) => (
                  <ListItem
                    key={course.slug}
                    title={course.title}
                    href={`/cursussen#${course.slug}`}
                  >
                    {course.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/algemene-voorwaarden" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Algemene Voorwaarden
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet>
        <Button asChild variant="ghost" size="icon" className="lg:hidden">
          <SheetTrigger>
            <MenuIcon className="w-5 h-5" />
          </SheetTrigger>
        </Button>
        <SheetContent className="sm:w-[500px] w-full max-w-full space-y-4">
          <SheetHeader className="p-3">
            <SheetTitle className="uppercase font-bold text-lg">
              ICON
            </SheetTitle>
          </SheetHeader>
          <ul className="space-y-2">
            <li>
              <Link href="/" legacyBehavior passHref>
                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  Welkom
                </a>
              </Link>
            </li>
            <li>
              <Collapsible className="group">
                <CollapsibleTrigger className="w-full text-start flex justify-between items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  Behandelingen
                  <ChevronUpIcon className="w-4 h-4 group-data-[state=closed]:hidden" />
                  <ChevronDownIcon className="w-4 h-4 group-data-[state=open]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-3">
                  <ul className="space-y-2">
                    {props.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/behandelingen#${service.slug}`}
                        legacyBehavior
                        passHref
                      >
                        <a className="block select-none space-y-1 rounded-md py-3 px-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          {service.title}
                        </a>
                      </Link>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Collapsible className="group">
                <CollapsibleTrigger className="w-full text-start flex justify-between items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  Cursussen
                  <ChevronUpIcon className="w-4 h-4 group-data-[state=closed]:hidden" />
                  <ChevronDownIcon className="w-4 h-4 group-data-[state=open]:hidden" />
                </CollapsibleTrigger>
                <CollapsibleContent className="py-3">
                  <ul className="space-y-2">
                    {props.courses.map((course) => (
                      <Link
                        key={course.slug}
                        href={`/cursussen#${course.slug}`}
                        legacyBehavior
                        passHref
                      >
                        <a className="block select-none space-y-1 rounded-md py-3 px-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          {course.title}
                        </a>
                      </Link>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>
            <li>
              <Link href="/algemene-voorwaarden" legacyBehavior passHref>
                <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                  Algemene Voorwaarden
                </a>
              </Link>
            </li>
          </ul>
        </SheetContent>
      </Sheet>

      <Button asChild variant="ghost" className="hidden lg:flex">
        <Link href="/contact">
          Contact <ArrowRightIcon className="ml-2 w-4 h-4" />
        </Link>
      </Button>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
