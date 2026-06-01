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
import { useListMessage } from "@/hooks/useMessage";
import { ProfileSchema } from "@/lib/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Search, Mail, Phone, Building, Calendar, ChevronDown, ChevronUp, Copy, Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  const { data: messages, isPending: pendingMessages } = useListMessage();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<"email" | "phone" | "text" | null>(null);

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

    if (profile) {
      await updateUserProfileMutation.mutateAsync({
        documentId: profile.$id,
        data,
      });
    }
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
          <h1 className='text-3xl font-mono font-bold'>
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

      {/* Messages Inbox Feed Section */}
      <div className="border-t border-border/60 pt-8 mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            <span className="text-muted-foreground">/</span>messages
            <span className="text-muted-foreground">.</span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Daftar pesan masuk yang dikirimkan oleh pengunjung melalui formulir kontak.
          </p>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari nama, email, subjek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-mono text-xs h-9 bg-card/30"
            />
          </div>
          <div className="text-xs font-mono text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-md border border-border/30">
            Total Pesan: <span className="font-bold text-foreground">
              {
                messages?.filter((msg: any) => {
                  const s = searchQuery.toLowerCase();
                  return (
                    msg.name?.toLowerCase().includes(s) ||
                    msg.businessEmail?.toLowerCase().includes(s) ||
                    msg.subject?.toLowerCase().includes(s) ||
                    msg.message?.toLowerCase().includes(s)
                  );
                }).length || 0
              }
            </span>
          </div>
        </div>

        {/* Messages List */}
        {pendingMessages ? (
          <div className="space-y-4">
            <div className="h-16 bg-muted animate-pulse rounded-lg border border-border/30" />
            <div className="h-16 bg-muted animate-pulse rounded-lg border border-border/30" />
            <div className="h-16 bg-muted animate-pulse rounded-lg border border-border/30" />
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-border rounded-xl bg-muted/10">
            <p className="text-xs text-muted-foreground font-mono">Belum ada pesan yang tersimpan di database.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages
              .filter((msg: any) => {
                const s = searchQuery.toLowerCase();
                return (
                  msg.name?.toLowerCase().includes(s) ||
                  msg.businessEmail?.toLowerCase().includes(s) ||
                  msg.subject?.toLowerCase().includes(s) ||
                  msg.message?.toLowerCase().includes(s)
                );
              })
              .map((msg: any) => {
                const isExpanded = expandedMessageId === msg.$id;
                const formattedDate = new Date(msg.$createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                const handleCopyText = (e: React.MouseEvent, text: string, type: "email" | "phone" | "text") => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(text);
                  setCopiedId(msg.$id);
                  setCopiedType(type);
                  setTimeout(() => {
                    setCopiedId(null);
                    setCopiedType(null);
                  }, 2000);
                };

                return (
                  <div
                    key={msg.$id}
                    className={`border border-border/80 rounded-lg overflow-hidden transition-all duration-200 bg-card/30 dark:bg-card/20 ${
                      isExpanded ? "shadow-sm border-border bg-card/60 dark:bg-card/35" : "hover:border-border/100"
                    }`}
                  >
                    {/* Collapsible Header */}
                    <div
                      onClick={() => setExpandedMessageId(isExpanded ? null : msg.$id)}
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
                        <div className="font-semibold text-sm truncate">
                          {msg.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate font-mono">
                          {msg.businessEmail}
                        </div>
                        <div className="text-xs font-medium text-foreground/80 truncate md:text-right">
                          {msg.subject}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] text-muted-foreground font-mono hidden sm:inline-block" suppressHydrationWarning>
                          {formattedDate}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-border/40 pt-4 bg-muted/10 dark:bg-muted/5 space-y-4 animate-fade-in">
                        {/* Sender details metadata */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <a href={`mailto:${msg.businessEmail}`} className="hover:underline font-mono truncate text-foreground">
                              {msg.businessEmail}
                            </a>
                            <button
                              onClick={(e) => handleCopyText(e, msg.businessEmail, "email")}
                              className="p-1 hover:bg-muted rounded border border-transparent hover:border-border transition-all cursor-pointer"
                              title="Copy Email"
                            >
                              {copiedId === msg.$id && copiedType === "email" ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span className="font-mono text-foreground">{msg.phoneNumber}</span>
                            <button
                              onClick={(e) => handleCopyText(e, msg.phoneNumber, "phone")}
                              className="p-1 hover:bg-muted rounded border border-transparent hover:border-border transition-all cursor-pointer"
                              title="Copy Phone"
                            >
                              {copiedId === msg.$id && copiedType === "phone" ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate text-foreground">{msg.companyName || "Personal"}</span>
                          </div>
                        </div>

                        {/* Date for small screen */}
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono sm:hidden border-t border-border/20 pt-2">
                          <Calendar className="w-3 h-3" />
                          <span suppressHydrationWarning>{formattedDate}</span>
                        </div>

                        {/* Message body */}
                        <div className="relative border border-border/60 bg-zinc-950 text-zinc-300 dark:bg-black/40 dark:border-border/30 rounded-lg p-4 font-mono text-[11px] leading-relaxed shadow-inner overflow-hidden select-text">
                          <div className="flex justify-between items-center border-b border-zinc-900 dark:border-zinc-800 pb-2 mb-2">
                            <span className="text-zinc-500 text-[10px]">MESSAGE_BODY</span>
                            <button
                              onClick={(e) => handleCopyText(e, msg.message, "text")}
                              className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-all cursor-pointer"
                              title="Copy Message"
                            >
                              {copiedId === msg.$id && copiedType === "text" ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                          <pre className="whitespace-pre-wrap font-sans text-sm text-zinc-200 dark:text-zinc-300">
                            {msg.message}
                          </pre>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="font-mono uppercase tracking-wider text-[10px] h-8 cursor-pointer"
                          >
                            <a
                              href={`mailto:${msg.businessEmail}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Balas via Email
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
