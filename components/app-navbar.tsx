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
import { CircleUser, LayoutDashboard, LogOut, MoveUpRight } from "lucide-react";
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

  return (
    <Navbar className='top-0 '>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className='flex items-center gap-4'>
          <NavbarButton
            variant='primary'
            className='flex items-center gap-2'
            href='contact'
          >
            Let's talk <MoveUpRight width={16} />
          </NavbarButton>
          {data && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <Avatar>
                  <AvatarFallback className='bg-green-100'>DW</AvatarFallback>
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
                <DropdownMenuItem>
                  <LayoutDashboard />
                  Dashboard
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
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
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
              className='relative text-neutral-600 dark:text-neutral-300'
            >
              <span className='block'>{item.name}</span>
            </a>
          ))}
          <div className='flex w-full flex-col gap-4'>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant='primary'
              className='w-full'
            >
              Let's talk
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
