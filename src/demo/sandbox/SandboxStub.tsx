import type { BeatPersonaCopy } from "../data/beats";

interface SandboxStubProps {
  copy: BeatPersonaCopy;
  /** Show a small banner inviting the user back to the guided demo. */
  reminder?: boolean;
}

/**
 * Slice 1 placeholder. Renders the dashboard sandbox surface so users who
 * dismiss the Beat 1 modal don't end up on a blank page. The full
 * Beat 2–4 narrative + sandbox unlock + footer CTA bar is Slice 2/3.
 */
export function SandboxStub({ copy, reminder }: SandboxStubProps): JSX.Element {
  return (
    <div className="demo-content">
      {reminder ? (
        <div className="demo-stub-banner" role="status">
          <span className="demo-stub-banner-icon" aria-hidden="true" />
          <span>
            <strong>Sandbox mode.</strong> Pick an industry above for a
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
          Start with a query to analyze the sample videos
        </h1>
      </div>
      <div className="demo-query-card">
        <div className="demo-query-suggested">
          Try one of the queries below — or write your own.
        </div>
        <div className="demo-query-row">
          <input
            className="demo-query-input"
            placeholder="Describe what you want to analyze..."
            data-testid="dashboard-query-input"
          />
          <button
            className="demo-analyze-btn"
            data-testid="dashboard-analyze-button"
            disabled
            type="button"
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
                chip.active ? " demo-chip--active" : ""
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--d-text-subtle)",
          textAlign: "center",
          padding: "32px 0",
          border: "1px dashed var(--d-border)",
          borderRadius: "var(--d-radius-md)",
        }}
      >
        Beat 2–4 results render here once Slice 2 ships.
      </div>
    </div>
  );
}
