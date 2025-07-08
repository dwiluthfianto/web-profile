import { useListExperience } from "@/hooks/useExperience";

export function ExperienceSection() {
  const { data, isPending } = useListExperience();

  return (
    <section className='space-y-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
      <div className='md:col-span-1'>
        <h1 className='text-4xl font-bold'>
          <span className='text-muted-foreground'>/</span>experiences
          <span className='text-muted-foreground'>.</span>
        </h1>
      </div>
      <div className='md:col-span-2'>
        {isPending ? null : data?.length === 0 ? (
          <h1 className='text-center'>Experiences not found</h1>
        ) : (
          <>
            <div className='ml-[3px] -mb-[15px] h-8 w-[3px] bg-slate-950/10 dark:bg-white/10 rounded-t'></div>
            {data &&
              data.map((item, i) => (
                <div className='flex' key={item.$id ?? i}>
                  <div className='relative'>
                    <div className='w-[9px] h-[9px] mt-[6px] rounded-full bg-slate-600 dark:bg-white/90 relative'>
                      <div
                        className={` dark:bg-white/90 ${
                          i === 0 ? "animate-ping bg-slate-900" : "bg-slate-400"
                        } w-[9px] h-[9px] rounded-full absolute`}
                      ></div>
                    </div>
                    <div className='ml-[3px] w-[3px] bg-slate-950/10 dark:bg-white/10 h-full'></div>
                  </div>
                  <div className='pl-3 group'>
                    <p className='text-sm mb-1 text-slate-950/70 group-hover:text-slate-950/90 dark:text-white/90 dark:group-hover:text-slate-300 font-medium'>
                      {item.startDate
                        ? new Date(item.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "Unknown Date"}{" "}
                      -{" "}
                      {item.endDate
                        ? new Date(item.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })
                        : "Present"}
                    </p>

                    <h3 className='text-slate-800 dark:text-slate-300 text-lg sm:text-xl cursor-pointer'>
                      <span className='relative z-20 hover:text-slate-800 dark:hover:text-slate-300 hover:underline tracking-tight'>
                        {item.title}
                      </span>
                    </h3>

                    <div className='text-sm mb-1 items-center flex gap-1 text-slate-400 line-clamp-2'>
                      {item.company}{" "}
                      <div className='w-[2px] h-[2px] bg-slate-400 rounded-full'></div>{" "}
                      {item.employmentType}
                    </div>
                    <p className='text-sm mb-5 text-slate-950/90 dark:text-slate-400'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </section>
  );
}
