export type Permission = "READ" | "WRITE" | "ANALYSIS" | "REASONING" | "EXECUTE";

export type SourceSystem =
  | "Freshworks"
  | "Knowledge Hub"
  | "Incident Intelligence"
  | "SkillMesh Reasoning"
  | "External Services";

export type SkillCategory =
  | "Customer"
  | "Support"
  | "Knowledge"
  | "Analysis"
  | "Reasoning"
  | "Workflow"
  | "External";

export interface Skill {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  source: SourceSystem;
  permission: Permission;
  inputs: string[];
  outputs: string[];
  usage: number;
  agents: number;
  approvalRequired: boolean;
  simulated: boolean;
}

export interface McpTool {
  id: string;
  name: string;
  description: string;
  server: string;
  source: SourceSystem;
  permission: Permission;
  status: "Available" | "Degraded" | "Unavailable";
  approvalRequired: boolean;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  simulated: boolean;
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  documents: number;
  status: "Indexed" | "Indexing" | "Degraded";
  lastIndexed: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  source: string;
  relevance: number;
  excerpt: string;
  related: string[];
}

export interface AgentDef {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Paused";
  skills: string[];
  permissions: string[];
  executionCount: number;
  successRate: number;
}

export interface TraceEvent {
  time: string;
  label: string;
  system: string;
  status: "ok" | "warn" | "pending";
}

export interface ExecutionRecord {
  id: string;
  agent: string;
  task: string;
  skills: number;
  tools: number;
  approvals: number;
  duration: string;
  status: "Completed" | "Stopped" | "Failed";
  timeline: TraceEvent[];
  result: string;
}

export interface Customer {
  id: string;
  name: string;
  status: string;
  accountType: string;
  region: string;
}

export interface Ticket {
  id: string;
  customer: string;
  subject: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: string;
  createdAgo: string;
  description: string;
}

export interface IncidentMatch {
  id: string;
  title: string;
  similarity: number;
  cause: string;
  resolvedIn: string;
}

export interface PolicyRule {
  capability: string;
  access: "READ" | "EXECUTE" | "APPROVAL REQUIRED" | "BLOCKED";
  note: string;
}

export interface ApprovalRequest {
  id: string;
  target: string;
  action: string;
  risk: "Low" | "Medium" | "High";
  status: "Awaiting approval" | "Approved" | "Rejected";
  requestedBy: string;
}
