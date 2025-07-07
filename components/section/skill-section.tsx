import { databases } from "@/app/appwrite";
import { Query } from "appwrite";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function SkillSection() {
  let res = await databases
    .listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_BLOG_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    )
    .then(function (response) {
      return response.documents;
    })
    .catch(function (error) {
      console.error(error);
    });

  if (!res || res.length === 0) {
    return (
      <div className='text-center text-slate-500 dark:text-slate-400'>
        No skills available.
      </div>
    );
  }

  return (
    <section className='space-y-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='md:cols-span-1'>
        <h1 className='text-4xl font-bold'>
          <span className='text-muted-foreground'>/</span>skills
          <span className='text-muted-foreground'>.</span>
        </h1>
      </div>
      <div className='md:col-span-2'>
        <div className='flex flex-wrap gap-3'>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            React
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Nest.js.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Nest
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Express.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Express
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Next.js.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Next
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Laravel.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Laravel
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/PHP.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Php
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/JavaScript.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Javascript
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/TypeScript.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Typescript
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Node.js.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Nodejs
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Figma.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Figma
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://icon.icepanel.io/Technology/svg/Docker.svg'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            Docker
          </Badge>
          <Badge
            variant={"secondary"}
            className='rounded-lg py-1 px-3 text-base'
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
                src='https://github.com/evilrabbit.png'
                alt='@evilrabbit'
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            React Native
          </Badge>
        </div>
      </div>
    </section>
  );
}
