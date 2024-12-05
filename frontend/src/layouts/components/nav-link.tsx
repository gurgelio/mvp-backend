import { cn } from "@/lib/utils/cn";
import {
  type LinkProps,
  NavLink as ReactRouterNavLink,
} from "react-router-dom";

export function NavLink({ className, ...rest }: LinkProps) {
  return (
    <ReactRouterNavLink
      className={({ isActive, isPending, isTransitioning }) =>
        cn(
          "flex items-center gap-1.5 font-medium text-zinc-300 text-sm hover:text-zinc-100 cursor-pointer transition-colors",
          {
            "text-zinc-100": isActive,
            "text-primary-800 cursor-wait": isTransitioning || isPending,
          },
          className,
        )
      }
      {...rest}
    ></ReactRouterNavLink>
  );
}
