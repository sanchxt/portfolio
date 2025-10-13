import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-text-heading",
      h2: "scroll-m-20 border-b border-border-default pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-text-heading",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-text-heading",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight text-text-heading",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight text-text-heading",
      h6: "scroll-m-20 text-base font-semibold tracking-tight text-text-heading",
      p: "leading-7 [&:not(:first-child)]:mt-6 text-text-primary",
      blockquote:
        "mt-6 border-l-2 border-border-default pl-6 italic text-text-secondary",
      lead: "text-xl text-text-secondary",
      large: "text-lg font-semibold text-text-primary",
      small: "text-sm font-medium leading-none text-text-secondary",
      muted: "text-sm text-text-tertiary",
      display:
        "text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl text-text-heading",
    },
    font: {
      sans: "font-sans",
      serif: "font-serif",
      display: "font-display",
    },
  },
  defaultVariants: {
    variant: "p",
    font: "sans",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "blockquote";
}

function getDefaultElement(
  variant: TypographyProps["variant"]
):
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "blockquote" {
  switch (variant) {
    case "h1":
      return "h1";
    case "h2":
      return "h2";
    case "h3":
      return "h3";
    case "h4":
      return "h4";
    case "h5":
      return "h5";
    case "h6":
      return "h6";
    case "blockquote":
      return "blockquote";
    case "display":
      return "h1";
    default:
      return "p";
  }
}

const Typography = ({
  className,
  variant,
  font,
  as,
  ...props
}: TypographyProps) => {
  const Comp = as || getDefaultElement(variant);
  return (
    <Comp
      className={cn(typographyVariants({ variant, font }), className)}
      {...props}
    />
  );
};

Typography.displayName = "Typography";

export { Typography, typographyVariants };
