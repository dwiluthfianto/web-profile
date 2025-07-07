"use client";

import { databases, ID } from "@/app/appwrite";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, { message: "Name should not be empty" }),
  businessEmail: z
    .string()
    .min(1, { message: "Business email should not be empty" })
    .email(),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number should not be empty" }),
  companyName: z.string().optional(),
  subject: z.string().min(1, { message: "Subject should not be empty" }),
  message: z.string().min(1, { message: "Message should not be empty" }),
});

export default function ContactPage() {
  const [acc, setAcc] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      businessEmail: "",
      phoneNumber: "",
      companyName: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    console.log(data);
    const res = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_MESSAGE_COLLECTION_ID!,
      ID.unique(),
      data
    );

    toast.success("Message has successfully sent", {
      description: "Please wait for the response, Thank you.",
    });
  };

  return (
    <div className='p-4 space-y-8'>
      <div className='flex item-center justify-between'>
        <h1 className='text-4xl font-semibold flex items-center gap-2'>
          Let's talk <MoveUpRight width={24} />
        </h1>

        <Button variant={"ghost"} asChild className='cursor-pointer'>
          <Link href={"mailto:dwi@trials.id"}>
            <Mail /> dwi@trials.id
          </Link>
        </Button>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        placeholder='Enter your name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='businessEmail'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Business Email <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='email'
                        placeholder='Enter your business email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <span className='text-red-500'>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='tel'
                        placeholder='Enter your phone number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='companyName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        placeholder='Enter your company name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Subject <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='text'
                      placeholder='Enter your subject'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Message <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Enter your messages' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-start gap-3'>
              <Checkbox id='terms-2' onClick={() => setAcc(!acc)} />
              <div className='grid gap-2'>
                <Label htmlFor='terms-2'>
                  I agree to receive emails and/or phone calls
                </Label>
              </div>
            </div>
            <Button type='submit' disabled={!acc}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
