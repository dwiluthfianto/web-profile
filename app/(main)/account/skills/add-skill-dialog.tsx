import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSkillMutations } from "@/hooks/useSkill";
import { useFileMutations } from "@/hooks/useStorage";
import { SkillSchema } from "@/lib/services/skill.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function AddSkillDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof SkillSchema>>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      title: "",
      image: "",
      imageFile: undefined,
    },
  });

  const { createSkillMutation } = useSkillMutations();
  const { createFileMutation } = useFileMutations();

  const onSubmit = async (data: z.infer<typeof SkillSchema>) => {
    if (data.imageFile) {
      data.image = (await createFileMutation.mutateAsync(data.imageFile)).$id;
    }
    await createSkillMutation.mutateAsync(data);

    form.reset({
      title: "",
      image: "",
      imageFile: undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[524px]'>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Fill in the details of your new skill. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 mr-4'>
              <div className='flex gap-4'>
                {form.watch("imageFile") && (
                  <div className='w-24 h-24'>
                    <AspectRatio ratio={1 / 1} className='bg-muted rounded-lg'>
                      <Image
                        src={URL.createObjectURL(form.getValues("imageFile")!)}
                        alt='Photo profile'
                        fill
                        className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
                      />
                    </AspectRatio>
                  </div>
                )}
                <FormField
                  control={form.control}
                  name='imageFile'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Image <span className='text-red-500'>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='file'
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);
                          }}
                          // Do not pass value for file input
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        placeholder='Enter your title'
                        maxLength={1000}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={
                  createSkillMutation.isPending || createFileMutation.isPending
                }
              >
                {createSkillMutation.isPending || createFileMutation.isPending
                  ? "Submiting.."
                  : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
