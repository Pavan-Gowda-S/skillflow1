import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip } from "@/components/common/Chips";
import { TraceTimeline } from "@/components/playground/TraceTimeline";
import { executions } from "@/data/mock";

export const Route = createFileRoute("/executions/$executionId")({
  head: () => ({
    meta: [
      { title: "Execution Trace — SkillMesh" },
      {
        name: "description",
        content:
          "Step-by-step execution trace for an agent run, including skills, MCP calls, permission checks and approvals.",
      },
      { property: "og:title", content: "Execution Trace — SkillMesh" },
      {
        property: "og:description",
        content: "Every agent step is observable and auditable.",
      },
    ],
  }),
  component: ExecutionDetail,
});

function ExecutionDetail() {
  const { executionId } = Route.useParams();
  const exec = executions.find((e) => e.id === executionId);

  if (!exec) {
    return (
      <div className="space-y-4">
        <PageHeader title="Execution not found" subtitle={`No record for ${executionId}.`} />
        <Link to="/executions" className="text-[13px] text-primary hover:underline">
          Back to executions
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/executions"
        className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All executions
      </Link>

      <PageHeader
        title={exec.task}
        subtitle={`${exec.agent} · execution ${exec.id}`}
        actions={<Chip tone={exec.status === "Completed" ? "success" : "warning"}>{exec.status}</Chip>}
      />

      <div className="grid gap-3 sm:grid-cols-4">
        {[
          ["Skills used", String(exec.skills)],
          ["MCP calls", String(exec.tools)],
          ["Human approvals", String(exec.approvals)],
          ["Duration", exec.duration],
        ].map(([k, v]) => (
          <div key={k} className="panel p-4">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
              {k}
            </p>
            <p className="mt-1 text-xl font-semibold">{v}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Panel title="Execution Trace">
          <TraceTimeline events={exec.timeline} />
        </Panel>
        <Panel title="Result">
          <p className="text-[13px] leading-6 text-muted-foreground">{exec.result}</p>
        </Panel>
      </div>
    </div>
  );
}
