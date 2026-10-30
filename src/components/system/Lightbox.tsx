import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type LightboxProps = {
  open: boolean;
  title: string;
  meta: string;
  position: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  children: ReactNode;
};

const controlClass =
  "flex size-11 items-center justify-center rounded-room border border-line transition-colors hover:border-ink";

export const Lightbox = ({
  open,
  title,
  meta,
  position,
  onClose,
  onPrevious,
  onNext,
  className,
  children,
}: LightboxProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") onPrevious();
        if (event.key === "ArrowRight") onNext();
      }}
      className={cn(
        "m-0 h-dvh max-h-none w-full max-w-none bg-bg text-ink backdrop:bg-bg",
        className,
      )}
    >
      {open && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p className="truncate font-semibold">{title}</p>
              <p className="t-label truncate text-faint">{meta}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="t-label mr-2 hidden tabular-nums text-faint sm:inline">
                {position}
              </span>
              <button type="button" className={controlClass} onClick={onPrevious} aria-label="Previous">
                <ArrowLeft className="size-5" aria-hidden="true" />
              </button>
              <button type="button" className={controlClass} onClick={onNext} aria-label="Next">
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
              <button type="button" className={controlClass} onClick={onClose} aria-label="Close">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="min-h-0 flex-1">{children}</div>
        </div>
      )}
    </dialog>
  );
};
