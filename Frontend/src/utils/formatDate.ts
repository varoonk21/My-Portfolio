export default function formatDate(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const isPresent = Math.abs(new Date().getTime() - endDate.getTime()) < 1000 * 60 * 60 * 24 * 7;
  if (isPresent) return `${startStr} – Present`;

  const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();
  if (sameMonth) return startStr;

  return `${startStr} – ${endStr}`;
}
