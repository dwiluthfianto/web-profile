import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useListProject } from "@/hooks/useProject";
import { HeaderImage } from "../image/header-image";
import { Skeleton } from "../ui/skeleton";

export function ProjectSection() {
  const { data, isPending } = useListProject(2);

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">
        <span className="text-muted-foreground">/</span>projects
        <span className="text-muted-foreground">.</span>
      </h1>
      <span className="text-neutral-500 dark:text-neutral-400">
        I build some projects to help me learn new things and also to help
        other. Follow my journey build in public{" "}
        <a href="#" className="text-blue-500 hover:underline">
          here
        </a>
        .
      </span>
      <BentoGrid className="md:auto-rows-[20rem] md:grid-cols-2 mt-2">
        {isPending
          ? Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 dark:border-white/[0.2] dark:bg-black h-full"
              >
                <Skeleton className="w-full h-[140px] rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))
          : data?.map((item, i) => (
              <div key={i} className="animate-fade-in">
                <BentoGridItem
                  title={item.title}
                  description={item.description}
                  header={<HeaderImage ratio={16 / 9} fileId={item.image} />}
                  link={item.link}
                  slug={item.slug}
                  id={item.$id}
                />
              </div>
            ))}
      </BentoGrid>
    </div>
  );
}
