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
import { Textarea } from "@/components/ui/textarea";
import { useFileMutations, useFileView } from "@/hooks/useStorage";
import { useUserMutations, useUserProfile } from "@/hooks/useUser";
import { ProfileSchema } from "@/lib/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ProfilePage() {
  const { data: profile, isPending: pendingProfile } = useUserProfile();
  const { data: fileImage, isPending: pendingFileImage } = useFileView(
    profile?.image
  );
  const { data: fileLogo, isPending: pendingFileLogo } = useFileView(
    profile?.logo
  );

  const router = useRouter();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: profile?.name || "",
      subheadline: profile?.subheadline || "",
      about: profile?.about || "",
      todo: profile?.todo || "",
      image: profile?.image || "",
      logo: profile?.logo || "",
    },
  });

  const { updateUserProfileMutation } = useUserMutations();
  const { createFileMutation } = useFileMutations();

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    if (data.imageFile) {
      data.image = (await createFileMutation.mutateAsync(data.imageFile)).$id;
    }

    if (data.logoFile) {
      data.logo = (await createFileMutation.mutateAsync(data.logoFile)).$id;
    }

    profile &&
      (await updateUserProfileMutation.mutateAsync({
        documentId: profile?.$id,
        data,
      }));
  };

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        subheadline: profile.subheadline,
        about: profile.about,
        todo: profile.todo,
        image: profile.image,
        logo: profile.logo,
      });
    }
  }, [profile, form]);

  return (
    <div className='p-4 space-y-8'>
      <div className='flex items-center gap-6'>
        <Button onClick={() => router.back()}>
          <MoveLeft />
        </Button>
        <div>
          <h1 className='text-4xl font-bold'>
            <span className='text-muted-foreground'>/</span>account
            <span className='text-muted-foreground'>.</span>
          </h1>
          <p className='text-muted-foreground'>
            View and update your account details and preferences.
          </p>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
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
                    <AspectRatio ratio={1 / 1} className='bg-muted rounded-lg'>
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
                    <FormDescription>
                      This will be displayed as your public profile.
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
            </div>
            <FormField
              control={form.control}
              name='logoFile'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
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
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    This will be displayed as your public name.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your name'
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subheadline'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Subheadline <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    A short tagline that describes you or your work.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your subheadline'
                      maxLength={150}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='about'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    About me <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    Write a brief introduction or story about yourself.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Tell your stories'
                      maxLength={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='todo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Todo <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    Write your current goals, tasks, or what you're working on.
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your subheadline'
                      maxLength={100}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={updateUserProfileMutation.isPending}
            >
              {updateUserProfileMutation.isPending ? "Submiting.." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
