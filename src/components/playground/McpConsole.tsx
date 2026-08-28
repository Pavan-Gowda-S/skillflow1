import { useState } from "react";
import { AlertTriangle, ChevronRight, Check, Cpu, Loader2, Server } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chip, SimulatedChip } from "@/components/common/Chips";
import { cn } from "@/lib/utils";
import type { McpCall } from "./useAgentRun";

function Json({ value }: { value: unknown }) {
  return (
    <pre className="max-h-56 overflow-auto rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] leading-5 text-muted-foreground">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

export function McpConsole({ calls, running }: { calls: McpCall[]; running: boolean }) {
  const [selected, setSelected] = useState<McpCall | null>(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 items-center gap-2 rounded-lg border border-border bg-surface-raised/50 p-3 text-center">
        {[
          { label: "AI Agent", icon: Cpu },
          { label: "Skill Orchestrator", icon: Cpu },
          { label: "MCP / Integration", icon: Server },
          { label: "Freshworks", icon: Server },
        ].map((n, i) => (
          <div key={n.label} className="relative">
            <div
              className={cn(
                "rounded-md border px-2 py-2",
                running ? "border-primary/45 bg-primary/8" : "border-border bg-surface/60",
              )}
            >
              <n.icon
                className={cn(
                  "mx-auto size-4",
                  running ? "text-primary" : "text-muted-foreground",
                )}
              />
              <p className="mt-1 text-[11px] leading-tight font-medium">{n.label}</p>
            </div>
            {i < 3 ? (
              <span
                className={cn(
                  "absolute top-1/2 -right-1.5 z-10 h-px w-3",
                  running ? "bg-primary" : "bg-border-strong",
                )}
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[1.4fr_1fr_auto_auto_auto] gap-2 border-b border-border bg-surface-raised/60 px-3 py-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>Tool</span>
          <span>System</span>
          <span>Status</span>
          <span className="text-right">Duration</span>
          <span />
        </div>
        {calls.length === 0 ? (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No MCP calls yet. Run the agent to see live-looking call logs.
          </p>
        ) : (
          <ul>
            {calls.map((call, i) => (
              <li key={`${call.tool}-${i}`}>
                <button
                  type="button"
                  onClick={() => setSelected(call)}
                  className="animate-rise grid w-full grid-cols-[1.4fr_1fr_auto_auto_auto] items-center gap-2 border-b border-border px-3 py-2 text-left transition-colors last:border-0 hover:bg-accent/40"
                >
                  <span className="flex items-center gap-2 font-mono text-[12px]">
                    {call.status === "ok" ? (
                      <Check className="size-3.5 text-success" />
                    ) : call.status === "pending-approval" ? (
                      <AlertTriangle className="size-3.5 text-warning" />
                    ) : (
                      <Loader2 className="size-3.5 animate-spin text-primary" />
                    )}
                    {call.tool}
                  </span>
                  <span className="truncate text-[12px] text-muted-foreground">{call.system}</span>
                  <Chip tone={call.status === "ok" ? "success" : "warning"}>
                    {call.status === "ok" ? "Success" : "Approval"}
                  </Chip>
                  <span className="text-right font-mono text-[11px] text-muted-foreground">
                    {call.durationMs ? `${call.durationMs}ms` : "—"}
                  </span>
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono">
                  {selected.system} — {selected.tool}
                </DialogTitle>
                <DialogDescription>
                  Enterprise capability accessed through the MCP / API layer.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Chip tone="neutral">System: {selected.system}</Chip>
                <Chip tone="primary">Interface: MCP / API</Chip>
                {selected.simulated ? <SimulatedChip label="Prototype Simulation" /> : null}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Input
                  </p>
                  <Json value={selected.input} />
                </div>
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Output
                  </p>
                  <Json value={selected.output} />
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
