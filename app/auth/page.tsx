"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/services/user.service";
import { useUserMutations, useUserProfile } from "@/hooks/useUser";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { useFileView } from "@/hooks/useStorage";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginMutation } = useUserMutations();

  const { data: user, isPending: pendingUser } = useUserProfile();
  const { data: logo, isPending: pendingLogo } = useFileView(user?.logo);

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    await loginMutation.mutateAsync(data);

    router.push("/");
  }

  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex w-full max-w-sm flex-col gap-6'>
        {pendingUser || pendingLogo ? (
          <Skeleton className='h-9 w-24' />
        ) : (
          <Link
            href='/'
            className='flex items-center gap-2 self-center font-medium'
          >
            <img src={logo} alt='logo' width={30} height={30} />
            <span className='font-medium text-black dark:text-white'>
              {user && user.name}
            </span>
          </Link>
        )}

        <Card className='w-full max-w-sm'>
          <CardHeader className='text-center'>
            <CardTitle className='text-xl'>Welcome back</CardTitle>
            <CardDescription>
              Login with your Apple or Google account
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <CardContent className='space-y-4'>
                <div className='flex flex-col gap-4'>
                  <Button variant='outline' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                      <path
                        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                        fill='currentColor'
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>
                <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
                  <span className='bg-card text-muted-foreground relative z-10 px-2'>
                    Or continue with
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className='flex-col gap-2'>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Loging.." : "Login"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
