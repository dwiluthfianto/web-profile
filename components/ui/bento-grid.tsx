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
    <Link className='cursor-pointer relative' href={link}>
      {data && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className='absolute top-2 right-2 z-20 p-1 bg-black/40 text-white dark:bg-white/40 dark:text-black rounded-lg cursor-pointer shadow'>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Setting</DropdownMenuLabel>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link href={`/projects/${slug}/edit`}>
                  <SquarePen />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => setDeleteDialogOpen(id)}
              >
                <Eraser /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteProjectDialog
            documentId={id}
            open={deleteDialogOpen === id}
            onOpenChange={(open) => setDeleteDialogOpen(open ? id : null)}
          />
        </>
      )}
      <div
        className={cn(
          "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
          className
        )}
      >
        {header}
        <div className='transition duration-200 group-hover/bento:translate-x-2'>
          {icon}
          <div className='mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200'>
            {title}
          </div>
          <div className='font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300'>
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};
