import { cn } from "@/lib/utils";

interface Column<T> {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (row: T) => React.ReactNode;
}

interface PremiumTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function PremiumTable<T extends Record<string, any>>({ columns, data, onRowClick }: PremiumTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                  (!col.align || col.align === "left") && "text-left"
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={cn(
                "border-b border-border/50 transition-colors",
                onRowClick && "cursor-pointer hover:bg-primary/5"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    "py-2.5 px-3",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right"
                  )}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
