import { Dialog } from "radix-ui";
import { AiOutlineClose, AiOutlineExpand } from "react-icons/ai";

import { cn } from "@/lib/utils";

export default function ZoomImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={`Enlarge screenshot: ${alt}`}
          className={cn(
            "group/zoom relative block aspect-16/10 w-full cursor-zoom-in overflow-hidden border border-border ring-primary ring-offset-2 ring-offset-card transition-[box-shadow,border-color] duration-200 outline-none hover:border-primary hover:ring-2 focus-visible:border-primary focus-visible:ring-2",
            className,
          )}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top-left transition-transform duration-300 group-hover/zoom:scale-[1.03]"
          />
          <span
            aria-hidden
            className="absolute right-2 bottom-2 border border-border bg-background/80 p-1 text-muted-foreground opacity-70 transition-[opacity,color,border-color] group-hover/zoom:border-primary group-hover/zoom:text-foreground group-hover/zoom:opacity-100"
          >
            <AiOutlineExpand className="size-3.5" />
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close asChild>
            <div className="flex h-dvh w-screen cursor-zoom-out items-center justify-center p-4 sm:p-8">
              <img
                src={src}
                alt={alt}
                className="max-h-full w-auto max-w-full border border-border shadow-2xl"
              />
            </div>
          </Dialog.Close>
          <Dialog.Close className="absolute top-3 right-3 border border-border bg-background/80 p-1.5 text-muted-foreground transition-colors hover:text-foreground">
            <AiOutlineClose className="size-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
