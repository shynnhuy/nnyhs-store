import { cn } from "@ui/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

const spinnerVariants = cva(
  "z-[9999] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center",
  {
    variants: {
      show: {
        true: "flex",
        false: "hidden",
      },
    },
    defaultVariants: {
      show: true,
    },
  }
);

const loaderVariants = cva(" animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  if (show) {
    return (
      <div className="relative w-auto h-auto">
        <span className={spinnerVariants({ show })}>
          <Loader2 className={cn(loaderVariants({ size }), className)} />
        </span>
        <div className={cn(show && "blur-sm")}>{children}</div>
      </div>
    );
  }
  return children;
}
