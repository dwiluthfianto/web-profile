"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProjectMutations } from "@/hooks/useProject";
import { useFileMutations, useFileView } from "@/hooks/useStorage";
import { ProjectSchema } from "@/lib/services/project.service";
import { generateSlug } from "@/utils/slugify";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreateProjectPage() {
  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      image: "",
      slug: "",
    },
  });

  const { createProjectMutation } = useProjectMutations();
  const { createFileMutation } = useFileMutations();
  const router = useRouter();
  const title = form.watch("title");

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    if (data.imageFile) {
      data.image = (await createFileMutation.mutateAsync(data.imageFile)).$id;
    }

    await createProjectMutation.mutateAsync(data);

    router.push("/projects");
  };

  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form]);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold'>
          <span className='text-muted-foreground'>/</span>project
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-muted-foreground'>Showcase your project.</p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            {form.watch("imageFile") && (
              <div className='w-64'>
                <AspectRatio ratio={16 / 9} className='bg-muted rounded-lg'>
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
                  <FormDescription>
                    This will be displayed as your project image.
                  </FormDescription>
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
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    This will be displayed as project title.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your title'
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Description <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    Write a brief summary or introduction for your project post.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your description'
                      maxLength={150}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='link'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Link <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    A short tagline that describes you or your work.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='https://github.com/dwiluthfianto/skilins-fe'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending ? "Submiting.." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
