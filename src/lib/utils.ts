import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateWithOrdinal(
  date: Date,
  locale: string = "en-US",
): string {
  const dayOfWeek = new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(date)

  const day = date.getDate()

  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
  }).format(date)

  const ordinalSuffix = getOrdinalSuffix(day)

  return `${dayOfWeek}, ${day}${ordinalSuffix} ${month}`
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th" // 11th-20th
  switch (day % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}
