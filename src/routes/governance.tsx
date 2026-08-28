import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip } from "@/components/common/Chips";
import { approvalQueue, policyMatrix } from "@/data/mock";
import type { ApprovalRequest } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "Agent Governance — SkillMesh" },
      {
        name: "description",
        content:
          "Control what agents can discover, execute and modify, with an approval queue for sensitive write actions.",
      },
      { property: "og:title", content: "Agent Governance — SkillMesh" },
      {
        property: "og:description",
        content: "Permission matrix and human-in-the-loop approvals for agent actions.",
      },
    ],
  }),
  component: GovernancePage,
});

const accessTone: Record<string, "primary" | "violet" | "warning" | "danger"> = {
  READ: "primary",
  EXECUTE: "violet",
  "APPROVAL REQUIRED": "warning",
  BLOCKED: "danger",
};

function GovernancePage() {
  const [queue, setQueue] = useState<ApprovalRequest[]>(approvalQueue);
  const [review, setReview] = useState<ApprovalRequest | null>(null);

  const decide = (id: string, status: ApprovalRequest["status"]) => {
    setQueue((q) => q.map((r) => (r.id === id ? { ...r, status } : r)));
    setReview(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Governance"
        subtitle="Control what agents can discover, execute and modify."
        actions={<Chip tone="primary">Policy version 4.2</Chip>}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Panel title="Permission Matrix" bodyClassName="p-0">
          <div className="grid grid-cols-[1.1fr_auto_1.3fr] gap-3 border-b border-border bg-surface-raised/60 px-5 py-2.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
            <span>Capability</span>
            <span>Access</span>
            <span>Policy note</span>
          </div>
          <ul>
            {policyMatrix.map((p) => (
              <li
                key={p.capability}
                className="grid grid-cols-[1.1fr_auto_1.3fr] items-center gap-3 border-b border-border px-5 py-3 last:border-0"
              >
                <span className="text-[13px] font-medium">{p.capability}</span>
                <Chip tone={accessTone[p.access]}>{p.access}</Chip>
                <span className="text-[12px] text-muted-foreground">{p.note}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Approval Queue" description="Write actions paused for a human decision.">
          <ul className="space-y-2">
            {queue.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-border bg-surface-raised/50 px-3.5 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-medium">{r.target}</p>
                  <Chip
                    tone={
                      r.status === "Approved"
                        ? "success"
                        : r.status === "Rejected"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {r.status}
                  </Chip>
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  {r.action} · {r.risk} risk · requested by {r.requestedBy}
                </p>
                {r.status === "Awaiting approval" ? (
                  <button
                    type="button"
                    onClick={() => setReview(r)}
                    className="mt-2.5 rounded-md border border-primary/40 bg-primary/12 px-3 py-1.5 text-[12px] font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    Review
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Governance Principles">
        <ul className="grid gap-3 md:grid-cols-3">
          {[
            [
              "Read is autonomous",
              "Read-only capabilities execute without interruption so investigation stays fast.",
            ],
            [
              "Write is reviewed",
              "Any capability that mutates enterprise state pauses for an explicit human decision.",
            ],
            [
              "Everything is traced",
              "Permission checks, approvals and tool calls are recorded in the execution trace.",
            ],
          ].map(([t, d]) => (
            <li key={t} className="rounded-lg border border-border bg-surface-raised/40 p-4">
              <ShieldCheck className="size-4 text-primary" />
              <p className="mt-2 text-[13px] font-semibold">{t}</p>
              <p className="mt-1 text-[12.5px] text-muted-foreground">{d}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Dialog open={!!review} onOpenChange={(o) => !o && setReview(null)}>
        <DialogContent className="max-w-md">
          {review ? (
            <>
              <DialogHeader>
                <DialogTitle>Review approval request</DialogTitle>
                <DialogDescription>
                  {review.action} on {review.target} — {review.risk} risk, requested by{" "}
                  {review.requestedBy}.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => decide(review.id, "Rejected")}
                  className="rounded-md border border-border px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => decide(review.id, "Approved")}
                  className="rounded-md bg-[image:var(--gradient-accent)] px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Approve
                </button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
