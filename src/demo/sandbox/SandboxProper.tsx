import { useState } from "react";
import {
  type BeatPersonaCopy,
  type DemoPersonaId,
} from "../data/beats";
import { track } from "../../lib/analytics";

interface SandboxProperProps {
  copy: BeatPersonaCopy;
  allPersonas: BeatPersonaCopy[];
  onPersonaSwitch: (id: DemoPersonaId) => void;
  onPrivilegedAction: (action: string) => void;
  /**
   * If this sandbox was reached via "Skip to sandbox" (not via Beat 4),
   * show a small inviter banner.
   */
  reminder?: boolean;
}

/**
 * PRD §2.7 / §2.8 — Post-Beat-4 sandbox surface, OR no-param entry.
 * Industry tabs at top, fully editable query box, sample chips,
 * placeholder result area. Privileged actions (running a custom query
 * on real data, saving, exporting) trigger AccountRequiredDialog.
 */
export function SandboxProper({
  copy,
  allPersonas,
  onPersonaSwitch,
  onPrivilegedAction,
  reminder,
}: SandboxProperProps): JSX.Element {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const handleChip = (label: string): void => {
    setActiveChip(label);
    setQuery(label);
  };

  const handleAnalyze = (): void => {
    if (!query.trim()) return;
    track("demo_sandbox_query_run", {
      persona: copy.id,
      query_length: query.length,
    });
    onPrivilegedAction("Analyze custom query");
  };

  return (
    <div className="demo-content sandbox-proper">
      <div className="beat4-tabs" role="tablist" aria-label="Industry">
        {allPersonas.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === copy.id}
            className={`beat4-tab${
              p.id === copy.id ? " beat4-tab--active" : ""
            }`}
            onClick={() => onPersonaSwitch(p.id)}
          >
            {p.tabLabel}
          </button>
        ))}
      </div>

      {reminder ? (
        <div className="demo-stub-banner" role="status">
          <span className="demo-stub-banner-icon" aria-hidden="true" />
          <span>
            <strong>Sandbox mode.</strong> Pick an industry above for the
            guided 3-minute demo, or run your own query below.
          </span>
        </div>
      ) : null}

      <div>
        <span className="demo-folder-pill">
          <strong>{copy.defaultFolder.name}</strong>
          <span aria-hidden="true">·</span>
          <span>
            {copy.defaultFolder.videoCount} / {copy.defaultFolder.videoCount}{" "}
            videos selected
          </span>
        </span>
        <h1 className="demo-content-heading">
          Try your own query
        </h1>
        <p className="sandbox-helper">
          For example,{" "}
          <em>"find every left turn during heavy rain."</em> Custom
          queries on your own footage require a free Nomadic account.
        </p>
      </div>

      <div className="demo-query-card">
        <div className="demo-query-suggested">
          Edit the suggestion or write your own.
        </div>
        <div className="demo-query-row">
          <textarea
            className="demo-query-textarea"
            data-testid="dashboard-query-input"
            placeholder='Describe what you want to analyze...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={3}
          />
          <button
            type="button"
            className="demo-analyze-btn"
            data-testid="dashboard-analyze-button"
            disabled={!query.trim()}
            onClick={handleAnalyze}
          >
            Analyze
          </button>
        </div>
        <div className="demo-query-chips">
          {copy.beat2Chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              className={`demo-chip${
                activeChip === chip.label ? " demo-chip--active" : ""
              }`}
              onClick={() => handleChip(chip.label)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sandbox-empty-state">
        <div className="sandbox-empty-state-mark" aria-hidden="true">
          ⌖
        </div>
        <div className="sandbox-empty-state-title">
          Ready when you are.
        </div>
        <div className="sandbox-empty-state-desc">
          Run a query above to see Nomadic's results format, or click an
          industry tab to replay a guided 3-minute demo.
        </div>
      </div>
    </div>
  );
}
