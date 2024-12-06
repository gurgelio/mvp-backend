import { cn } from "@/lib/utils/cn";
import { ForwardedRef, forwardRef, type ComponentProps } from "react";

export const Input = forwardRef(function Input(
  { className, type, ...rest }: ComponentProps<"input">,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-primary bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  );
});
