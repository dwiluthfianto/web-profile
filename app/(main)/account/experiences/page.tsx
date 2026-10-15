"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useListExperience } from "@/hooks/useExperience";
import { MoveLeft, Plus, SquarePen, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import AddExperienceDialog from "./add-experience-dialog";
import { useState } from "react";
import EditExperienceDialog from "./edit-experience-dialog";

export default function ExperiencePage() {
  const router = useRouter();
  const { data } = useListExperience();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<string | null>(null);

  return (
    <div className='p-4 space-y-8'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4 sm:gap-6'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => router.back()}
            className='h-8 w-8 p-0 flex items-center justify-center rounded-lg border-border/60 hover:bg-accent/80 transition-all cursor-pointer shadow-xs active:scale-[0.98]'
          >
            <MoveLeft className='w-3.5 h-3.5' />
          </Button>
          <div>
            <div className='inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-muted/60 border border-border/50 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground w-fit mb-1'>
              <Briefcase className='w-2.5 h-2.5 text-sky-500/80' />
              <span>Admin / Management</span>
            </div>
            <h1 className='text-3xl font-mono font-bold tracking-tight'>
              <span className='text-muted-foreground'>/</span>experiences
              <span className='text-muted-foreground'>.</span>
            </h1>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Showcase your journey by adding, editing, and managing your career experiences.
            </p>
          </div>
        </div>

        <Button
          variant='outline'
          size='sm'
          className='h-8 text-xs gap-1.5 rounded-lg border-border/60 hover:bg-accent/80 transition-all font-medium cursor-pointer shadow-xs active:scale-[0.98]'
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className='w-3.5 h-3.5' />
          <span>Add Experience</span>
        </Button>
        <AddExperienceDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
        />
      </div>

      <div className='space-y-4'>
        {data?.map((item, i) => (
          <div key={item.$id ?? i}>
            <div className='flex justify-between items-start py-2 gap-4'>
              <div className='space-y-1'>
                <span
                  className='text-[11px] font-mono tracking-wider uppercase text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60 border border-border/40 inline-block'
                  suppressHydrationWarning
                >
                  {item.startDate
                    ? new Date(item.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Unknown Date"}{" "}
                  —{" "}
                  {item.endDate
                    ? new Date(item.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Present"}
                </span>

                <div>
                  <h3 className='text-base font-semibold tracking-tight text-foreground'>
                    {item.title}
                  </h3>
                  <p className='text-xs sm:text-sm font-medium text-foreground/80'>
                    {item.company} {item.employmentType ? `• ${item.employmentType}` : ""}
                  </p>
                </div>

                {item.description && (
                  <p className='text-xs sm:text-sm text-muted-foreground line-clamp-2 pt-1'>
                    {item.description}
                  </p>
                )}
              </div>

              <div className='flex items-center gap-2 shrink-0'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 w-8 p-0 flex items-center justify-center rounded-lg border-border/60 hover:bg-accent/80 transition-all cursor-pointer shadow-xs active:scale-[0.98]'
                  onClick={() => setEditDialogOpen(item.$id)}
                  title='Edit experience'
                >
                  <SquarePen className='w-3.5 h-3.5' />
                </Button>
                <EditExperienceDialog
                  documentId={item.$id}
                  open={editDialogOpen === item.$id}
                  onOpenChange={(open) =>
                    setEditDialogOpen(open ? item.$id : null)
                  }
                />
              </div>
            </div>
            <Separator className='mt-2' />
          </div>
        ))}
      </div>
    </div>
  );
}
