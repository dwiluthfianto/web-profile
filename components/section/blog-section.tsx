import { useListBlog } from "@/hooks/useBlog";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Eraser, SquarePen } from "lucide-react";
import { useState } from "react";
import { DeleteBlogDialog } from "@/app/(main)/blogs/delete-dialog";
import { useUser } from "@/hooks/useUser";
import { Skeleton } from "../ui/skeleton";

export function BlogSection() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
  const { data: user } = useUser();
  const { data, isPending } = useListBlog();

  return (
    <div>
      {isPending ? (
        <div className='space-y-6'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex gap-4'>
              <div className='flex flex-col items-center'>
                <Skeleton className='w-3 h-3 rounded-full mt-2' />
                <div className='w-[2px] bg-slate-950/10 dark:bg-white/10 flex-1 mt-2 min-h-[80px]' />
              </div>
              <div className='space-y-2 flex-1 pb-6'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-6 w-48' />
                <Skeleton className='h-12 w-full' />
              </div>
            </div>
          ))}
        </div>
      ) : data?.length === 0 ? (
        <div className='text-center text-slate-500 dark:text-slate-400'>
          No blogs available.
        </div>
      ) : (
        <div className='animate-fade-in'>
          <div className='ml-[3px] -mb-[15px] h-8 w-[3px] bg-slate-950/10 dark:bg-white/10 rounded-t'></div>
          {data?.map((item, i) => (
            <div className='flex' key={item.$id ?? i}>
              <div className='relative'>
                <div className='w-[9px] h-[9px] mt-[6px] rounded-full bg-slate-600 dark:bg-white/90 relative'>
                  <div
                    className={` dark:bg-white/90 ${
                      i === 0 ? "animate-ping bg-slate-900" : "bg-slate-400"
                    } w-[9px] h-[9px] rounded-full absolute`}
                  ></div>
                </div>
                <div className='ml-[3px] w-[3px] bg-slate-950/10 dark:bg-white/10 h-full'></div>
              </div>
              <div className='pl-3 group'>
                <p className='font-sans text-[11px] uppercase tracking-wider mb-1 text-slate-950/70 group-hover:text-slate-950/90 dark:text-white/90 dark:group-hover:text-slate-300' suppressHydrationWarning>
                  {item.$createdAt
                    ? new Date(item.$createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Unknown Date"}
                </p>
                <Link
                  className='cursor-pointer inline-block mb-2'
                  href={`/blogs/${item.slug ?? item.$id}`}
                >
                  <h3 className='text-slate-800 dark:text-slate-300 text-lg sm:text-xl cursor-pointer'>
                     <span className='relative z-20 hover:text-slate-800 dark:hover:text-slate-300 hover:underline tracking-tight'>
                      {item.title}
                    </span>
                  </h3>
                </Link>
                <p className='text-sm mb-5 text-slate-950/70 dark:text-slate-400 line-clamp-2'>
                  {item.description}
                </p>
              </div>
              {user && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className='w-8 h-8 p-1 bg-black/40 text-white dark:bg-white/40 dark:text-black rounded-lg cursor-pointer shadow ml-2'>
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Setting</DropdownMenuLabel>
                      <DropdownMenuItem asChild className='cursor-pointer'>
                        <Link href={`/blogs/${item.slug}/edit`}>
                          <SquarePen />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => setDeleteDialogOpen(item.$id)}
                      >
                        <Eraser /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DeleteBlogDialog
                    documentId={item.$id}
                    open={deleteDialogOpen === item.$id}
                    onOpenChange={(open) =>
                      setDeleteDialogOpen(open ? item.$id : null)
                    }
                  />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
