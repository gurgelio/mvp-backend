import { cn } from "@/lib/utils/cn";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

export const Select = forwardRef(
  (
    { className, children, ...rest }: ComponentProps<"select">,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <select
        ref={ref}
        {...rest}
        className={cn(
          "flex border h-10 w-1/2 rounded-md border-primary bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {children}
      </select>
    );
  },
);
