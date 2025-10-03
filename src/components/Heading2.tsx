import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export default async function Heading2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl font-bold lg:text-4xl xl:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  )
}
