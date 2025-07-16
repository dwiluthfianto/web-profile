"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MoveLeft, Plus, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import AddExperienceDialog from "./add-skill-dialog";
import { useState } from "react";
import EditExperienceDialog from "./edit-skill-dialog";
import { useListSkill } from "@/hooks/useSkill";
import { useFileView } from "@/hooks/useStorage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
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
        <div className='flex items-center gap-6'>
          <Button onClick={() => router.back()} className='cursor-pointer'>
            <MoveLeft />
          </Button>
          <div>
            <h1 className='text-4xl font-bold'>
              <span className='text-muted-foreground'>/</span>skills
              <span className='text-muted-foreground'>.</span>
            </h1>
            <p className='text-muted-foreground'>
              Showcase your experiences by adding and updating your skills.
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
        <AddSkillDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} />
      </div>
      <div>
        {data?.map((item, i) => (
          <div key={i}>
            <div className='flex justify-between mb-3'>
              <div className='flex gap-3 items-center'>
                <div className='w-12'>
                  <HeaderImage fileId={item.image} />
                </div>

                <div className='cursor-pointer inline-block mb-2'>
                  <h3 className='text-slate-800 dark:text-slate-300 text-lg sm:text-xl cursor-pointer'>
                    <span className='relative z-20 hover:text-slate-800 dark:hover:text-slate-300 hover:underline tracking-tight'>
                      {item.title}
                    </span>
                  </h3>
                </div>
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
              <EditSkillDialog
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
