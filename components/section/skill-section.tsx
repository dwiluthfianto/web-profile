import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus, SquarePen } from "lucide-react";
import { useState } from "react";
import { useListSkill } from "@/hooks/useSkill";
import { useFileView } from "@/hooks/useStorage";
import AddSkillDialog from "@/app/(main)/account/skills/add-skill-dialog";
import { HeaderImage } from "../image/header-image";

export function SkillSection() {
  const { data: user } = useUser();
  const { data: skill, isPending } = useListSkill();
  const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false);
  return (
    <section className='space-y-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='md:cols-span-1 space-y-4'>
        <h1 className='text-4xl font-bold'>
          <span className='text-muted-foreground'>/</span>skills
          <span className='text-muted-foreground'>.</span>
        </h1>
        {user && (
          <>
            <div className='flex gap-2 item-center'>
              <Button variant={"outline"} asChild>
                <Link href={"/account/skills"}>
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
            <AddSkillDialog
              open={addDialogOpen}
              onOpenChange={setAddDialogOpen}
            />
          </>
        )}
      </div>
      <div className='md:col-span-2'>
        {isPending ? null : skill?.length === 0 ? (
          <h1 className='text-center'>Skill not found</h1>
        ) : (
          <div className='flex flex-wrap gap-3'>
            {skill &&
              skill.map((item, i) => (
                <Badge
                  variant={"secondary"}
                  className='rounded-lg py-1 px-3 text-base'
                  key={i}
                >
                  <HeaderImage className='rounded-full' fileId={item.image} />
                  {item.title}
                </Badge>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
