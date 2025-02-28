// Example shared utility function
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
