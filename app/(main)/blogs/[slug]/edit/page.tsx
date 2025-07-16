"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { BlogSchema } from "@/lib/services/blog.service";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useBlogDetail, useBlogMutations } from "@/hooks/useBlog";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/utils/slugify";
import { SerializedEditorState } from "lexical";
import { Editor } from "@/components/blocks/editor-00/editor";
import { Skeleton } from "@/components/ui/skeleton";

const initialValue = {
  root: {
    children: [
      {
        children: [],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState;

export default function UpdateBlogPage() {
  const params = useParams<{ slug: string }>();

  const { data: blog, isPending } = useBlogDetail(params.slug);

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      slug: "",
    },
  });
  const [editorState, setEditorState] =
    useState<SerializedEditorState>(initialValue);

  const router = useRouter();
  const title = form.watch("title");

  const { updateBlogMutation } = useBlogMutations();
  const onSubmit = async (data: z.infer<typeof BlogSchema>) => {
    if (blog)
      await updateBlogMutation.mutateAsync({ documentId: blog.$id, data });

    router.push("/blogs");
  };

  useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form]);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const blogId = blog?.$id || params.slug || "new";

  useEffect(() => {
    if (blog && !isPending) {
      try {
        const parsedContent = JSON.parse(blog.content);
        setEditorState(parsedContent);
        setIsDataLoaded(true);
        form.reset({
          title: blog.title,
          description: blog.description,
          content: blog.content,
          slug: blog.slug,
        });
      } catch (error) {
        console.error("Error parsing blog content:", error);
        setIsDataLoaded(true);
      }
    } else if (!isPending) {
      setIsDataLoaded(true);
    }
  }, [blog, isPending, form]);

  return (
    <div className='p-4 space-y-8'>
      <div>
        <h1 className='text-4xl font-bold'>
          <span className='text-muted-foreground'>/</span>blog
          <span className='text-muted-foreground'>.</span>
        </h1>
        <p className='text-muted-foreground'>
          Write about yourself, or share your thoughts and experiences. This
          will help readers get to know you better.
        </p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    This will be displayed as your blog title.
                  </FormDescription>
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
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Decription<span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    Write a brief summary or introduction for your blog post.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder='Enter your description'
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Content <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormDescription>
                    Write the main content of your blog post here.
                  </FormDescription>
                  <FormControl>
                    {isDataLoaded ? (
                      <Editor
                        key={`editor-${blogId}`}
                        editorSerializedState={editorState}
                        onSerializedChange={(value) => {
                          setEditorState(value);
                          field.onChange(JSON.stringify(value));
                        }}
                      />
                    ) : (
                      <Skeleton className='h-24 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center' />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={updateBlogMutation.isPending}>
              {updateBlogMutation.isPending ? "Submiting.." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
