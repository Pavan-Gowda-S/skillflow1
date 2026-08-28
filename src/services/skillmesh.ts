/**
 * Simulated SkillMesh capability services (knowledge, incident intelligence,
 * reasoning, governance). Mock data + simulated latency, prototype only.
 */
import { incidentMatches, knowledgeDocs } from "@/data/mock";
import type { IncidentMatch, KnowledgeDoc } from "@/data/types";
import type { CallEnvelope } from "./freshworks";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function searchKnowledge(
  query: string,
  topK = 4,
): Promise<CallEnvelope<{ documents: KnowledgeDoc[] }>> {
  await delay(740);
  const documents = knowledgeDocs
    .filter(
      (d) =>
        query.trim().length === 0 ||
        true,
    )
    .slice(0, topK);
  return {
    tool: "knowledge.search",
    system: "Knowledge Hub",
    input: { query, top_k: topK },
    output: { documents },
    durationMs: 740,
    simulated: true,
  };
}

export function filterKnowledge(query: string): KnowledgeDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return knowledgeDocs;
  return knowledgeDocs.filter(
    (d) =>
      d.title.toLowerCase().includes(q) ||
      d.excerpt.toLowerCase().includes(q) ||
      d.source.toLowerCase().includes(q),
  );
}

export async function compareIncidents(
  symptoms: string[],
): Promise<
  CallEnvelope<{ matches: IncidentMatch[]; pattern: string; confidence: string }>
> {
  await delay(680);
  return {
    tool: "incident.compare",
    system: "Incident Intelligence",
    input: { symptoms, window_days: 180 },
    output: {
      matches: incidentMatches,
      pattern: "Expired authentication token",
      confidence: "High",
    },
    durationMs: 680,
    simulated: true,
  };
}

export interface Recommendation {
  likelyCause: string;
  recommendedAction: string;
  confidence: string;
  evidence: string[];
  proposedAction: { title: string; changes: string[]; permission: string; risk: string };
}

export async function recommendResolution(): Promise<CallEnvelope<Recommendation>> {
  await delay(560);
  return {
    tool: "resolution.recommend",
    system: "SkillMesh Reasoning",
    input: { context: "ticket_48291 + knowledge + incident_matches" },
    output: {
      likelyCause: "Expired authentication token.",
      recommendedAction: "Refresh the authentication token and monitor synchronization.",
      confidence: "High",
      evidence: [
        "3 similar historical incidents with the same failure pattern",
        "Relevant troubleshooting documentation (96% relevance)",
        "Current ticket metadata for #48291",
      ],
      proposedAction: {
        title: "Update Ticket #48291",
        changes: [
          "Add diagnosis",
          "Assign to Platform Support",
          "Add troubleshooting recommendation",
        ],
        permission: "ticket.write",
        risk: "Medium",
      },
    },
    durationMs: 560,
    simulated: true,
  };
}

export async function checkPermission(
  capability: string,
): Promise<{ capability: string; allowed: boolean; approvalRequired: boolean }> {
  await delay(300);
  const approvalRequired = capability.endsWith(".write");
  return { capability, allowed: true, approvalRequired };
}

export async function requestApproval(action: string): Promise<{ id: string; action: string }> {
  await delay(240);
  return { id: `apr-${Math.floor(Math.random() * 9000 + 1000)}`, action };
}
