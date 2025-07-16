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
import { useSkillDetail, useSkillMutations } from "@/hooks/useSkill";
import { useFileMutations, useFileView } from "@/hooks/useStorage";
import { SkillSchema } from "@/lib/services/skill.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function EditSkillDialog({
  documentId,
  open,
  onOpenChange,
}: {
  documentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data } = useSkillDetail(documentId);
  const { data: fileImage, isPending: pendingFileImage } = useFileView(
    data?.image
  );
  const form = useForm<z.infer<typeof SkillSchema>>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      title: "",
      image: "",
      imageFile: undefined,
    },
  });

  const { updateSkillMutation, deleteSkillMutation } = useSkillMutations();
  const { createFileMutation } = useFileMutations();

  const onSubmit = async (data: z.infer<typeof SkillSchema>) => {
    if (data.imageFile) {
      data.image = (await createFileMutation.mutateAsync(data.imageFile)).$id;
    }
    await updateSkillMutation.mutateAsync({ documentId, data });

    onOpenChange(false);
  };

  const handleDelete = async () => {
    await deleteSkillMutation.mutateAsync(documentId);

    onOpenChange(false);
  };

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        image: data.image,
      });
    }
  }, [data, form]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[524px]'>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Fill in the details of your new skill. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 mr-4'>
              <div className='flex gap-4'>
                {form.watch("imageFile") ? (
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
                ) : (
                  fileImage && (
                    <div className='w-24 h-24'>
                      <AspectRatio
                        ratio={1 / 1}
                        className='bg-muted rounded-lg'
                      >
                        <Image
                          src={fileImage}
                          alt='Photo profile'
                          fill
                          className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
                        />
                      </AspectRatio>
                    </div>
                  )
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
            <div className='flex justify-between mt-4'>
              <Button
                variant='outline'
                className='cursor-pointer'
                onClick={handleDelete}
                type='button'
              >
                Delete Skill
              </Button>
              <Button type='submit' disabled={updateSkillMutation.isPending}>
                {updateSkillMutation.isPending ? "Submiting.." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
