import { useListExperience } from "@/hooks/useExperience";
import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import AddExperienceDialog from "@/app/(main)/account/experiences/add-experience-dialog";
import { Skeleton } from "../ui/skeleton";

export function ExperienceSection() {
  const { data: user } = useUser();
  const { data, isPending } = useListExperience();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);

  return (
    <section className='space-y-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='md:col-span-1 space-y-4'>
        <h1 className='text-3xl font-mono font-bold'>
          <span className='text-muted-foreground'>/</span>experiences
          <span className='text-muted-foreground'>.</span>
        </h1>
        {user && (
          <>
            <div className='flex gap-2 item-center'>
              <Button variant={"outline"} asChild>
                <Link href={"/account/experiences"}>
                  <SquarePen />
                </Link>
              </Button>
              <Button
                variant={"outline"}
                onClick={() => setAddDialogOpen(true)}
              >
                <Plus />
              </Button>
            </div>
            <AddExperienceDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
            />
          </>
        )}
      </div>
      <div className='md:col-span-2'>
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
                  <Skeleton className='h-4 w-32' />
                  <Skeleton className='h-12 w-full' />
                </div>
              </div>
            ))}
          </div>
        ) : data?.length === 0 ? (
          <h1 className='text-center'>Experiences not found</h1>
        ) : (
          <div className='animate-fade-in'>
            <div className='ml-[3px] -mb-[15px] h-8 w-[3px] bg-slate-950/10 dark:bg-white/10 rounded-t'></div>
            {data &&
              data.map((item, i) => (
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
                      {item.startDate
                        ? new Date(item.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "Unknown Date"}{" "}
                      -{" "}
                      {item.endDate
                        ? new Date(item.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "Present"}
                    </p>

                    <h3 className='text-slate-800 dark:text-slate-300 text-lg sm:text-xl cursor-pointer'>
                      <span className='relative z-20 hover:text-slate-800 dark:hover:text-slate-300 hover:underline tracking-tight'>
                        {item.title}
                      </span>
                    </h3>

                    <div className='text-sm mb-1 items-center flex gap-1 text-slate-400 line-clamp-2'>
                      {item.company}{" "}
                      <div className='w-[2px] h-[2px] bg-slate-400 rounded-full'></div>{" "}
                      {item.employmentType}
                    </div>
                    <p className='text-sm mb-5 text-slate-950/90 dark:text-slate-400'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
