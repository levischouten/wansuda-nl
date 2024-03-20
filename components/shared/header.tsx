"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  MailIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "./logo";

type HeaderProps = {
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

export function Header(props: HeaderProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky inset-0 z-50 mx-auto mb-8 flex max-w-screen-lg items-center justify-between border-b bg-background px-8 py-4 lg:relative lg:mb-0 lg:border-none">
      <Link href="/">
        <Logo />
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {props.items.map((item) => {
            if ("items" in item) {
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] grid-cols-1 gap-3 p-6">
                      {item.items.map((nestedItem) => (
                        <ListItem
                          key={nestedItem.label}
                          title={nestedItem.label}
                          href={
                            nestedItem.href
                              ? `/${item.href}#${nestedItem.href}`
                              : `/${item.href}`
                          }
                        >
                          {nestedItem.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="w-[400px] rounded-b-lg border-t p-8 font-medium hover:bg-accent active:bg-accent">
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 text-sm"
                      >
                        Bekijk alle {item.label}{" "}
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet open={open} onOpenChange={setOpen}>
        <Button asChild variant="ghost" size="icon" className="lg:hidden">
          <SheetTrigger>
            <MenuIcon className="h-5 w-5" />
          </SheetTrigger>
        </Button>
        <SheetContent className="flex w-full max-w-full flex-col space-y-4 sm:w-[500px]">
          <SheetHeader className="p-3">
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col justify-between font-medium">
            <ul className="space-y-2">
              {props.items.map((item) => {
                if ("items" in item) {
                  return (
                    <li key={item.label}>
                      <Collapsible className="group">
                        <CollapsibleTrigger className="flex w-full select-none items-center justify-between rounded-md p-3 text-start leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          {item.label}
                          <ChevronUpIcon className="h-4 w-4 group-data-[state=closed]:hidden" />
                          <ChevronDownIcon className="h-4 w-4 group-data-[state=open]:hidden" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-3">
                          <ul className="space-y-2 font-normal">
                            {item.items.map((nestedItem) => (
                              <Link
                                key={nestedItem.label}
                                href={
                                  nestedItem.href
                                    ? `/${item.href}#${nestedItem.href}`
                                    : `/${item.href}`
                                }
                                legacyBehavior
                                passHref
                              >
                                <a
                                  className="block select-none space-y-1 rounded-md px-6 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  onClick={() => setOpen(false)}
                                >
                                  {nestedItem.label}
                                </a>
                              </Link>
                            ))}
                            <Link
                              key={item.label}
                              href={item.href}
                              legacyBehavior
                              passHref
                            >
                              <a
                                className="flex select-none items-center gap-2 space-y-1 rounded-md px-6 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                onClick={() => setOpen(false)}
                              >
                                Alle {item.label}{" "}
                                <ArrowRightIcon className="h-4 w-4" />
                              </a>
                            </Link>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Button asChild className="w-full self-start">
              <Link href="/contact" onClick={() => setOpen(false)}>
                Contact <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Button asChild className="hidden lg:flex">
        <Link href="/contact">
          Contact <MailIcon className="ml-2 h-4 w-4" />
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
            className,
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
