import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eraser, Play, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip, PermissionChip, SimulatedChip } from "@/components/common/Chips";
import { WorkflowGraph } from "@/components/playground/WorkflowGraph";
import { McpConsole } from "@/components/playground/McpConsole";
import { TraceTimeline } from "@/components/playground/TraceTimeline";
import { ApprovalModal } from "@/components/playground/ApprovalModal";
import {
  CustomerTicketPanel,
  IncidentPanel,
  KnowledgePanel,
  RecommendationPanel,
  ResultPanel,
} from "@/components/playground/panels";
import { UNDERSTANDING_ITEMS, useAgentRun } from "@/components/playground/useAgentRun";
import { DEMO_TASK, EXAMPLE_TASKS, skills } from "@/data/mock";
import { useDemo } from "@/state/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Agent Playground — SkillMesh Agent Capability Platform" },
      {
        name: "description",
        content:
          "Give an agent a goal and watch it discover, compose and govern reusable enterprise capabilities through MCP.",
      },
      { property: "og:title", content: "Agent Playground — SkillMesh" },
      {
        property: "og:description",
        content:
          "Skill discovery, composition, MCP execution, governance and execution trace in one live prototype run.",
      },
    ],
  }),
  component: PlaygroundPage,
});

const STAGES = [
  { key: "understanding", label: "Understand" },
  { key: "discovery", label: "Discover Skills" },
  { key: "composition", label: "Compose" },
  { key: "execution", label: "MCP Execution" },
  { key: "recommendation", label: "Recommendation" },
  { key: "approval", label: "Approval" },
  { key: "completed", label: "Completed" },
] as const;

const ORDER: Record<string, number> = {
  idle: -1,
  understanding: 0,
  discovery: 1,
  composition: 2,
  execution: 3,
  recommendation: 4,
  approval: 5,
  acting: 5,
  completed: 6,
  rejected: 5,
};

const DISCOVERY_SKILLS = [
  "customer-lookup",
  "ticket-search",
  "knowledge-search",
  "incident-detection",
  "resolution-recommendation",
  "update-ticket",
];

function PlaygroundPage() {
  const [task, setTask] = useState(DEMO_TASK);
  const { state, run, reset, approve, reject } = useAgentRun();
  const { runToken, resetToken } = useDemo();
  const [manualApprovalOpen, setManualApprovalOpen] = useState(false);

  useEffect(() => {
    if (runToken > 0) {
      setTask(DEMO_TASK);
      void run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runToken]);

  useEffect(() => {
    if (resetToken > 0) {
      setTask(DEMO_TASK);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetToken]);

  const busy = state.stage !== "idle" && state.stage !== "completed" && state.stage !== "rejected";
  const currentIndex = ORDER[state.stage] ?? -1;
  const discovered = skills.filter((s) => DISCOVERY_SKILLS.includes(s.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Playground"
        subtitle="Give an agent a goal. Let it discover and compose the capabilities required to complete it."
        actions={
          <>
            <SimulatedChip label="Prototype Environment" />
            {state.stage !== "idle" ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3.5" /> Replay
              </button>
            ) : null}
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <Panel bodyClassName="p-4">
            <label htmlFor="task" className="sr-only">
              Agent task
            </label>
            <textarea
              id="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-border bg-background/60 px-4 py-3 text-[14px] leading-6 outline-none focus:border-primary/60 focus:ring-2 focus:ring-ring/30"
              placeholder="Describe the goal you want the agent to achieve…"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={busy || task.trim().length === 0}
                onClick={() => void run()}
                className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-accent)] px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Play className="size-4" />
                {busy ? "Agent running…" : "Run Agent"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTask("");
                  reset();
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Eraser className="size-4" /> Clear
              </button>
              <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                Agent: Investigation Agent · 6 skills available
              </span>
            </div>

            <div className="mt-4 border-t border-border pt-3">
              <p className="mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Example tasks
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_TASKS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTask(t)}
                    className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          {/* Stage rail */}
          <div className="panel flex flex-wrap items-center gap-1.5 p-3">
            {STAGES.map((s, i) => {
              const done = currentIndex > i;
              const active = currentIndex === i;
              return (
                <div key={s.key} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide uppercase transition-colors",
                      active
                        ? "border-primary/50 bg-primary/12 text-primary"
                        : done
                          ? "border-success/40 bg-success/10 text-success"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                  {i < STAGES.length - 1 ? (
                    <span
                      className={cn("h-px w-4", done ? "bg-success/60" : "bg-border-strong")}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          {state.stage === "idle" ? (
            <Panel title="Ready" description="The agent has not been given a goal yet.">
              <p className="text-[13px] text-muted-foreground">
                Press <span className="text-foreground">Run Agent</span> to watch the agent
                understand the task, discover reusable skills, compose a workflow, execute through
                MCP against simulated Freshworks capabilities, retrieve knowledge, request human
                approval for the write action, and emit a full execution trace.
              </p>
            </Panel>
          ) : null}

          {currentIndex >= 0 ? (
            <Panel title="Understanding Request" actions={<Chip tone="primary">Stage 1</Chip>}>
              <p className="mb-3 text-[13px] text-muted-foreground">{task}</p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {UNDERSTANDING_ITEMS.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-[12.5px] transition-colors",
                      state.understanding > i
                        ? "border-success/40 bg-success/8 text-foreground"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[12px]",
                        state.understanding > i ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      {state.understanding > i ? "✓" : "·"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          ) : null}

          {currentIndex >= 1 ? (
            <Panel
              title="Discovering Required Skills"
              description="Reusable capabilities matched from the skill registry."
              actions={<Chip tone="primary">Stage 2</Chip>}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {discovered.slice(0, Math.max(state.discovered, currentIndex >= 2 ? 6 : 0)).map(
                  (s, i) => (
                    <div
                      key={s.id}
                      className="animate-rise rounded-lg border border-border bg-surface-raised/50 p-3"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[13px] font-medium">{s.name}</p>
                        <PermissionChip permission={s.permission} />
                      </div>
                      <p className="mt-1 font-mono text-[10.5px] text-muted-foreground">
                        {s.category} · {s.source}
                      </p>
                      {s.approvalRequired ? (
                        <Chip tone="warning" className="mt-2">
                          Approval required
                        </Chip>
                      ) : null}
                    </div>
                  ),
                )}
              </div>
            </Panel>
          ) : null}

          {currentIndex >= 2 ? (
            <Panel
              title="Generated Capability Workflow"
              description="The agent composed these skills for this specific task."
              actions={<Chip tone="primary">Stage 3</Chip>}
            >
              <WorkflowGraph nodes={state.nodes} />
            </Panel>
          ) : null}

          {currentIndex >= 3 ? (
            <Panel
              title="MCP Execution"
              description="Standardized tool calls routed through the integration layer."
              actions={<SimulatedChip label="Prototype Simulation" />}
            >
              <McpConsole calls={state.calls} running={busy} />
            </Panel>
          ) : null}

          {state.customer ? (
            <CustomerTicketPanel
              customer={state.customer}
              tickets={state.tickets}
              relatedTickets={state.relatedTickets}
            />
          ) : null}

          {state.knowledge.length > 0 ? <KnowledgePanel docs={state.knowledge} /> : null}

          {state.incidents.length > 0 ? (
            <IncidentPanel matches={state.incidents} pattern={state.pattern} />
          ) : null}

          {state.recommendation ? (
            <RecommendationPanel
              rec={state.recommendation}
              approvalPending={state.stage === "approval"}
              onRequestApproval={() => setManualApprovalOpen(true)}
            />
          ) : null}

          {state.stage === "rejected" ? (
            <Panel title="Execution Stopped" className="border-destructive/40">
              <p className="text-[13px] text-destructive">{state.error}</p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">
                No write action was performed. The read-only findings above remain available and
                the full trace is preserved for audit.
              </p>
            </Panel>
          ) : null}

          {state.stage === "completed" ? (
            <ResultPanel
              skillsUsed={state.nodes.filter((n) => n.status === "completed").length}
              mcpCalls={state.calls.length}
              approvals={1}
            />
          ) : null}
        </div>

        {/* Right rail */}
        <div className="space-y-6 xl:sticky xl:top-20 xl:self-start">
          <Panel
            title="Execution Trace"
            description="Every step is observable and auditable."
            bodyClassName="p-5 max-h-[560px] overflow-y-auto"
          >
            <TraceTimeline events={state.trace} />
          </Panel>

          <Panel title="Run Summary">
            <dl className="space-y-2 text-[12.5px]">
              {[
                ["Agent", "Investigation Agent"],
                ["Skills composed", String(state.nodes.length)],
                ["MCP calls", String(state.calls.length)],
                ["Approvals", state.stage === "completed" ? "1" : "—"],
                [
                  "Status",
                  state.stage === "idle"
                    ? "Ready"
                    : state.stage === "completed"
                      ? "Completed"
                      : state.stage === "rejected"
                        ? "Stopped"
                        : "Running",
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
        </div>
      </div>

      <ApprovalModal
        open={state.approvalOpen || manualApprovalOpen}
        onApprove={() => {
          setManualApprovalOpen(false);
          approve();
        }}
        onReject={() => {
          setManualApprovalOpen(false);
          reject();
        }}
      />
    </div>
  );
}
