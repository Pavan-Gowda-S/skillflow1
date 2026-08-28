import { cn } from "@/lib/utils";

type Tone = "ok" | "warn" | "error" | "idle" | "info";

const toneClass: Record<Tone, string> = {
  ok: "bg-success",
  warn: "bg-warning",
  error: "bg-destructive",
  idle: "bg-muted-foreground",
  info: "bg-primary",
};

export function StatusDot({
  tone = "ok",
  pulse = false,
  className,
}: {
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-2 shrink-0 rounded-full",
        toneClass[tone],
        pulse && "animate-pulse",
        className,
      )}
    />
  );
}
