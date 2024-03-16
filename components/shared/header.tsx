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
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

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
  return (
    <header className="justify-between items-center max-w-screen-lg mx-auto py-4 px-8 flex">
      <Link href="/" legacyBehavior passHref>
        <h1 className="uppercase font-bold text-lg">Icon</h1>
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {props.items.map((item) => {
            if ("items" in item) {
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
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
            {props.items.map((item) => {
              if ("items" in item) {
                return (
                  <li key={item.label}>
                    <Collapsible className="group">
                      <CollapsibleTrigger className="w-full text-start flex justify-between items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        {item.label}
                        <ChevronUpIcon className="w-4 h-4 group-data-[state=closed]:hidden" />
                        <ChevronDownIcon className="w-4 h-4 group-data-[state=open]:hidden" />
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
                              <a className="block select-none space-y-1 rounded-md py-3 px-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
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
                    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      {item.label}
                    </a>
                  </Link>
                </li>
              );
            })}
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
    <li className="last:odd:col-span-2">
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
