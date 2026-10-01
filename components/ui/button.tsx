import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 active:translate-x-0.5 active:translate-y-0.5 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-foreground/80 bg-foreground text-background hover:bg-foreground/90 shadow-hard-xs hover:shadow-hard active:shadow-none",
        outline:
          "border-border bg-card text-foreground hover:bg-muted hover:border-foreground/40 shadow-hard-xs active:shadow-none",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-muted shadow-hard-xs active:shadow-none",
        accent:
          "border-foreground/80 bg-accent text-accent-foreground font-semibold hover:bg-accent/90 shadow-hard-xs hover:shadow-hard-yellow active:shadow-none",
        ghost:
          "border-transparent hover:bg-muted hover:text-foreground",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20 shadow-hard-xs active:shadow-none",
        link: "border-transparent text-foreground underline underline-offset-4 hover:text-accent",
      },
      size: {
        default: "h-9 gap-2 px-3.5",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1.5 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2.5 px-5 text-sm font-semibold",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
