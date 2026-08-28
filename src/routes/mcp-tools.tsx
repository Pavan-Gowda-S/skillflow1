import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Chip, PermissionChip, SimulatedChip } from "@/components/common/Chips";
import { StatusDot } from "@/components/common/StatusDot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mcpTools } from "@/data/mock";
import type { McpTool } from "@/data/types";

export const Route = createFileRoute("/mcp-tools")({
  head: () => ({
    meta: [
      { title: "MCP Tool Registry — SkillMesh" },
      {
        name: "description",
        content:
          "Tools exposed to agents through standardized capability interfaces, with schemas, permissions and status.",
      },
      { property: "og:title", content: "MCP Tool Registry — SkillMesh" },
      {
        property: "og:description",
        content: "Standardized tool interfaces available to compatible AI agents.",
      },
    ],
  }),
  component: McpToolsPage,
});

function McpToolsPage() {
  const [selected, setSelected] = useState<McpTool | null>(null);
  const [retried, setRetried] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="MCP Tool Registry"
        subtitle="Tools exposed to agents through standardized capability interfaces."
        actions={<SimulatedChip label="Prototype Environment" />}
      />

      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1.3fr_1fr_1fr_auto_auto] gap-3 border-b border-border bg-surface-raised/60 px-5 py-2.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>Tool</span>
          <span>Server</span>
          <span>Source</span>
          <span>Permission</span>
          <span>Status</span>
        </div>
        <ul>
          {mcpTools.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setSelected(t)}
                className="grid w-full grid-cols-[1.3fr_1fr_1fr_auto_auto] items-center gap-3 border-b border-border px-5 py-3 text-left transition-colors last:border-0 hover:bg-accent/40"
              >
                <span className="font-mono text-[12.5px]">{t.name}</span>
                <span className="font-mono text-[11.5px] text-muted-foreground">{t.server}</span>
                <span className="text-[12.5px] text-muted-foreground">{t.source}</span>
                <span className="flex gap-1.5">
                  <PermissionChip permission={t.permission} />
                  {t.approvalRequired ? <Chip tone="warning">Approval</Chip> : null}
                </span>
                <span className="flex items-center gap-2 text-[12px]">
                  <StatusDot tone={t.status === "Available" ? "ok" : "warn"} />
                  {t.status}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="panel border-warning/40 p-4">
        <p className="text-[13px] font-semibold text-warning">MCP tool unavailable</p>
        <p className="mt-1 text-[12.5px] text-muted-foreground">
          <span className="font-mono">status.check</span> could not be reached. Suggested fallback:
          use cached vendor status information.
        </p>
        <button
          type="button"
          onClick={() => setRetried(true)}
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <RefreshCw className="size-3.5" /> {retried ? "Retried — still degraded" : "Retry"}
        </button>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono">{selected.name}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Chip tone="neutral">Source: {selected.source}</Chip>
                <Chip tone="primary">Interface: MCP / API</Chip>
                <PermissionChip permission={selected.permission} />
                <SimulatedChip label="Prototype Simulation" />
              </div>
              <div className="space-y-3">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Input schema
                  </p>
                  <pre className="rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] text-muted-foreground">
                    {JSON.stringify(selected.inputSchema, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Output schema
                  </p>
                  <pre className="rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] text-muted-foreground">
                    {JSON.stringify(selected.outputSchema, null, 2)}
                  </pre>
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
