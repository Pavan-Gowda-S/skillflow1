import { useCallback, useEffect, useRef, useState } from "react";
import { FreshworksService } from "@/services/freshworks";
import {
  checkPermission,
  compareIncidents,
  recommendResolution,
  requestApproval,
  searchKnowledge,
  type Recommendation,
} from "@/services/skillmesh";
import type { Customer, IncidentMatch, KnowledgeDoc, Ticket, TraceEvent } from "@/data/types";

export type Stage =
  | "idle"
  | "understanding"
  | "discovery"
  | "composition"
  | "execution"
  | "recommendation"
  | "approval"
  | "acting"
  | "completed"
  | "rejected";

export type NodeStatus = "pending" | "running" | "completed" | "blocked" | "skipped";

export interface WorkflowNode {
  id: string;
  name: string;
  source: string;
  permission: string;
  status: NodeStatus;
  durationMs?: number;
  approvalRequired?: boolean;
}

export interface McpCall {
  tool: string;
  system: string;
  input: Record<string, unknown>;
  output: unknown;
  status: "ok" | "pending-approval" | "blocked";
  durationMs: number;
  simulated: boolean;
}

const WORKFLOW: WorkflowNode[] = [
  {
    id: "customer-lookup",
    name: "Customer Lookup",
    source: "Freshworks",
    permission: "READ",
    status: "pending",
  },
  {
    id: "ticket-search",
    name: "Ticket Search",
    source: "Freshworks",
    permission: "READ",
    status: "pending",
  },
  {
    id: "knowledge-search",
    name: "Knowledge Search",
    source: "Knowledge Hub",
    permission: "READ",
    status: "pending",
  },
  {
    id: "incident-detection",
    name: "Similar Incident Detection",
    source: "Incident Intelligence",
    permission: "ANALYSIS",
    status: "pending",
  },
  {
    id: "resolution-recommendation",
    name: "Resolution Recommendation",
    source: "SkillMesh Reasoning",
    permission: "REASONING",
    status: "pending",
  },
  {
    id: "update-ticket",
    name: "Update Ticket",
    source: "Freshworks",
    permission: "WRITE",
    status: "pending",
    approvalRequired: true,
  },
];

export const UNDERSTANDING_ITEMS = [
  "Customer investigation",
  "Historical ticket analysis",
  "Knowledge retrieval",
  "Similar incident analysis",
  "Resolution recommendation",
];

const clock = () => {
  const d = new Date();
  return d.toTimeString().slice(0, 8);
};

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface AgentRunState {
  stage: Stage;
  understanding: number;
  discovered: number;
  nodes: WorkflowNode[];
  calls: McpCall[];
  trace: TraceEvent[];
  customer?: Partial<Customer>;
  tickets: Ticket[];
  relatedTickets: number;
  knowledge: KnowledgeDoc[];
  incidents: IncidentMatch[];
  pattern?: { pattern: string; confidence: string };
  recommendation?: Recommendation;
  approvalOpen: boolean;
  error?: string;
}

const initialState: AgentRunState = {
  stage: "idle",
  understanding: 0,
  discovered: 0,
  nodes: WORKFLOW.map((n) => ({ ...n })),
  calls: [],
  trace: [],
  tickets: [],
  relatedTickets: 0,
  knowledge: [],
  incidents: [],
  approvalOpen: false,
};

export function useAgentRun() {
  const [state, setState] = useState<AgentRunState>(initialState);
  const cancelled = useRef(false);
  const approvalResolver = useRef<((ok: boolean) => void) | null>(null);

  useEffect(
    () => () => {
      cancelled.current = true;
    },
    [],
  );

  const patch = useCallback((p: Partial<AgentRunState>) => {
    setState((s) => ({ ...s, ...p }));
  }, []);

  const addTrace = useCallback((label: string, system: string, status: TraceEvent["status"]) => {
    setState((s) => ({ ...s, trace: [...s.trace, { time: clock(), label, system, status }] }));
  }, []);

  const setNode = useCallback((id: string, p: Partial<WorkflowNode>) => {
    setState((s) => ({
      ...s,
      nodes: s.nodes.map((n) => (n.id === id ? { ...n, ...p } : n)),
    }));
  }, []);

  const addCall = useCallback((c: McpCall) => {
    setState((s) => ({ ...s, calls: [...s.calls, c] }));
  }, []);

  const reset = useCallback(() => {
    cancelled.current = true;
    approvalResolver.current?.(false);
    approvalResolver.current = null;
    setState({ ...initialState, nodes: WORKFLOW.map((n) => ({ ...n })) });
  }, []);

  const approve = useCallback(() => {
    approvalResolver.current?.(true);
    approvalResolver.current = null;
  }, []);

  const reject = useCallback(() => {
    approvalResolver.current?.(false);
    approvalResolver.current = null;
  }, []);

  const run = useCallback(async () => {
    cancelled.current = false;
    setState({ ...initialState, nodes: WORKFLOW.map((n) => ({ ...n })), stage: "understanding" });
    const stop = () => cancelled.current;

    addTrace("Request received", "SkillMesh", "ok");

    // Stage 1 — understanding
    for (let i = 1; i <= UNDERSTANDING_ITEMS.length; i++) {
      await wait(420);
      if (stop()) return;
      patch({ understanding: i });
    }
    addTrace("Task classified", "SkillMesh", "ok");
    await wait(500);
    if (stop()) return;

    // Stage 2 — skill discovery
    patch({ stage: "discovery" });
    for (let i = 1; i <= WORKFLOW.length; i++) {
      await wait(340);
      if (stop()) return;
      patch({ discovered: i });
    }
    addTrace("Skills discovered", "Skill Registry", "ok");
    await wait(650);
    if (stop()) return;

    // Stage 3 — composition
    patch({ stage: "composition" });
    await wait(1100);
    if (stop()) return;

    // Stage 4 — MCP execution
    patch({ stage: "execution" });

    setNode("customer-lookup", { status: "running" });
    const cust = await FreshworksService.lookupCustomer("C1029");
    if (stop()) return;
    setNode("customer-lookup", { status: "completed", durationMs: cust.durationMs });
    addCall({ ...cust, status: "ok" });
    addTrace("Customer Lookup", "Freshworks", "ok");
    patch({ customer: cust.output });
    await wait(280);
    if (stop()) return;

    setNode("ticket-search", { status: "running" });
    const tix = await FreshworksService.searchTickets("C1029", "production synchronization");
    if (stop()) return;
    setNode("ticket-search", { status: "completed", durationMs: tix.durationMs });
    addCall({ ...tix, status: "ok" });
    addTrace("Ticket Search", "Freshworks", "ok");
    patch({ tickets: tix.output.tickets, relatedTickets: tix.output.relatedCount });
    await wait(280);
    if (stop()) return;

    setNode("knowledge-search", { status: "running" });
    const kb = await searchKnowledge("production synchronization failure", 4);
    if (stop()) return;
    setNode("knowledge-search", { status: "completed", durationMs: kb.durationMs });
    addCall({ ...kb, status: "ok" });
    addTrace("Knowledge Search", "Knowledge Hub", "ok");
    patch({ knowledge: kb.output.documents });
    await wait(280);
    if (stop()) return;

    setNode("incident-detection", { status: "running" });
    const inc = await compareIncidents([
      "production sync stopped",
      "no records written",
      "no config change",
    ]);
    if (stop()) return;
    setNode("incident-detection", { status: "completed", durationMs: inc.durationMs });
    addCall({ ...inc, status: "ok" });
    addTrace("Similar Incident Detection", "Incident Intelligence", "ok");
    patch({
      incidents: inc.output.matches,
      pattern: { pattern: inc.output.pattern, confidence: inc.output.confidence },
    });
    await wait(320);
    if (stop()) return;

    // Stage 5 — reasoning / recommendation
    setNode("resolution-recommendation", { status: "running" });
    const rec = await recommendResolution();
    if (stop()) return;
    setNode("resolution-recommendation", { status: "completed", durationMs: rec.durationMs });
    addTrace("Resolution Recommendation", "SkillMesh Reasoning", "ok");
    patch({ recommendation: rec.output, stage: "recommendation" });
    await wait(900);
    if (stop()) return;

    // Stage 6 — governance
    const perm = await checkPermission("ticket.write");
    if (stop()) return;
    addTrace("Permission check", "Governance", "ok");
    if (perm.approvalRequired) {
      await requestApproval("Update Ticket #48291");
      if (stop()) return;
      addTrace("Approval requested", "Governance", "warn");
      setNode("update-ticket", { status: "blocked" });
      addCall({
        tool: "ticket.update",
        system: "Freshworks",
        input: { ticket_id: "48291", note: "…", assignee: "Platform Support" },
        output: { blocked: "awaiting human approval" },
        status: "pending-approval",
        durationMs: 0,
        simulated: true,
      });
      patch({ stage: "approval", approvalOpen: true });

      const approved = await new Promise<boolean>((resolve) => {
        approvalResolver.current = resolve;
      });
      if (stop()) return;
      patch({ approvalOpen: false });

      if (!approved) {
        addTrace("Approval rejected", "Governance", "warn");
        setNode("update-ticket", { status: "skipped" });
        patch({ stage: "rejected", error: "Execution stopped by human approval policy." });
        return;
      }
      addTrace("Human approval received", "Governance", "ok");
    }

    // Stage 7 — action
    patch({ stage: "acting" });
    setNode("update-ticket", { status: "running" });
    const upd = await FreshworksService.updateTicket("48291", {
      note: "Diagnosis: expired authentication token. Refresh token and monitor synchronization.",
      assignee: "Platform Support",
    });
    if (stop()) return;
    setNode("update-ticket", { status: "completed", durationMs: upd.durationMs });
    setState((s) => ({
      ...s,
      calls: s.calls.map((c) =>
        c.tool === "ticket.update"
          ? { ...c, status: "ok", output: upd.output, durationMs: upd.durationMs }
          : c,
      ),
    }));
    addTrace("Ticket updated", "Freshworks", "ok");
    await wait(500);
    if (stop()) return;
    addTrace("Execution completed", "SkillMesh", "ok");
    patch({ stage: "completed" });
  }, [addCall, addTrace, patch, setNode]);

  return { state, run, reset, approve, reject };
}
