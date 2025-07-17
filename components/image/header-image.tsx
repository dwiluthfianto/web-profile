import { useFileView } from "@/hooks/useStorage";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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

interface HeaderAvatarImageProps {
  fileId: string;
  className?: string;
}

export const HeaderAvatarImage = ({
  fileId,
  className,
}: HeaderAvatarImageProps) => {
  const { data, isPending } = useFileView(fileId);

  return (
    <Avatar className={cn("w-6 h-6", className)}>
      {data && !isPending ? (
        <AvatarImage src={data} alt='skill-image' />
      ) : (
        <AvatarFallback>SK</AvatarFallback>
      )}
    </Avatar>
  );
};
