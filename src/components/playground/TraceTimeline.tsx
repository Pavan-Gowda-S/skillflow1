import { cn } from "@/lib/utils";
import type { TraceEvent } from "@/data/types";

export function TraceTimeline({ events }: { events: TraceEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        The execution trace records every step once the agent runs.
      </p>
    );
  }
  return (
    <ol className="relative space-y-3 pl-5">
      <span className="absolute top-1 bottom-1 left-[5px] w-px bg-border" />
      {events.map((e, i) => (
        <li key={`${e.time}-${e.label}-${i}`} className="animate-rise relative">
          <span
            className={cn(
              "absolute top-1.5 -left-[18px] size-2.5 rounded-full border-2 border-background",
              e.status === "ok"
                ? "bg-success"
                : e.status === "warn"
                  ? "bg-warning"
                  : "bg-muted-foreground",
            )}
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="font-mono text-[11px] text-muted-foreground">{e.time}</span>
            <span className="text-[13px] font-medium">{e.label}</span>
            <span className="font-mono text-[10.5px] text-muted-foreground">{e.system}</span>
            <span
              className={cn(
                "font-mono text-[10.5px]",
                e.status === "warn" ? "text-warning" : "text-success",
              )}
            >
              {e.status === "warn" ? "attention" : "ok"}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
