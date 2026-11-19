"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { CircleUser, LogOut, MoveUpRight, Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useUser, useUserMutations } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { CommandPalette } from "./command-palette";

export function NavbarApp() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Projects",
      link: "/projects",
    },
    {
      name: "Blog",
      link: "/blogs",
    },
    {
      name: "About",
      link: "/about",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data } = useUser();
  const { logoutMutation } = useUserMutations();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();

    window.location.reload();
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <>
      <CommandPalette />
      <Navbar className='top-0'>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className='flex items-center gap-2 shrink-0'>
            <button
              type='button'
              onClick={openCommandPalette}
              title='Open Command Palette (Ctrl+K)'
              className='relative z-20 inline-flex items-center gap-1.5 h-8 px-2 rounded-lg border border-border/70 bg-muted/40 hover:bg-accent/70 text-xs font-mono text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs active:scale-[0.98]'
            >
              <Search className='w-3.5 h-3.5' />
              <kbd className='text-[10px] font-mono bg-background/80 px-1 py-0.5 rounded border border-border/60 leading-none'>
                ⌘K
              </kbd>
            </button>

            <NavbarButton
              variant='primary'
              className='flex items-center gap-1.5 px-3 py-1.5'
              href='/contact'
            >
              Let's talk <MoveUpRight width={16} />
            </NavbarButton>
            {data && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='cursor-pointer'>
                  <Avatar>
                    <AvatarFallback className='bg-green-100 text-zinc-900 font-mono text-xs font-bold'>
                      DW
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={"/account"}>
                      <CircleUser />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className='cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600'
                  >
                    <LogOut className='text-red-500' />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <div className='flex gap-2 items-center'>
              <button
                type='button'
                onClick={openCommandPalette}
                title='Search (Ctrl+K)'
                className='inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/70 bg-muted/40 text-muted-foreground hover:text-foreground transition-all cursor-pointer'
              >
                <Search className='w-3.5 h-3.5' />
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              {data && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='cursor-pointer'>
                    <Avatar>
                      <AvatarFallback className='bg-green-100 text-zinc-900 font-mono text-xs font-bold'>
                        DW
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                      <Link href={"/account"}>
                        <CircleUser />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className='cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-600'
                    >
                      <LogOut className='text-red-500' />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className='relative text-neutral-600 dark:text-neutral-300 font-sans text-xs uppercase tracking-widest py-1'
              >
                <span className='block'>{item.name}</span>
              </a>
            ))}
            <div className='flex w-full flex-col gap-4'>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant='primary'
                className='w-full'
                href='/contact'
              >
                Let's talk
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </>
  );
}
