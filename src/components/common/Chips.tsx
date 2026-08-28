import { cn } from "@/lib/utils";
import type { Permission } from "@/data/types";

export function Chip({
  children,
  tone = "neutral",
  className,
  title,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "violet";
  className?: string;
  title?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "border-border bg-muted/60 text-muted-foreground",
    primary: "border-primary/40 bg-primary/12 text-primary",
    success: "border-success/40 bg-success/12 text-success",
    warning: "border-warning/40 bg-warning/12 text-warning",
    danger: "border-destructive/40 bg-destructive/12 text-destructive",
    violet: "border-violet/40 bg-violet/12 text-violet",
  };
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PermissionChip({ permission }: { permission: Permission }) {
  const tone =
    permission === "WRITE"
      ? "warning"
      : permission === "READ"
        ? "primary"
        : permission === "ANALYSIS"
          ? "violet"
          : permission === "REASONING"
            ? "violet"
            : "neutral";
  return (
    <Chip tone={tone as never} title={`Access level: ${permission}`}>
      {permission}
    </Chip>
  );
}

export function SimulatedChip({ label = "Simulated" }: { label?: string }) {
  return (
    <Chip tone="warning" title="Prototype simulation — not a live integration">
      {label}
    </Chip>
  );
}

export function SourceChip({ source }: { source: string }) {
  return <Chip tone="neutral">{source}</Chip>;
}
