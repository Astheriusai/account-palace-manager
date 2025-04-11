
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }
>(({ className, href, children, ...props }, ref) => {
  const isInternal = href ? href.startsWith('/') || href.startsWith('#') : false;

  if (isInternal) {
    return (
      <RouterLink
        to={href || "#"}
        className={cn("text-primary hover:underline", className)}
        ref={ref}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }

  return (
    <a
      href={href}
      className={cn("text-primary hover:underline", className)}
      ref={ref}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
});

Link.displayName = "Link";

export { Link };
