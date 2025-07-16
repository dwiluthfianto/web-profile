import { useFileView } from "@/hooks/useStorage";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeaderImageProps {
  fileId: string;
  ratio?: number;
  className?: string;
}

export const HeaderImage = ({
  fileId,
  ratio = 1 / 1,
  className,
}: HeaderImageProps) => {
  const { data, isPending } = useFileView(fileId);

  return (
    <AspectRatio
      ratio={ratio}
      className={cn("bg-muted rounded-full", className)}
    >
      {!isPending && data && (
        <Image
          src={data}
          alt='Project Image'
          fill
          className='h-full w-full rounded-xl object-cover'
        />
      )}
    </AspectRatio>
  );
};
