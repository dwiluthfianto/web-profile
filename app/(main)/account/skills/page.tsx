"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoveLeft, Plus, SquarePen, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useListSkill } from "@/hooks/useSkill";
import AddSkillDialog from "./add-skill-dialog";
import EditSkillDialog from "./edit-skill-dialog";
import { HeaderImage } from "@/components/image/header-image";

export default function SkillPage() {
  const router = useRouter();
  const { data } = useListSkill();
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
              <Sparkles className='w-2.5 h-2.5 text-amber-500/80' />
              <span>Admin / Management</span>
            </div>
            <h1 className='text-3xl font-mono font-bold tracking-tight'>
              <span className='text-muted-foreground'>/</span>skills
              <span className='text-muted-foreground'>.</span>
            </h1>
            <p className='text-xs sm:text-sm text-muted-foreground'>
              Showcase your competencies by adding, editing, and managing your skills.
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
          <span>Add Skill</span>
        </Button>
        <AddSkillDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      </div>

      <div className='space-y-4'>
        {data?.map((item, i) => (
          <div key={item.$id ?? i}>
            <div className='flex justify-between items-center py-2'>
              <div className='flex gap-3 items-center'>
                <div className='w-9 h-9 rounded-lg overflow-hidden border border-border/60 bg-muted/40 p-1 flex items-center justify-center shrink-0'>
                  <HeaderImage fileId={item.image} />
                </div>

                <div>
                  <h3 className='text-sm sm:text-base font-medium tracking-tight text-foreground'>
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  className='h-8 w-8 p-0 flex items-center justify-center rounded-lg border-border/60 hover:bg-accent/80 transition-all cursor-pointer shadow-xs active:scale-[0.98]'
                  onClick={() => setEditDialogOpen(item.$id)}
                  title='Edit skill'
                >
                  <SquarePen className='w-3.5 h-3.5' />
                </Button>
                <EditSkillDialog
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
