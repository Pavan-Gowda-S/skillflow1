import { AlertTriangle, Check, FileText, Lightbulb, Ticket as TicketIcon, User } from "lucide-react";
import { Chip, SimulatedChip } from "@/components/common/Chips";
import { Panel } from "@/components/common/Panel";
import type { Customer, IncidentMatch, KnowledgeDoc, Ticket } from "@/data/types";
import type { Recommendation } from "@/services/skillmesh";

export function CustomerTicketPanel({
  customer,
  tickets,
  relatedTickets,
}: {
  customer?: Partial<Customer>;
  tickets: Ticket[];
  relatedTickets: number;
}) {
  const ticket = tickets[0];
  return (
    <Panel
      title="Freshworks Capability Result"
      description="Customer and ticket data retrieved through the MCP layer."
      actions={<SimulatedChip label="Prototype Simulation" />}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface-raised/50 p-4">
          <p className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            <User className="size-3.5" /> Customer
          </p>
          <p className="text-[15px] font-semibold">{customer?.name ?? "—"}</p>
          <dl className="mt-2 space-y-1 text-[12px] text-muted-foreground">
            <div className="flex justify-between">
              <dt>Status</dt>
              <dd className="text-foreground">{customer?.status ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Account type</dt>
              <dd className="text-foreground">{customer?.accountType ?? "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Region</dt>
              <dd className="text-foreground">{customer?.region ?? "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-surface-raised/50 p-4">
          <p className="mb-2 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            <TicketIcon className="size-3.5" /> Ticket #{ticket?.id ?? "—"}
          </p>
          <p className="text-[15px] font-semibold">{ticket?.subject ?? "—"}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip tone="danger">Priority: {ticket?.priority ?? "—"}</Chip>
            <Chip tone="primary">{ticket?.status ?? "—"}</Chip>
            <Chip tone="neutral">Created {ticket?.createdAgo ?? "—"}</Chip>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">{ticket?.description}</p>
          <p className="mt-3 text-[12px]">
            <span className="font-semibold text-foreground">{relatedTickets}</span>{" "}
            <span className="text-muted-foreground">related historical tickets found</span>
          </p>
        </div>
      </div>
    </Panel>
  );
}

export function KnowledgePanel({ docs }: { docs: KnowledgeDoc[] }) {
  return (
    <Panel
      title="Knowledge Retrieval"
      description='Query: "production synchronization failure"'
      actions={<Chip tone="neutral">Knowledge Hub</Chip>}
    >
      <ul className="space-y-2">
        {docs.map((d) => (
          <li
            key={d.id}
            className="animate-rise rounded-lg border border-border bg-surface-raised/40 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="flex items-center gap-2 text-[13px] font-medium">
                <FileText className="size-3.5 text-primary" />
                {d.title}
              </p>
              <Chip tone="success">{d.relevance}%</Chip>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">{d.excerpt}</p>
            <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground">{d.source}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-muted-foreground">
        3 similar incidents referenced across retrieved documents.
      </p>
    </Panel>
  );
}

export function IncidentPanel({
  matches,
  pattern,
}: {
  matches: IncidentMatch[];
  pattern?: { pattern: string; confidence: string };
}) {
  return (
    <Panel
      title="Incident Intelligence"
      description="Current issue: production synchronization stopped."
      actions={<Chip tone="violet">Analysis</Chip>}
    >
      <ul className="space-y-2">
        {matches.map((m) => (
          <li
            key={m.id}
            className="animate-rise flex items-center gap-3 rounded-lg border border-border bg-surface-raised/40 px-3 py-2.5"
          >
            <span className="font-mono text-[12px] text-primary">Incident {m.id}</span>
            <span className="min-w-0 flex-1 truncate text-[12.5px]">{m.title}</span>
            <Chip tone="neutral">{m.cause}</Chip>
            <div className="w-28">
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-[image:var(--gradient-accent)]"
                  style={{ width: `${m.similarity}%` }}
                />
              </div>
              <p className="mt-1 text-right font-mono text-[10.5px] text-muted-foreground">
                {m.similarity}% similar
              </p>
            </div>
          </li>
        ))}
      </ul>
      {pattern ? (
        <div className="mt-4 rounded-lg border border-violet/40 bg-violet/8 p-3.5">
          <p className="flex items-center gap-2 text-[13px] font-semibold">
            <AlertTriangle className="size-4 text-violet" /> Pattern detected
          </p>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            Likely cause: <span className="text-foreground">{pattern.pattern}</span> · Confidence:{" "}
            <span className="text-foreground">{pattern.confidence}</span>
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Evidence: 3 historical incidents show the same failure pattern.
          </p>
        </div>
      ) : null}
    </Panel>
  );
}

export function RecommendationPanel({
  rec,
  onRequestApproval,
  approvalPending,
}: {
  rec: Recommendation;
  onRequestApproval: () => void;
  approvalPending: boolean;
}) {
  return (
    <Panel
      title="Agent Recommendation"
      actions={<Chip tone="violet">Reasoning</Chip>}
      className="border-primary/30"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Likely cause
          </p>
          <p className="mt-1 flex items-start gap-2 text-[14px] font-medium">
            <Lightbulb className="mt-0.5 size-4 text-warning" />
            {rec.likelyCause}
          </p>
          <p className="mt-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Recommended action
          </p>
          <p className="mt-1 text-[13px]">{rec.recommendedAction}</p>
          <p className="mt-3 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            Evidence
          </p>
          <ul className="mt-1 space-y-1 text-[12.5px] text-muted-foreground">
            {rec.evidence.map((e) => (
              <li key={e} className="flex gap-2">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-warning/40 bg-warning/8 p-4">
          <p className="font-mono text-[10px] tracking-widest text-warning uppercase">
            Proposed action
          </p>
          <p className="mt-1 text-[14px] font-semibold">{rec.proposedAction.title}</p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-muted-foreground">
            {rec.proposedAction.changes.map((c) => (
              <li key={c}>· {c}</li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip tone="warning">{rec.proposedAction.permission}</Chip>
            <Chip tone="warning">Risk: {rec.proposedAction.risk}</Chip>
          </div>
          <button
            type="button"
            onClick={onRequestApproval}
            className="mt-4 w-full rounded-md border border-warning/50 bg-warning/15 px-3 py-2 text-[13px] font-semibold text-warning transition-colors hover:bg-warning/25"
          >
            {approvalPending ? "Awaiting human approval…" : "Request Approval"}
          </button>
        </div>
      </div>
    </Panel>
  );
}

export function ResultPanel({
  skillsUsed,
  mcpCalls,
  approvals,
}: {
  skillsUsed: number;
  mcpCalls: number;
  approvals: number;
}) {
  return (
    <Panel title="Investigation Complete" className="border-success/40" actions={<Chip tone="success">Completed</Chip>}>
      <div className="grid gap-4 md:grid-cols-2">
        <dl className="space-y-2 text-[13px]">
          {[
            ["Customer", "ABC Corporation"],
            ["Issue", "Production synchronization failure"],
            ["Likely cause", "Expired authentication token"],
            ["Recommendation", "Refresh authentication token and monitor synchronization."],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <dt className="w-32 shrink-0 text-muted-foreground">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div>
          <ul className="space-y-1.5 text-[13px]">
            {["Ticket updated", "Diagnosis added", "Assigned to Platform Support"].map((a) => (
              <li key={a} className="flex items-center gap-2">
                <Check className="size-4 text-success" />
                {a}
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[
              ["Skills", String(skillsUsed)],
              ["MCP calls", String(mcpCalls)],
              ["Approvals", String(approvals)],
              ["Status", "Done"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="rounded-md border border-border bg-surface-raised/50 px-2 py-2 text-center"
              >
                <p className="text-[15px] font-semibold">{v}</p>
                <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                  {k}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
