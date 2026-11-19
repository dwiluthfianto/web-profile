"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useListBlog } from "@/hooks/useBlog";
import { useListProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import {
  BookOpen,
  Copy,
  FolderGit2,
  Home,
  Laptop,
  LogIn,
  Mail,
  Moon,
  Plus,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { data: user } = useUser();
  const { data: projects } = useListProject(25);
  const { data: blogs } = useListBlog();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onCustomOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onCustomOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    fn();
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command Palette"
      description="Quickly jump to pages, projects, articles, or run actions"
    >
      <CommandInput placeholder="Type a command or search projects & articles..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => run(() => router.push("/"))}
            className="cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/projects"))}
            className="cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Projects</span>
            <CommandShortcut>G P</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/blogs"))}
            className="cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog & Articles</span>
            <CommandShortcut>G B</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/about"))}
            className="cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span>About & Experience</span>
            <CommandShortcut>G A</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => router.push("/contact"))}
            className="cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {projects && projects.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projects.map((item: any) => (
                <CommandItem
                  key={item.$id}
                  value={`project ${item.title} ${item.description}`}
                  onSelect={() =>
                    run(() =>
                      window.open(item.link, "_blank", "noopener,noreferrer"),
                    )
                  }
                  className="cursor-pointer"
                >
                  <FolderGit2 className="w-4 h-4 text-indigo-500" />
                  <span className="truncate">{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        {blogs && blogs.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Articles">
              {blogs.map((item: any) => (
                <CommandItem
                  key={item.$id}
                  value={`blog article ${item.title} ${item.description}`}
                  onSelect={() =>
                    run(() => router.push(`/blogs/${item.slug ?? item.$id}`))
                  }
                  className="cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span className="truncate">{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() =>
              run(() => {
                navigator.clipboard.writeText("dwiluthfianto72@gmail.com");
                toast.success(
                  "Email (dwiluthfianto72@gmail.com) copied to clipboard!",
                );
              })
            }
            className="cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Email (dwiluthfianto72@gmail.com)</span>
          </CommandItem>
          {user ? (
            <>
              <CommandItem
                onSelect={() => run(() => router.push("/account"))}
                className="cursor-pointer"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Account & Messages</span>
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => router.push("/projects/create"))}
                className="cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Project</span>
              </CommandItem>
              <CommandItem
                onSelect={() => run(() => router.push("/blogs/create"))}
                className="cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Blog Post</span>
              </CommandItem>
            </>
          ) : (
            <CommandItem
              onSelect={() => run(() => router.push("/auth"))}
              className="cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Admin Sign In</span>
            </CommandItem>
          )}
        </CommandGroup>

        <CommandSeparator />
        <CommandGroup heading="Theme">
          <CommandItem
            onSelect={() => run(() => setTheme("light"))}
            className="cursor-pointer"
          >
            <Sun className="w-4 h-4" />
            <span>Light Theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => setTheme("dark"))}
            className="cursor-pointer"
          >
            <Moon className="w-4 h-4" />
            <span>Dark Theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => setTheme("system"))}
            className="cursor-pointer"
          >
            <Laptop className="w-4 h-4" />
            <span>System Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
