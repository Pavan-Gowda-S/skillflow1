import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Database, FileText, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Panel } from "@/components/common/Panel";
import { Chip } from "@/components/common/Chips";
import { StatusDot } from "@/components/common/StatusDot";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { knowledgeSources } from "@/data/mock";
import { filterKnowledge } from "@/services/skillmesh";
import type { KnowledgeDoc } from "@/data/types";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub — SkillMesh" },
      {
        name: "description",
        content:
          "Enterprise knowledge sources available to agents, with semantic search over documentation, SOPs and incident reports.",
      },
      { property: "og:title", content: "Knowledge Hub — SkillMesh" },
      {
        property: "og:description",
        content: "Semantic retrieval across enterprise documentation for agent reasoning.",
      },
    ],
  }),
  component: KnowledgePage,
});

function KnowledgePage() {
  const [query, setQuery] = useState("production synchronization failure");
  const [doc, setDoc] = useState<KnowledgeDoc | null>(null);
  const results = filterKnowledge(query === "production synchronization failure" ? "" : query);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge Hub"
        subtitle="Enterprise knowledge available to agents."
        actions={<Chip tone="neutral">All data is mock / demo data</Chip>}
      />

      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {knowledgeSources.map((s) => (
          <div key={s.id} className="panel p-4">
            <Database className="size-4 text-primary" />
            <p className="mt-2 text-[13px] font-medium">{s.name}</p>
            <p className="text-[11.5px] text-muted-foreground">{s.type}</p>
            <p className="mt-2 text-lg font-semibold">{s.documents.toLocaleString()}</p>
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              documents
            </p>
            <p className="mt-2 flex items-center gap-2 text-[11.5px] text-muted-foreground">
              <StatusDot tone={s.status === "Indexed" ? "ok" : "warn"} pulse={s.status !== "Indexed"} />
              {s.status} · {s.lastIndexed}
            </p>
          </div>
        ))}
      </div>

      <Panel title="Semantic Knowledge Search" description="Retrieval used by the Knowledge Search skill.">
        <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-background/60 px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search knowledge"
            className="h-full w-full bg-transparent text-[13.5px] outline-none"
          />
        </div>

        <ul className="mt-4 space-y-2">
          {results.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setDoc(d)}
                className="w-full rounded-lg border border-border bg-surface-raised/40 p-3.5 text-left transition-colors hover:border-primary/45"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="flex items-center gap-2 text-[13px] font-medium">
                    <FileText className="size-3.5 text-primary" />
                    {d.title}
                  </p>
                  <Chip tone="success">{d.relevance}% relevance</Chip>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{d.excerpt}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Chip tone="neutral">{d.source}</Chip>
                  {d.related.map((r) => (
                    <Chip key={r} tone="primary">
                      {r}
                    </Chip>
                  ))}
                </div>
              </button>
            </li>
          ))}
          {results.length === 0 ? (
            <li className="text-[13px] text-muted-foreground">
              No documents matched. Try a broader query.
            </li>
          ) : null}
        </ul>
      </Panel>

      <Dialog open={!!doc} onOpenChange={(o) => !o && setDoc(null)}>
        <DialogContent className="max-w-lg">
          {doc ? (
            <>
              <DialogHeader>
                <DialogTitle>{doc.title}</DialogTitle>
                <DialogDescription>{doc.source}</DialogDescription>
              </DialogHeader>
              <p className="text-[13px] leading-6 text-muted-foreground">{doc.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                <Chip tone="success">{doc.relevance}% relevance</Chip>
                {doc.related.map((r) => (
                  <Chip key={r} tone="primary">
                    Related: {r}
                  </Chip>
                ))}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
