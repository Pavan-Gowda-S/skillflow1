import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface DemoState {
  /** Incremented every time a scripted demo run is requested. */
  runToken: number;
  /** Incremented every time the demo is reset. */
  resetToken: number;
  demoMode: boolean;
  launchDemo: () => void;
  resetDemo: () => void;
  endDemo: () => void;
}

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [runToken, setRunToken] = useState(0);
  const [resetToken, setResetToken] = useState(0);
  const [demoMode, setDemoMode] = useState(false);

  const launchDemo = useCallback(() => {
    setDemoMode(true);
    setRunToken((t) => t + 1);
  }, []);

  const resetDemo = useCallback(() => {
    setResetToken((t) => t + 1);
  }, []);

  const endDemo = useCallback(() => setDemoMode(false), []);

  const value = useMemo(
    () => ({ runToken, resetToken, demoMode, launchDemo, resetDemo, endDemo }),
    [runToken, resetToken, demoMode, launchDemo, resetDemo, endDemo],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
