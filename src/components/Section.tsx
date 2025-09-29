import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"

type SectionProps<TTag extends ElementType = "section"> = {
  as?: TTag
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<TTag>, "className" | "as" | "children">

export default function Section<TTag extends ElementType = "section">(
  props: SectionProps<TTag>,
) {
  const { as, className, children, ...restProps } =
    props as SectionProps<ElementType>
  const Tag: ElementType = as ?? "section"

  return (
    <Tag
      className={cn(
        "col-span-12 col-start-2 grid grid-cols-subgrid",
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  )
}
