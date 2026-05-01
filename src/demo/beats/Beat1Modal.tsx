import { useEffect, useRef } from "react";
import type { BeatPersonaCopy } from "../data/beats";

interface Beat1ModalProps {
  copy: BeatPersonaCopy;
  onRun: () => void;
  onSkip: () => void;
}

/**
 * PRD §2.3 — Centered modal (max-width 560px), dimmed backdrop.
 * Two CTAs: "Run the agent →" + "Skip to sandbox" link.
 * Esc dismisses to sandbox; click outside the panel does NOT dismiss
 * (deliberate — the modal is the entry point, not a side trip).
 */
export function Beat1Modal({
  copy,
  onRun,
  onSkip,
}: Beat1ModalProps): JSX.Element {
  const runButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    runButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onSkip();
      if (e.key === "Enter" && document.activeElement === runButtonRef.current) {
        onRun();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onRun, onSkip]);

  return (
    <div
      className="beat1-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="beat1-title"
    >
      <div className="beat1-modal">
        <div
          className="beat1-hero"
          style={{ backgroundImage: `url('${copy.beat1.heroImage}')` }}
          aria-hidden="true"
        >
          <div className="beat1-hero-tag">
            {copy.label.toUpperCase()} · BEAT 1 / 4
          </div>
        </div>
        <div className="beat1-body">
          <h2 id="beat1-title" className="beat1-title">
            {copy.beat1.title}
          </h2>
          <p className="beat1-paragraph">{copy.beat1.body}</p>
          <p className="beat1-closer">{copy.beat1.closer}</p>
          <div className="beat1-actions">
            <button
              ref={runButtonRef}
              className="d-btn d-btn--primary beat1-run"
              onClick={onRun}
              type="button"
            >
              Run the agent <span aria-hidden="true">→</span>
            </button>
            <button
              className="d-btn--link beat1-skip"
              onClick={onSkip}
              type="button"
            >
              Skip to sandbox
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
