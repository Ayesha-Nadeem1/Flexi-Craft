import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import React from "react"; // Add this line


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
