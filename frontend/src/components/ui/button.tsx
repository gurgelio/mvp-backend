import { cn } from "@/lib/utils/cn";
import { ForwardedRef, forwardRef, type ComponentProps } from "react";

export const Button = forwardRef(function Button(
  { className, type, ...rest }: ComponentProps<"button">,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      type={type}
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "h-10 px-4 py-2",
        className,
      )}
      {...rest}
    />
  );
});
