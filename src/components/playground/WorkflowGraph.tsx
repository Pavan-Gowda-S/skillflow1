import { ArrowDown, Check, Loader2, Lock, MinusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/common/Chips";
import type { WorkflowNode } from "./useAgentRun";

const statusMeta = {
  pending: { label: "Pending", tone: "neutral" as const },
  running: { label: "Running", tone: "primary" as const },
  completed: { label: "Completed", tone: "success" as const },
  blocked: { label: "Awaiting approval", tone: "warning" as const },
  skipped: { label: "Not executed", tone: "danger" as const },
};

function StatusIcon({ status }: { status: WorkflowNode["status"] }) {
  if (status === "completed") return <Check className="size-3.5 text-success" />;
  if (status === "running") return <Loader2 className="size-3.5 animate-spin text-primary" />;
  if (status === "blocked") return <Lock className="size-3.5 text-warning" />;
  if (status === "skipped") return <MinusCircle className="size-3.5 text-destructive" />;
  return <span className="size-3.5 rounded-full border border-border-strong" />;
}

export function WorkflowGraph({ nodes }: { nodes: WorkflowNode[] }) {
  return (
    <ol className="space-y-0">
      {nodes.map((node, i) => {
        const meta = statusMeta[node.status];
        const active = node.status === "running";
        return (
          <li key={node.id}>
            <div
              className={cn(
                "animate-rise flex items-center gap-3 rounded-lg border px-3.5 py-2.5 transition-colors",
                active
                  ? "border-primary/50 bg-primary/8 shadow-[var(--glow-primary)]"
                  : node.status === "completed"
                    ? "border-border bg-surface-raised/60"
                    : node.status === "blocked"
                      ? "border-warning/50 bg-warning/8"
                      : node.status === "skipped"
                        ? "border-destructive/40 bg-destructive/8"
                        : "border-border bg-surface/40",
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <StatusIcon status={node.status} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium">{node.name}</p>
                <p className="font-mono text-[10.5px] text-muted-foreground">
                  {node.source} · {node.permission}
                  {node.approvalRequired ? " · approval required" : ""}
                </p>
              </div>
              <Chip tone={meta.tone}>{meta.label}</Chip>
              <span className="w-14 text-right font-mono text-[11px] text-muted-foreground">
                {node.durationMs ? `${node.durationMs}ms` : "—"}
              </span>
            </div>
            {i < nodes.length - 1 ? (
              <div className="flex h-5 items-center justify-center">
                <ArrowDown
                  className={cn(
                    "size-3.5",
                    node.status === "completed" ? "text-primary" : "text-border-strong",
                  )}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
