import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Ellipsis, Eraser, SquarePen } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { DeleteProjectDialog } from "@/app/(main)/projects/delete-dialog";
import { useState } from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  link,
  description,
  header,
  icon,
  slug,
}: {
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  link: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  slug: string;
}) => {
  const { data } = useUser();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);

  return (
    <div className='relative group/container'>
      {data && (
        <div
          className='absolute top-3 right-3 z-30'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger className='h-7 w-7 p-0 flex items-center justify-center rounded-lg bg-background/80 hover:bg-accent border border-border/60 text-muted-foreground hover:text-foreground shadow-xs backdrop-blur-xs transition-all active:scale-[0.98] cursor-pointer'>
              <Ellipsis className='w-3.5 h-3.5' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={`/projects/${slug}/edit`}>
                  <SquarePen className='w-3.5 h-3.5 mr-2' />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer text-destructive focus:text-destructive'
                onClick={() => setDeleteDialogOpen(id)}
              >
                <Eraser className='w-3.5 h-3.5 mr-2' /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteProjectDialog
            documentId={id}
            open={deleteDialogOpen === id}
            onOpenChange={(open) => setDeleteDialogOpen(open ? id : null)}
          />
        </div>
      )}

      <Link className='cursor-pointer block h-full' href={link}>
        <div
          className={cn(
            "group/bento relative row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-border/70 bg-card/60 dark:bg-zinc-950/40 backdrop-blur-xs p-4 transition-all duration-300 hover:border-foreground/20 hover:shadow-md h-full overflow-hidden",
            className
          )}
        >
          {header}
          <div className='transition duration-200 group-hover/bento:translate-x-1'>
            {icon}
            <div className='mt-2 mb-1.5 font-mono font-bold text-sm tracking-tight text-foreground'>
              {title}
            </div>
            <div className='font-sans text-xs font-normal text-muted-foreground line-clamp-2'>
              {description}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
