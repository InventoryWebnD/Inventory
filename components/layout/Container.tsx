import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "narrow" | "full";
  children: React.ReactNode;
}

export default function Container({
  size = "default",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
