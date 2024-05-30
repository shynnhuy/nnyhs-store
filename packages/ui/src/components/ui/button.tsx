import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@ui/lib/utils";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  prefixIcon?: React.ReactNode;
  badge?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      prefixIcon: Icon,
      badge,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {badge && badge > 0 ? (
          <sup
            className="rounded-full absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 text-center
                       flex items-center justify-center bg-secondary dark:text-white text-black font-semibold shadow-[0_0_0_1px_#4b4144] dark:shadow-[0_0_0_1px_#fff]"
          >
            {badge}
          </sup>
        ) : null}
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          Icon ?? null
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
