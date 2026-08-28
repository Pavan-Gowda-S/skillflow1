import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Chip } from "@/components/common/Chips";
import { executions } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/executions/")({
  head: () => ({
    meta: [
      { title: "Agent Executions — SkillMesh" },
      {
        name: "description",
        content:
          "Every agent run with skills used, MCP calls, approvals, duration and a full execution trace.",
      },
      { property: "og:title", content: "Agent Executions — SkillMesh" },
      {
        property: "og:description",
        content: "Observable, auditable agent runs across enterprise capabilities.",
      },
    ],
  }),
  component: ExecutionsPage,
});

const STATUSES = ["All", "Completed", "Stopped", "Failed"] as const;

function ExecutionsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");

  const rows = useMemo(
    () =>
      executions.filter(
        (e) =>
          (status === "All" || e.status === status) &&
          (query.trim() === "" ||
            e.task.toLowerCase().includes(query.toLowerCase()) ||
            e.agent.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Executions"
        subtitle="Observable, auditable runs across every composed capability workflow."
        actions={<Chip tone="neutral">Last 24 hours</Chip>}
      />

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex h-9 min-w-64 flex-1 items-center gap-2 rounded-md border border-border bg-surface/70 px-3 md:max-w-sm">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search executions…"
            aria-label="Search executions"
            className="h-full w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-md border px-2.5 py-1.5 text-[12px] transition-colors",
              status === s
                ? "border-primary/50 bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1.1fr_1.8fr_auto_auto_auto_auto_auto] gap-3 border-b border-border bg-surface-raised/60 px-5 py-2.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
          <span>Agent</span>
          <span>Task</span>
          <span>Skills</span>
          <span>Tools</span>
          <span>Duration</span>
          <span>Status</span>
          <span />
        </div>
        <ul>
          {rows.map((e) => (
            <li key={e.id}>
              <Link
                to="/executions/$executionId"
                params={{ executionId: e.id }}
                className="grid grid-cols-[1.1fr_1.8fr_auto_auto_auto_auto_auto] items-center gap-3 border-b border-border px-5 py-3 transition-colors last:border-0 hover:bg-accent/40"
              >
                <span className="text-[13px] font-medium">{e.agent}</span>
                <span className="truncate text-[12.5px] text-muted-foreground">{e.task}</span>
                <span className="font-mono text-[12px] text-muted-foreground">{e.skills}</span>
                <span className="font-mono text-[12px] text-muted-foreground">{e.tools}</span>
                <span className="font-mono text-[12px] text-muted-foreground">{e.duration}</span>
                <Chip tone={e.status === "Completed" ? "success" : "warning"}>{e.status}</Chip>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
