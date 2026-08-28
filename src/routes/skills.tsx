import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip, PermissionChip, SimulatedChip } from "@/components/common/Chips";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { skills } from "@/data/mock";
import type { Skill } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skill Registry — SkillMesh" },
      {
        name: "description",
        content:
          "Reusable agent capabilities that can be discovered, composed and governed across enterprise systems.",
      },
      { property: "og:title", content: "Skill Registry — SkillMesh" },
      {
        property: "og:description",
        content: "Browse reusable capabilities agents can discover and compose.",
      },
    ],
  }),
  component: SkillsPage,
});

const FILTERS = [
  "All",
  "Knowledge",
  "Customer",
  "Support",
  "Analysis",
  "Reasoning",
  "Workflow",
  "External",
] as const;

function SkillsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Skill | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      skills.filter(
        (s) =>
          (filter === "All" || s.category === filter) &&
          (query.trim() === "" ||
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, filter],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skill Registry"
        subtitle="Reusable capabilities that agents can discover and compose."
        actions={<Chip tone="primary">{skills.length} skills in prototype registry</Chip>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-9 min-w-64 flex-1 items-center gap-2 rounded-md border border-border bg-surface/70 px-3 md:max-w-sm">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            aria-label="Search skills"
            className="h-full w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-[12px] transition-colors",
                filter === f
                  ? "border-primary/50 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSelected(s);
              setTestResult(null);
            }}
            className="panel animate-rise p-4 text-left transition-colors hover:border-primary/45"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[14px] font-semibold">{s.name}</p>
              <PermissionChip permission={s.permission} />
            </div>
            <p className="mt-1.5 min-h-9 text-[12.5px] text-muted-foreground">{s.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip tone="neutral">{s.source}</Chip>
              <Chip tone="neutral">{s.category}</Chip>
              {s.approvalRequired ? <Chip tone="warning">Approval</Chip> : null}
            </div>
            <p className="mt-3 font-mono text-[10.5px] text-muted-foreground">
              Used by {s.agents} agents · {s.usage.toLocaleString()} executions
            </p>
          </button>
        ))}
        {filtered.length === 0 ? (
          <p className="text-[13px] text-muted-foreground">No skills match this filter.</p>
        ) : null}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected ? (
            <>
              <DialogHeader>
                <DialogTitle>{selected.name}</DialogTitle>
                <DialogDescription>{selected.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Chip tone="neutral">System: {selected.source}</Chip>
                <Chip tone="primary">Interface: MCP / API</Chip>
                <PermissionChip permission={selected.permission} />
                {selected.approvalRequired ? <Chip tone="warning">Approval required</Chip> : null}
                <SimulatedChip label="Prototype" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Inputs
                  </p>
                  <pre className="rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] text-muted-foreground">
                    {selected.inputs.join("\n")}
                  </pre>
                </div>
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Outputs
                  </p>
                  <pre className="rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] text-muted-foreground">
                    {selected.outputs.join("\n")}
                  </pre>
                </div>
              </div>
              <p className="text-[12.5px] text-muted-foreground">
                Usage: {selected.usage.toLocaleString()} executions · {selected.agents} agents
              </p>
              <button
                type="button"
                onClick={() =>
                  setTestResult(
                    JSON.stringify(
                      {
                        request: Object.fromEntries(selected.inputs.map((i) => [i, "<value>"])),
                        response: Object.fromEntries(
                          selected.outputs.map((o) => [o, "<simulated>"]),
                        ),
                        latency_ms: 420,
                        simulated: true,
                      },
                      null,
                      2,
                    ),
                  )
                }
                className="inline-flex items-center gap-2 self-start rounded-md border border-primary/40 bg-primary/12 px-3 py-2 text-[13px] font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <Play className="size-4" /> Test Skill
              </button>
              {testResult ? (
                <pre className="max-h-52 overflow-auto rounded-md border border-border bg-background/70 p-3 font-mono text-[11.5px] text-muted-foreground">
                  {testResult}
                </pre>
              ) : null}
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
