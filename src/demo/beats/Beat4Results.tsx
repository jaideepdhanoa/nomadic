import { useState } from "react";
import type { BeatPersonaCopy } from "../data/beats";
import { RESULTS, type DemoEvent, type Severity } from "../data/results";

interface Beat4ResultsProps {
  copy: BeatPersonaCopy;
  /** Industry-tab switch handler (sandbox unlock state) */
  onPersonaSwitch: (id: BeatPersonaCopy["id"]) => void;
  /** Other personas the user can pivot to */
  allPersonas: BeatPersonaCopy[];
}

const SEV_CLASS: Record<Severity, string> = {
  Low: "sev-low",
  Medium: "sev-med",
  High: "sev-high",
};

/**
 * PRD §2.6 — Persistent value banner at top, collapsible (× icon) but
 * does NOT auto-dismiss. Below: industry tabs (sandbox-unlock pattern
 * §2.7) + the event list. Each event has thumbnail, title, reasoning,
 * timestamp, severity badge, confidence, and Accept/Reject/Modify
 * buttons (placeholder — Slice 3 wires real interactions).
 */
export function Beat4Results({
  copy,
  onPersonaSwitch,
  allPersonas,
}: Beat4ResultsProps): JSX.Element {
  const [bannerCollapsed, setBannerCollapsed] = useState(false);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());

  const events = RESULTS[copy.id];

  const handleAccept = (e: DemoEvent): void => {
    setRejectedIds((prev) => {
      const next = new Set(prev);
      next.delete(e.id);
      return next;
    });
    setAcceptedIds((prev) => new Set(prev).add(e.id));
  };
  const handleReject = (e: DemoEvent): void => {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      next.delete(e.id);
      return next;
    });
    setRejectedIds((prev) => new Set(prev).add(e.id));
  };

  return (
    <div className="demo-content beat4-stage">
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

      {!bannerCollapsed ? (
        <div className="beat4-banner" role="status">
          <div className="beat4-banner-body">
            <div className="beat4-banner-head">
              {copy.beat4Banner.headline}
            </div>
            <div className="beat4-banner-sub">{copy.beat4Banner.body}</div>
          </div>
          <button
            type="button"
            className="beat4-banner-dismiss"
            onClick={() => setBannerCollapsed(true)}
            aria-label="Collapse banner"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="beat4-banner-collapsed"
          onClick={() => setBannerCollapsed(false)}
        >
          ▸ {copy.beat4Banner.headline}
        </button>
      )}

      <div className="beat4-toolbar">
        <div className="beat4-toolbar-left">
          <span className="demo-folder-pill">
            <strong>{events.length}</strong>
            <span aria-hidden="true">·</span>
            <span>events shown · sorted by severity</span>
          </span>
        </div>
        <div className="beat4-toolbar-right">
          <span className="beat4-review-counter">
            {acceptedIds.size + rejectedIds.size} / {events.length} reviewed
          </span>
          <button type="button" className="d-btn d-btn--ghost">
            Share results
          </button>
        </div>
      </div>

      <ul className="beat4-events">
        {events.map((event) => {
          const accepted = acceptedIds.has(event.id);
          const rejected = rejectedIds.has(event.id);
          return (
            <li
              key={event.id}
              className={`beat4-event${accepted ? " beat4-event--accepted" : ""}${
                rejected ? " beat4-event--rejected" : ""
              }`}
            >
              <div
                className="beat4-event-thumb"
                style={{ backgroundImage: `url('${event.thumbnail}')` }}
                aria-hidden="true"
              >
                <span className={`beat4-sev beat4-sev--${SEV_CLASS[event.severity]}`}>
                  {event.severity}
                </span>
              </div>
              <div className="beat4-event-body">
                <div className="beat4-event-title-row">
                  <h3 className="beat4-event-title">{event.title}</h3>
                  <span className="beat4-event-meta">
                    {event.timestamp} · {event.clip} ·{" "}
                    {Math.round(event.confidence * 100)}% confidence
                  </span>
                </div>
                <p className="beat4-event-reasoning">
                  <span className="beat4-event-reasoning-tag">Why:</span>{" "}
                  {event.reasoning}
                </p>
                <div className="beat4-event-actions">
                  <button
                    type="button"
                    className={`beat4-decision beat4-decision--accept${
                      accepted ? " is-active" : ""
                    }`}
                    onClick={() => handleAccept(event)}
                  >
                    ✓ Accept
                  </button>
                  <button
                    type="button"
                    className={`beat4-decision beat4-decision--reject${
                      rejected ? " is-active" : ""
                    }`}
                    onClick={() => handleReject(event)}
                  >
                    ✗ Reject
                  </button>
                  <button
                    type="button"
                    className="beat4-decision beat4-decision--modify"
                  >
                    Modify…
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
