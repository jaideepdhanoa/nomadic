import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { track } from "../lib/analytics";
import { RESULTS, type Severity } from "../demo/data/results";
import { BEATS, type DemoPersonaId } from "../demo/data/beats";
import "../demo/styles/demo-tokens.css";
import "./pilot.css";

const SEV_CLASS: Record<Severity, string> = {
  Low: "sev-low",
  Medium: "sev-med",
  High: "sev-high",
};

type Round = "1" | "2";

/**
 * PRD §3.4 — Round 1 → Round 2 results dashboard.
 * URL: /pilot/results/:id?persona=<av|robotics|construction>&round=<1|2>
 *
 * Critical UI requirement: the iteration loop must be the visible
 * product. A user looking at this dashboard for 30 seconds should grok:
 *   1. The agent ran on their data
 *   2. They are now teaching the agent
 *   3. Round 2 will incorporate that teaching
 *   4. This is the architectural pattern, not a one-off output
 */
export function PilotResults(): JSX.Element {
  const { id: pilotId } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const persona = (searchParams.get("persona") ?? "av") as DemoPersonaId;
  const round = (searchParams.get("round") ?? "1") as Round;

  const copy = BEATS[persona] ?? BEATS.av;
  const events = RESULTS[copy.id];

  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [rejectedIds, setRejectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    track("pilot_round1_dashboard_opened", {
      time_since_submit_minutes: 480, // synthetic — 8 hours after submit
    });
  }, []);

  const totalReviewed = acceptedIds.size + rejectedIds.size;
  const reviewedPct = events.length
    ? Math.round((totalReviewed / events.length) * 100)
    : 0;
  const canSubmit = reviewedPct >= 30;

  const handleAccept = (id: string): void => {
    setRejectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setAcceptedIds((prev) => new Set(prev).add(id));
    track("pilot_event_reviewed", { decision: "accept" });
  };
  const handleReject = (id: string): void => {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setRejectedIds((prev) => new Set(prev).add(id));
    track("pilot_event_reviewed", { decision: "reject" });
  };
  const handleSubmitForR2 = (): void => {
    if (!canSubmit) return;
    track("pilot_round2_feedback_submitted", {
      events_reviewed_pct: reviewedPct,
    });
    setSearchParams({ persona, round: "2" });
  };

  return (
    <div className="demo-app pilot-results-page">
      <header className="pilot-header">
        <Link to="/" className="pilot-header-brand" aria-label="Nomadic home">
          <img src="/assets/Nomadic_D1-DQoBnbs9.svg" alt="Nomadic" />
        </Link>
        <div className="pilot-results-header-meta">
          <div className="pilot-results-id">
            Pilot <code>{pilotId}</code>
          </div>
          <span className="pilot-results-persona">
            {copy.label} · {copy.defaultFolder.name}
          </span>
        </div>
      </header>

      <div className="pilot-results-shell">
        <main className="pilot-results-main">
          <div className="pilot-results-progress">
            <div className="pilot-results-progress-head">
              <h1>
                Pilot results — Round {round} of 2
              </h1>
              <span className="pilot-results-progress-pill">
                {round === "1"
                  ? "Awaiting your feedback"
                  : "Refined with your feedback"}
              </span>
            </div>
            <div
              className="pilot-results-progress-bar"
              role="progressbar"
              aria-valuenow={round === "1" ? 50 : 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="pilot-results-progress-rung pilot-results-progress-rung--done">
                <span className="dot" />
                <span>Round 1 complete</span>
              </div>
              <div
                className={`pilot-results-progress-rung${
                  round === "2"
                    ? " pilot-results-progress-rung--done"
                    : " pilot-results-progress-rung--pending"
                }`}
              >
                <span className="dot" />
                <span>
                  {round === "2"
                    ? "Round 2 complete"
                    : "Round 2 (after your feedback)"}
                </span>
              </div>
            </div>
          </div>

          <div className="beat4-banner pilot-results-banner" role="status">
            <div className="beat4-banner-body">
              <div className="beat4-banner-head">
                {round === "1"
                  ? copy.beat4Banner.headline
                  : `Round 2 refined — ${copy.beat4Banner.headline}`}
              </div>
              <div className="beat4-banner-sub">
                {round === "1"
                  ? copy.beat4Banner.body
                  : `${acceptedIds.size} events you accepted are now confirmed. ${rejectedIds.size} refined based on your rejections. New events surfaced after the agent learned your criteria.`}
              </div>
            </div>
          </div>

          <div className="pilot-results-toolbar">
            <span className="demo-folder-pill">
              <strong>{events.length}</strong>
              <span aria-hidden="true">·</span>
              <span>events found · sorted by severity</span>
            </span>
            <div className="pilot-results-toolbar-right">
              <span>{totalReviewed} / {events.length} reviewed</span>
              <button
                type="button"
                className="d-btn d-btn--ghost"
                onClick={() => track("pilot_results_shared", {})}
              >
                Share results →
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
                    <span
                      className={`beat4-sev beat4-sev--${SEV_CLASS[event.severity]}`}
                    >
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
                    {round === "1" ? (
                      <div className="beat4-event-actions">
                        <button
                          type="button"
                          className={`beat4-decision beat4-decision--accept${
                            accepted ? " is-active" : ""
                          }`}
                          onClick={() => handleAccept(event.id)}
                        >
                          ✓ Accept
                        </button>
                        <button
                          type="button"
                          className={`beat4-decision beat4-decision--reject${
                            rejected ? " is-active" : ""
                          }`}
                          onClick={() => handleReject(event.id)}
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
                    ) : (
                      <div className="pilot-results-r2-status">
                        {accepted
                          ? "Confirmed in Round 2 · feedback applied"
                          : rejected
                            ? "Removed in Round 2 · feedback applied"
                            : "Carried over from Round 1"}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>

      <footer className="pilot-results-footer">
        <div className="pilot-results-footer-inner">
          <div>
            <div className="pilot-results-footer-prompt">
              {round === "1" ? (
                <>
                  <strong>{totalReviewed}</strong> of {events.length}{" "}
                  reviewed ({reviewedPct}%) ·{" "}
                  {canSubmit ? (
                    <span>ready to refine in Round 2</span>
                  ) : (
                    <span>review at least 30% to unlock Round 2</span>
                  )}
                </>
              ) : (
                <>
                  Round 2 complete · 30-day paid pilot is the next step{" "}
                  <strong>($25K)</strong>
                </>
              )}
            </div>
            <div className="pilot-results-footer-meta">
              {round === "1"
                ? "Round 2 ready within 24 hours of feedback. The same loop took Bedrock to 98% accuracy."
                : "Larger dataset · unlimited iteration rounds · dedicated Nomadic engineer."}
            </div>
          </div>
          <div className="pilot-results-footer-actions">
            {round === "1" ? (
              <button
                type="button"
                className="d-btn d-btn--primary"
                disabled={!canSubmit}
                onClick={handleSubmitForR2}
              >
                Submit feedback for Round 2 →
              </button>
            ) : (
              <a
                className="d-btn d-btn--primary"
                href="https://calendly.com/nomadicml/20min"
                target="_blank"
                rel="noreferrer"
              >
                Schedule a scoping call
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
