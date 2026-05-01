import { useEffect, useRef, useState } from "react";
import type { BeatPersonaCopy } from "../data/beats";

interface Beat2QueryStageProps {
  copy: BeatPersonaCopy;
  onRun: (queryWasEdited: boolean) => void;
  onSkip: () => void;
}

/**
 * PRD §2.4 — Auto-populated query box with three sample chips below.
 * Chips are visual indicators (active/inactive) — clicking them only
 * highlights; the textarea stays the source of truth.
 */
export function Beat2QueryStage({
  copy,
  onRun,
  onSkip,
}: Beat2QueryStageProps): JSX.Element {
  const [query, setQuery] = useState(copy.beat2Query);
  const initialRef = useRef(copy.beat2Query);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [activeChip, setActiveChip] = useState<string>(
    copy.beat2Chips.find((c) => c.active)?.label ?? ""
  );

  useEffect(() => {
    textareaRef.current?.focus();
    // Cursor at the end (don't auto-select — disrupts editing flow).
    const len = textareaRef.current?.value.length ?? 0;
    textareaRef.current?.setSelectionRange(len, len);
  }, []);

  const handleRun = (): void => {
    if (!query.trim()) return;
    const wasEdited = query.trim() !== initialRef.current.trim();
    onRun(wasEdited);
  };

  return (
    <div className="demo-content beat2-stage">
      <div className="beat2-meta">
        <span className="demo-folder-pill">
          <strong>{copy.defaultFolder.name}</strong>
          <span aria-hidden="true">·</span>
          <span>
            {copy.defaultFolder.videoCount} / {copy.defaultFolder.videoCount}{" "}
            videos selected
          </span>
        </span>
        <span className="beat2-step">Beat 2 of 4 · Auto-populated query</span>
      </div>
      <h1 className="beat2-heading">
        {copy.beat1.title.replace(/^The /, "").replace(/ problem$/, "")
          .replace(/^./, (m) => m.toUpperCase())}
        <span className="beat2-heading-accent"> · the agent's query</span>
      </h1>
      <div className="demo-query-card">
        <div className="beat2-suggested">
          Suggested query <span aria-hidden="true">—</span> click Run, or
          edit first.
        </div>
        <div className="beat2-query-row">
          <textarea
            ref={textareaRef}
            className="demo-query-textarea"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to analyze..."
            data-testid="dashboard-query-input"
            rows={4}
          />
          <div className="beat2-actions">
            <button
              type="button"
              className="demo-analyze-btn beat2-run-btn"
              onClick={handleRun}
              disabled={!query.trim()}
              data-testid="dashboard-analyze-button"
            >
              Run <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              className="d-btn--link beat2-skip"
              onClick={onSkip}
            >
              Skip to sandbox
            </button>
          </div>
        </div>
        <div className="demo-query-chips">
          {copy.beat2Chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className={`demo-chip${
                activeChip === chip.label ? " demo-chip--active" : ""
              }`}
              onClick={() => setActiveChip(chip.label)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      <p className="beat2-helper">
        This is the prompt a Nomadic engineer would run on this dataset.
        Edit it if you'd like — the agent will run against the same{" "}
        <strong>{copy.defaultFolder.name}</strong> footage either way.
      </p>
    </div>
  );
}
