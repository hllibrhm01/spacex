type DateTimeFormatOptions = Intl.DateTimeFormatOptions

const defaultOptions: DateTimeFormatOptions = {
  dateStyle: "medium",
}

export const formatDate = (
  dateString: string,
  options?: DateTimeFormatOptions
): string => {
  return new Date(dateString).toLocaleDateString("en-US", options ?? defaultOptions)
}

export function getYear<T extends DateLike>(date: T): number {
  return new Date(date).getFullYear()
}

type DateLike = string | number | Date

export function isFuture<T extends DateLike>(date: T): boolean {
  return Number(new Date(date)) > Date.now()
}
