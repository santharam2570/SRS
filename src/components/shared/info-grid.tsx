import { cn } from "@/lib/utils";

interface InfoItem {
  label: string;
  value: React.ReactNode;
}

interface InfoGridProps {
  items: InfoItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function InfoGrid({ items, columns = 3, className }: InfoGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <dl className={cn("grid gap-4", colClass, className)}>
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium text-slate-900">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
