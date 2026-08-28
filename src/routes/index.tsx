import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Boxes,
  Building2,
  Cpu,
  Globe,
  Layers,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip, SimulatedChip } from "@/components/common/Chips";
import { StatusDot } from "@/components/common/StatusDot";
import { dashboardMetrics, executions } from "@/data/mock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillMesh — Agent Capability Platform" },
      {
        name: "description",
        content:
          "Discover, compose and govern reusable capabilities for AI agents across enterprise systems, MCP tools and knowledge.",
      },
      { property: "og:title", content: "SkillMesh — Agent Capability Platform" },
      {
        property: "og:description",
        content:
          "Give AI agents capabilities, not just conversations. Skill discovery, composition, MCP execution and governed action.",
      },
    ],
  }),
  component: Dashboard,
});

const ARCH_NODES = [
  {
    id: "agent",
    label: "AI Agent",
    icon: Cpu,
    detail:
      "An agent receives a goal in natural language and is responsible for completing it, not for hard-coding every tool it might need.",
  },
  {
    id: "discovery",
    label: "Skill Discovery",
    icon: Boxes,
    detail:
      "Reusable capabilities that can be discovered and composed by agents, matched to the current task from the skill registry.",
  },
  {
    id: "composition",
    label: "Skill Composition",
    icon: Layers,
    detail:
      "Discovered skills are ordered into a task-specific workflow with explicit permissions and observable status per step.",
  },
  {
    id: "mcp",
    label: "MCP / Integrations",
    icon: Plug,
    detail:
      "A standardized interface through which compatible AI applications can interact with exposed tools and resources.",
  },
  {
    id: "systems",
    label: "Enterprise Systems",
    icon: Building2,
    detail:
      "Existing enterprise capabilities — such as Freshworks customer, ticket and knowledge capabilities — accessed through supported integrations.",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const [node, setNode] = useState<(typeof ARCH_NODES)[number] | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Capability Overview"
        subtitle="Discover, compose and govern reusable capabilities for AI agents."
        actions={
          <>
            <SimulatedChip label="Prototype Environment" />
            <button
              type="button"
              onClick={() => navigate({ to: "/playground" })}
              className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/12 px-3 py-1.5 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              Open Agent Playground <ArrowRight className="size-3.5" />
            </button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {dashboardMetrics.map((m) => (
          <div key={m.label} className="panel p-4">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {m.label}
            </p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight">{m.value}</p>
            <p className="mt-0.5 text-[11.5px] text-muted-foreground">{m.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <Panel
          title="How SkillMesh Works"
          description="Click any node to see its role in the capability flow."
        >
          <div className="grid-bg rounded-lg border border-border p-5">
            <ol className="space-y-0">
              {ARCH_NODES.map((n, i) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setNode(n)}
                    className="group flex w-full items-center gap-3 rounded-lg border border-border bg-surface/85 px-4 py-3 text-left transition-colors hover:border-primary/50 hover:bg-primary/8"
                  >
                    <span className="grid size-8 place-items-center rounded-md border border-border bg-surface-raised text-primary">
                      <n.icon className="size-4" />
                    </span>
                    <span className="flex-1 text-[13.5px] font-medium">{n.label}</span>
                    <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {i < ARCH_NODES.length - 1 ? (
                    <div className="flex h-6 justify-center">
                      <svg width="2" height="24" aria-hidden>
                        <line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="24"
                          stroke="var(--primary)"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-flow"
                        />
                      </svg>
                    </div>
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: "Freshworks", icon: Building2 },
                { label: "Knowledge Hub", icon: BookOpen },
                { label: "External APIs", icon: Globe },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-md border border-border bg-surface/80 px-3 py-2 text-center"
                >
                  <s.icon className="mx-auto size-4 text-muted-foreground" />
                  <p className="mt-1 text-[11.5px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel title="Connected Capability Sources">
            <ul className="space-y-2.5">
              {[
                {
                  name: "Freshworks",
                  desc: "Customer / Ticket / Knowledge capabilities",
                  status: "Prototype Connected",
                  tone: "warning" as const,
                  badge: <SimulatedChip />,
                },
                {
                  name: "Knowledge Hub",
                  desc: "Enterprise documentation",
                  status: "Connected",
                  tone: "success" as const,
                  badge: null,
                },
                {
                  name: "External Services",
                  desc: "External enterprise APIs",
                  status: "Connected",
                  tone: "success" as const,
                  badge: null,
                },
              ].map((c) => (
                <li
                  key={c.name}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface-raised/50 px-3.5 py-3"
                >
                  <StatusDot tone={c.tone === "warning" ? "warn" : "ok"} pulse />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium">{c.name}</p>
                    <p className="text-[11.5px] text-muted-foreground">{c.desc}</p>
                  </div>
                  <Chip tone={c.tone}>{c.status}</Chip>
                  {c.badge}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Capability Health">
            <ul className="space-y-2 text-[12.5px]">
              {[
                ["Skills available", "127 / 127", "ok"],
                ["MCP servers", "3 online · 1 degraded", "warn"],
                ["Knowledge sources", "41 indexed · 1 indexing", "warn"],
                ["Recent errors", "2 in last 24h", "ok"],
                ["Approval queue", "3 awaiting review", "warn"],
              ].map(([label, value, tone]) => (
                <li
                  key={label}
                  className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <StatusDot tone={tone as "ok" | "warn"} />
                    {label}
                  </span>
                  <span className="font-medium">{value}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <Panel
        title="Recent Agent Executions"
        actions={
          <Link
            to="/executions"
            className="inline-flex items-center gap-1 text-[12px] text-primary hover:underline"
          >
            View all <ArrowRight className="size-3.5" />
          </Link>
        }
        bodyClassName="p-0"
      >
        <ul>
          {executions.slice(0, 3).map((e) => (
            <li key={e.id}>
              <Link
                to="/executions/$executionId"
                params={{ executionId: e.id }}
                className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)_auto_auto_auto] items-center gap-3 border-b border-border px-5 py-3 transition-colors last:border-0 hover:bg-accent/40"
              >
                <span className="flex items-center gap-2 text-[13px] font-medium">
                  <Activity className="size-3.5 text-primary" />
                  {e.agent}
                </span>
                <span className="truncate text-[12.5px] text-muted-foreground">{e.task}</span>
                <Chip tone={e.status === "Completed" ? "success" : "warning"}>{e.status}</Chip>
                <span className="font-mono text-[11.5px] text-muted-foreground">
                  {e.skills} skills
                </span>
                <span className="w-14 text-right font-mono text-[11.5px] text-muted-foreground">
                  {e.duration}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            to: "/skills" as const,
            label: "Skill Registry",
            desc: "Reusable capabilities agents can discover.",
            icon: Boxes,
          },
          {
            to: "/mcp-tools" as const,
            label: "MCP Tool Registry",
            desc: "Tools exposed through standardized interfaces.",
            icon: Plug,
          },
          {
            to: "/governance" as const,
            label: "Governance",
            desc: "Permissions and human approval policy.",
            icon: ShieldCheck,
          },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className={cn(
              "panel group flex items-center gap-3 p-4 transition-colors hover:border-primary/45",
            )}
          >
            <span className="grid size-9 place-items-center rounded-md border border-border bg-surface-raised text-primary">
              <c.icon className="size-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium">{c.label}</span>
              <span className="block text-[11.5px] text-muted-foreground">{c.desc}</span>
            </span>
            <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <Dialog open={!!node} onOpenChange={(o) => !o && setNode(null)}>
        <DialogContent className="max-w-md">
          {node ? (
            <DialogHeader>
              <DialogTitle>{node.label}</DialogTitle>
              <DialogDescription>{node.detail}</DialogDescription>
            </DialogHeader>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
