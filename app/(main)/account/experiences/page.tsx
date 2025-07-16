"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useListExperience } from "@/hooks/useExperience";
import { MoveLeft, Plus, SquarePen } from "lucide-react";
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
        <div className='flex items-center gap-6'>
          <Button onClick={() => router.back()} className='cursor-pointer'>
            <MoveLeft />
          </Button>
          <div>
            <h1 className='text-4xl font-bold'>
              <span className='text-muted-foreground'>/</span>experiences
              <span className='text-muted-foreground'>.</span>
            </h1>
            <p className='text-muted-foreground'>
              Showcase your journey by adding and updating your experiences.
            </p>
          </div>
        </div>
        <Button
          className='cursor-pointer'
          variant={"outline"}
          onClick={() => setAddDialogOpen(true)}
          asChild
        >
          <span>
            <Plus />
          </span>
        </Button>
        <AddExperienceDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
        />
      </div>
      <div>
        {data?.map((item, i) => (
          <div key={item.$id}>
            <div className='flex justify-between'>
              <div>
                <p className='text-sm mb-1 text-slate-950/70 group-hover:text-slate-950/90 dark:text-white/90 dark:group-hover:text-slate-300 font-medium'>
                  {item.$createdAt
                    ? new Date(item.$createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Unknown Date"}
                </p>
                <div className='cursor-pointer inline-block mb-2'>
                  <h3 className='text-slate-800 dark:text-slate-300 text-lg sm:text-xl cursor-pointer'>
                    <span className='relative z-20 hover:text-slate-800 dark:hover:text-slate-300 hover:underline tracking-tight'>
                      {item.title}
                    </span>
                  </h3>
                </div>
                <p className='text-sm mb-2 text-slate-950/70 dark:text-slate-400 line-clamp-2'>
                  {item.description}
                </p>
              </div>
              <Button
                className='cursor-pointer'
                variant={"outline"}
                onClick={() => setEditDialogOpen(item.$id)}
                asChild
              >
                <span>
                  <SquarePen />
                </span>
              </Button>
              <EditExperienceDialog
                documentId={item.$id}
                open={editDialogOpen === item.$id}
                onOpenChange={(open) =>
                  setEditDialogOpen(open ? item.$id : null)
                }
              />
            </div>
            <Separator className='mb-5' />
          </div>
        ))}
      </div>
    </div>
  );
}
