"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { GrillZillaLogo } from '../grill-zilla-logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/owner-dashboard', label: "Owner's Dashboard" },
];

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GrillZillaLogo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              FoodBuzz
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="p-4">
                <Link href="/" className="flex items-center space-x-2 mb-8">
                  <GrillZillaLogo className="h-8 w-8" />
                  <span className="font-bold font-headline text-lg">FoodBuzz</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                     <SheetClose asChild key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                                'text-lg',
                                pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                            )}
                        >
                            {link.label}
                        </Link>
                     </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Mobile Title */}
        <div className="flex flex-1 items-center justify-center md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <GrillZillaLogo className="h-8 w-8" />
                <span className="font-bold font-headline text-lg">FoodBuzz</span>
            </Link>
        </div>
        <div className="w-10 md:hidden" />


        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Future actions like login/profile can go here */}
        </div>
      </div>
    </header>
  );
}
