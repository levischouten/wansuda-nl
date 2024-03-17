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
  PhoneIcon,
  PhoneOutgoingIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="mx-auto flex max-w-screen-lg items-center justify-between px-8 py-4">
      <Link href="/">
        <Logo />
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {props.items.map((item) => {
            if ("items" in item) {
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger>
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid grid-cols-1 gap-3 p-6 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
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
          <div className="flex h-full flex-col justify-between">
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
                          <ul className="space-y-2">
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
