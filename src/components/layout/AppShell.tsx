import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  ChevronDown,
  CircuitBoard,
  Command,
  LayoutDashboard,
  PlayCircle,
  Plug,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { PLATFORM } from "@/data/mock";
import { StatusDot } from "@/components/common/StatusDot";
import { Chip } from "@/components/common/Chips";
import { cn } from "@/lib/utils";
import { useDemo } from "@/state/demo";

const nav = [
  {
    group: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Agent",
    items: [
      { to: "/playground", label: "Agent Playground", icon: Terminal },
      { to: "/agents", label: "Agents", icon: Users },
    ],
  },
  {
    group: "Capabilities",
    items: [
      { to: "/skills", label: "Skills", icon: Boxes },
      { to: "/mcp-tools", label: "MCP Tools", icon: Plug },
      { to: "/knowledge", label: "Knowledge", icon: BookOpen },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/executions", label: "Executions", icon: Activity },
      { to: "/governance", label: "Governance", icon: ShieldCheck },
      { to: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    group: "Concept",
    items: [
      { to: "/architecture", label: "Architecture", icon: CircuitBoard },
      { to: "/why-skillmesh", label: "Why SkillMesh?", icon: Sparkles },
    ],
  },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { launchDemo, resetDemo, demoMode } = useDemo();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-border bg-surface/70 lg:flex">
        <Link to="/" className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="grid size-9 place-items-center rounded-lg bg-[image:var(--gradient-accent)] text-primary-foreground">
            <CircuitBoard className="size-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold tracking-tight">{PLATFORM.name}</span>
            <span className="block text-[11px] text-muted-foreground">{PLATFORM.descriptor}</span>
          </span>
        </Link>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {nav.map((section) => (
            <div key={section.group}>
              <p className="px-2 pb-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                {section.group}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors",
                          active
                            ? "bg-primary/12 text-foreground shadow-[inset_2px_0_0_0_var(--primary)]"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
                        )}
                      >
                        <item.icon
                          className={cn("size-4", active ? "text-primary" : "opacity-70")}
                        />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="space-y-3 border-t border-border p-3">
          <div className="rounded-lg border border-border bg-surface-raised/60 p-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Connections
              </span>
              <StatusDot tone="ok" pulse />
            </div>
            <ul className="mt-2 space-y-1.5 text-[11px]">
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Freshworks</span>
                <Chip tone="warning">Simulated</Chip>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">Knowledge Hub</span>
                <Chip tone="success">Online</Chip>
              </li>
              <li className="flex items-center justify-between gap-2">
                <span className="text-muted-foreground">External</span>
                <Chip tone="success">Online</Chip>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2.5 rounded-lg border border-border px-2.5 py-2">
            <span className="grid size-7 place-items-center rounded-md bg-accent text-[11px] font-semibold">
              RS
            </span>
            <span className="leading-tight">
              <span className="block text-[12px] font-medium">Ranjitha S</span>
              <span className="block text-[10px] text-muted-foreground">Platform Engineer</span>
            </span>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md lg:px-6">
          <button
            type="button"
            onClick={() => navigate({ to: "/playground" })}
            className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-surface/70 px-3 text-left text-[13px] text-muted-foreground transition-colors hover:border-border-strong md:max-w-sm"
          >
            <Search className="size-3.5" />
            <span className="truncate">Search capabilities, tools, executions…</span>
            <span className="ml-auto hidden items-center gap-1 font-mono text-[10px] text-muted-foreground md:flex">
              <Command className="size-3" />K
            </span>
          </button>

          <button
            type="button"
            className="hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            Workspace: Freshworks Prototype
            <ChevronDown className="size-3.5" />
          </button>

          <Chip tone="warning" className="hidden sm:inline-flex">
            {PLATFORM.environment}
          </Chip>

          <button
            type="button"
            aria-label="Notifications"
            className="relative hidden size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground sm:grid"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-warning" />
          </button>

          {demoMode ? (
            <button
              type="button"
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset Demo
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => {
              navigate({ to: "/playground" });
              launchDemo();
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-[image:var(--gradient-accent)] px-3 py-1.5 text-[12px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <PlayCircle className="size-4" />
            Launch Demo
          </button>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
