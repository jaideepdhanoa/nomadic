import { useEffect, useRef, useState } from "react";
import type { BeatPersonaCopy } from "../data/beats";

type StepStatus = "pending" | "active" | "done";

interface Beat3NarrationSidebarProps {
  copy: BeatPersonaCopy;
  /** Called after the final step completes — DemoApp advances to Beat 4. */
  onComplete: () => void;
  /** Compact mode: render as a collapsible reasoning panel after Beat 4. */
  compact?: boolean;
  /** When compact, allow toggling visibility. */
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

/**
 * PRD §2.5 — 380px right-side panel that streams the agent's chain of
 * thought. Each step has a 1500–2500ms variable delay (Math.random()).
 * Total Beat 3 duration: 12–18s. Persists into Beat 4 (compact mode).
 */
export function Beat3NarrationSidebar({
  copy,
  onComplete,
  compact = false,
  collapsed = false,
  onToggleCollapse,
}: Beat3NarrationSidebarProps): JSX.Element {
  const [statuses, setStatuses] = useState<StepStatus[]>(() =>
    copy.beat3Steps.map((_, i) => (i === 0 ? "active" : "pending"))
  );
  const completedRef = useRef(false);

  useEffect(() => {
    if (compact) return undefined; // Streaming only happens once.
    let cancelled = false;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const advanceStep = (i: number): void => {
      if (cancelled) return;
      if (i >= copy.beat3Steps.length) {
        if (!completedRef.current) {
          completedRef.current = true;
          // Mark final step done.
          setStatuses((prev) =>
            prev.map((_, idx) =>
              idx === copy.beat3Steps.length - 1 ? "done" : prev[idx]
            )
          );
          window.setTimeout(() => {
            if (!cancelled) onComplete();
          }, 600);
        }
        return;
      }
      // Mark previous step done, current active.
      setStatuses((prev) =>
        prev.map((_, idx) => {
          if (idx < i) return "done";
          if (idx === i) return "active";
          return "pending";
        })
      );
      // Variable delay 1500–2500ms; 200ms when reduced motion.
      const delay = reduceMotion ? 200 : Math.random() * 1000 + 1500;
      window.setTimeout(() => advanceStep(i + 1), delay);
    };

    // Kick off after a short pause so the user sees Beat 3 mount cleanly.
    const startTimer = window.setTimeout(() => advanceStep(1), 800);
    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
    };
    // copy.beat3Steps is stable for a given persona; intentionally exclude.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy.id, compact]);

  const totalSteps = copy.beat3Steps.length;
  const doneCount = statuses.filter((s) => s === "done").length;

  return (
    <aside
      className={`beat3-sidebar${compact ? " beat3-sidebar--compact" : ""}${
        collapsed ? " beat3-sidebar--collapsed" : ""
      }`}
      aria-label="Agent reasoning"
    >
      <header className="beat3-header">
        <div>
          <div className="beat3-tag">
            {compact ? "Agent reasoning" : "Beat 3 of 4 · Live narration"}
          </div>
          <div className="beat3-progress">
            {doneCount} / {totalSteps} steps complete
          </div>
        </div>
        {onToggleCollapse ? (
          <button
            type="button"
            className="beat3-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand reasoning" : "Collapse reasoning"}
          >
            {collapsed ? "↗" : "✕"}
          </button>
        ) : null}
      </header>
      {!collapsed ? (
        <ol className="beat3-steps">
          {copy.beat3Steps.map((step, i) => {
            const status = statuses[i] ?? "pending";
            return (
              <li key={i} className={`beat3-step beat3-step--${status}`}>
                <span className="beat3-step-marker" aria-hidden="true">
                  {status === "done" ? (
                    <svg viewBox="0 0 16 16" width={14} height={14}>
                      <path
                        d="m3.5 8.5 3 3 6-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : status === "active" ? (
                    <span className="beat3-spinner" />
                  ) : (
                    <span className="beat3-pending-dot" />
                  )}
                </span>
                <div className="beat3-step-body">
                  <div className="beat3-step-title">{step.title}</div>
                  <div className="beat3-step-desc">{step.desc}</div>
                </div>
              </li>
            );
          })}
        </ol>
      ) : null}
    </aside>
  );
}
