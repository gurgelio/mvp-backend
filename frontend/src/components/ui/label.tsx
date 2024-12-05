import { cn } from "@/lib/utils/cn";
import type { ComponentProps } from "react";

export function Label({ className, ...rest }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      {...rest}
    />
  );
}
