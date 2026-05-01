import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ACCEPTED_FORMATS,
  BLOCKED_HINTS,
  SCENARIOS,
  type ScenarioKey,
} from "./data/pilotCopy";
import { track } from "../lib/analytics";
import "../demo/styles/demo-tokens.css";
import "./pilot.css";

type Step = 1 | 2 | 3 | 4;

interface ClipFile {
  id: string;
  name: string;
  sizeMb: number;
  /** Soft warnings populated at "upload" time. */
  warnings: string[];
}

/** PRD §3.3 — Self-serve pilot 4-step wizard. */
export function PilotUpload(): JSX.Element {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [scenario, setScenario] = useState<ScenarioKey | null>(null);
  const [otherDescription, setOtherDescription] = useState("");
  const [clips, setClips] = useState<ClipFile[]>([]);
  const [formatBlock, setFormatBlock] = useState<string | null>(null);
  const [chosenPrompt, setChosenPrompt] = useState("");
  const [usedSuggestion, setUsedSuggestion] = useState<number | null>(null);

  const goNext = (): void =>
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));

  const handleStep1Continue = (): void => {
    if (!scenario) return;
    if (scenario === "other" && !otherDescription.trim()) return;
    track("pilot_upload_step1_completed", { scenario });
    goNext();
  };

  const handleAddSampleClips = (): void => {
    track("pilot_upload_step2_started", {});
    // Populate with 3 representative sample clips so the demo isn't empty.
    setClips([
      {
        id: "clip-1",
        name: "fleet_run_2025-04-12_session-A.mp4",
        sizeMb: 142,
        warnings: [],
      },
      {
        id: "clip-2",
        name: "fleet_run_2025-04-12_session-B.mp4",
        sizeMb: 168,
        warnings: [],
      },
      {
        id: "clip-3",
        name: "fleet_run_2025-04-12_session-C.mp4",
        sizeMb: 124,
        warnings: ["Low resolution — agent accuracy may be reduced."],
      },
    ]);
  };

  const handleFakeUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const lower = file.name.toLowerCase();
    const blocked = BLOCKED_HINTS.find((b) => lower.endsWith(b.ext));
    if (blocked) {
      setFormatBlock(blocked.label);
      track("pilot_upload_format_blocked", { format: blocked.ext });
      return;
    }
    if (!ACCEPTED_FORMATS.some((ext) => lower.endsWith(ext))) {
      setFormatBlock("unsupported");
      track("pilot_upload_format_blocked", { format: lower.split(".").pop() ?? "" });
      return;
    }
    setClips((prev) => [
      ...prev,
      {
        id: `clip-${Date.now()}`,
        name: file.name,
        sizeMb: Math.round(file.size / (1024 * 1024)),
        warnings: [],
      },
    ]);
    e.target.value = "";
  };

  const handleStep2Continue = (): void => {
    if (clips.length < 2) return;
    track("pilot_upload_step2_completed", {
      clip_count: clips.length,
      total_size_mb: clips.reduce((s, c) => s + c.sizeMb, 0),
    });
    goNext();
  };

  const handleStep3Continue = (): void => {
    if (!chosenPrompt.trim()) return;
    track("pilot_upload_step3_completed", {
      used_suggestion: usedSuggestion !== null,
      suggestion_index: usedSuggestion,
    });
    goNext();
  };

  const removeClip = (id: string): void =>
    setClips((prev) => prev.filter((c) => c.id !== id));

  const activeScenario =
    scenario && scenario !== "other"
      ? SCENARIOS.find((s) => s.id === scenario)
      : undefined;

  return (
    <div className="demo-app pilot-page">
      <header className="pilot-header">
        <Link to="/" className="pilot-header-brand" aria-label="Nomadic home">
          <img src="/assets/Nomadic_D1-DQoBnbs9.svg" alt="Nomadic" />
        </Link>
        <div className="pilot-progress" aria-label={`Step ${step} of 4`}>
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`pilot-progress-dot${
                n === step ? " is-current" : ""
              }${n < step ? " is-done" : ""}`}
            >
              <span>{n}</span>
              <em>
                {n === 1
                  ? "Scenario"
                  : n === 2
                    ? "Upload"
                    : n === 3
                      ? "Query"
                      : "Confirm"}
              </em>
            </div>
          ))}
        </div>
      </header>

      <div className="pilot-shell">
        <main className="pilot-main">
          {step === 1 ? (
            <section>
              <h1 className="pilot-h1">What scenario do you want to test?</h1>
              <p className="pilot-sub">
                Pick the closest match. We'll auto-suggest queries based on
                your choice.
              </p>
              <div className="pilot-scenarios">
                {SCENARIOS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className={`pilot-scenario-card${
                      scenario === opt.id ? " is-selected" : ""
                    }`}
                    onClick={() => setScenario(opt.id)}
                    aria-pressed={scenario === opt.id}
                  >
                    <div className="pilot-scenario-title">{opt.title}</div>
                    <div className="pilot-scenario-desc">{opt.description}</div>
                  </button>
                ))}
              </div>
              {scenario === "other" ? (
                <textarea
                  className="pilot-other-input"
                  placeholder="Describe what you want Nomadic to find. Be specific — agents work better with concrete questions."
                  value={otherDescription}
                  onChange={(e) => setOtherDescription(e.target.value)}
                  rows={4}
                />
              ) : null}
              <div className="pilot-actions-row">
                <button
                  type="button"
                  className="d-btn d-btn--primary"
                  disabled={
                    !scenario ||
                    (scenario === "other" && !otherDescription.trim())
                  }
                  onClick={handleStep1Continue}
                >
                  Next <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section>
              <h1 className="pilot-h1">
                Upload 2 to 10 clips of one specific scenario.
              </h1>
              <p className="pilot-sub">
                This is a capability check, not a full evaluation. Send
                the clips that best represent the problem you want solved.
              </p>

              {formatBlock ? (
                <div className="pilot-format-trap" role="alert">
                  <div className="pilot-format-trap-head">
                    We can't process{" "}
                    <strong>
                      {formatBlock === "unsupported"
                        ? "this format"
                        : formatBlock}
                    </strong>{" "}
                    in self-serve.
                  </div>
                  <div className="pilot-format-trap-body">
                    Sensor data formats like ROS bags, HDF5, and proprietary
                    recordings need a concierge pilot. We handle these on
                    the call.
                  </div>
                  <div className="pilot-format-trap-actions">
                    <a
                      className="d-btn d-btn--primary"
                      href="https://calendly.com/nomadicml/20min"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Talk to an engineer{" "}
                      <span aria-hidden="true">→</span>
                    </a>
                    <button
                      type="button"
                      className="d-btn--link"
                      onClick={() => setFormatBlock(null)}
                    >
                      Try a different file
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="pilot-upload-grid">
                <div className="pilot-uploader">
                  <label className="pilot-drop">
                    <div className="pilot-drop-icon" aria-hidden="true">
                      ⤒
                    </div>
                    <div className="pilot-drop-headline">
                      Drop clips here, or click to browse
                    </div>
                    <div className="pilot-drop-meta">
                      .mp4 (preferred), .mov, .avi, .webm · max 500MB each ·
                      2–10 clips
                    </div>
                    <input
                      type="file"
                      className="pilot-drop-input"
                      onChange={handleFakeUpload}
                      accept={ACCEPTED_FORMATS.join(",")}
                    />
                  </label>
                  <button
                    type="button"
                    className="d-btn--link pilot-sample-btn"
                    onClick={handleAddSampleClips}
                  >
                    + Use sample clips for the demo
                  </button>

                  <ul className="pilot-clip-list">
                    {clips.map((clip) => (
                      <li key={clip.id} className="pilot-clip-row">
                        <div>
                          <div className="pilot-clip-name">{clip.name}</div>
                          <div className="pilot-clip-meta">
                            {clip.sizeMb} MB · uploaded
                          </div>
                          {clip.warnings.map((w) => (
                            <div key={w} className="pilot-clip-warning">
                              ⚠︎ {w}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="pilot-clip-remove"
                          aria-label={`Remove ${clip.name}`}
                          onClick={() => removeClip(clip.id)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="pilot-clip-counter">
                    {clips.length} of 10 clips · need at least 2 to continue
                  </div>
                </div>

                <aside className="pilot-security" aria-label="Security and data handling">
                  <h3>Your data is safe.</h3>
                  <ul>
                    <li>SOC 2 Type II compliant infrastructure</li>
                    <li>You control deletion — one click removes everything</li>
                    <li>
                      VPC deployment available for enterprise customers
                    </li>
                    <li>
                      No data is used to train shared models without explicit
                      opt-in
                    </li>
                  </ul>
                  <a
                    className="pilot-security-link"
                    href="https://docs.nomadicml.com/getting-started/vpc-setup"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read our security and data-handling policy{" "}
                    <span aria-hidden="true">→</span>
                  </a>
                </aside>
              </div>

              <div className="pilot-actions-row">
                <button
                  type="button"
                  className="d-btn--link"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="d-btn d-btn--primary"
                  disabled={clips.length < 2}
                  onClick={handleStep2Continue}
                >
                  Next <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          ) : null}

          {step === 3 ? (
            <section>
              <h1 className="pilot-h1">Pick a starting query.</h1>
              <p className="pilot-sub">
                These are queries Nomadic engineers would run for the
                scenario you picked. Edit any of them, or write your own.
              </p>
              <div className="pilot-prompts">
                {(activeScenario?.prompts ?? []).map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`pilot-prompt-card${
                      chosenPrompt === prompt ? " is-selected" : ""
                    }`}
                    onClick={() => {
                      setChosenPrompt(prompt);
                      setUsedSuggestion(i);
                    }}
                  >
                    <div className="pilot-prompt-tag">Suggestion {i + 1}</div>
                    <div className="pilot-prompt-text">{prompt}</div>
                  </button>
                ))}
              </div>
              <textarea
                className="pilot-prompt-input"
                placeholder="Or write your own — be specific. Concrete questions get better results."
                value={chosenPrompt}
                onChange={(e) => {
                  setChosenPrompt(e.target.value);
                  setUsedSuggestion(null);
                }}
                rows={4}
              />
              <div className="pilot-actions-row">
                <button
                  type="button"
                  className="d-btn--link"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="d-btn d-btn--primary"
                  disabled={!chosenPrompt.trim()}
                  onClick={handleStep3Continue}
                >
                  Submit pilot <span aria-hidden="true">→</span>
                </button>
              </div>
            </section>
          ) : null}

          {step === 4 ? (
            <section>
              <h1 className="pilot-h1">Your pilot is queued.</h1>
              <p className="pilot-sub">Here's what happens next:</p>
              <ol className="pilot-timeline">
                <li>
                  <span className="pilot-timeline-when">Within 24 hours</span>
                  <span className="pilot-timeline-what">
                    <strong>Round 1 results</strong>
                    <span>
                      Every event the agent found, with timestamps and
                      reasoning. Email link to a results dashboard.
                    </span>
                  </span>
                </li>
                <li>
                  <span className="pilot-timeline-when">Then it's your turn</span>
                  <span className="pilot-timeline-what">
                    <strong>Review and accept or reject each event</strong>
                    <span>
                      Your feedback teaches the agent your domain — the
                      same loop that took Bedrock from generic VLM accuracy
                      to 98% on dump-truck loading zones.
                    </span>
                  </span>
                </li>
                <li>
                  <span className="pilot-timeline-when">Within 48 hours total</span>
                  <span className="pilot-timeline-what">
                    <strong>Round 2 results</strong>
                    <span>
                      Refined detections incorporating your feedback. This
                      is where most pilots see a meaningful accuracy
                      step-change.
                    </span>
                  </span>
                </li>
                <li>
                  <span className="pilot-timeline-when">After Round 2</span>
                  <span className="pilot-timeline-what">
                    <strong>Decision</strong>
                    <span>
                      If we're a fit, we'll talk about a 30-day paid pilot
                      ($25K) on a larger dataset. If not, you'll have a
                      clear answer — no long sales cycle.
                    </span>
                  </span>
                </li>
              </ol>

              <div className="pilot-meta-card">
                <div>
                  <strong>Email reminder</strong> at the 12-hour mark with
                  progress.
                </div>
                <div className="pilot-meta-card-meta">
                  Replies go to a Nomadic engineer at{" "}
                  <strong>support@nomadicml.com</strong>.
                </div>
              </div>

              <div className="pilot-actions-row">
                <button
                  type="button"
                  className="d-btn d-btn--primary"
                  onClick={() => navigate("/pilot/results/r1-pilot")}
                >
                  Got it — preview Round 1 dashboard
                </button>
                <Link to="/" className="d-btn--link">
                  ← Back to nomadicai.com
                </Link>
              </div>
            </section>
          ) : null}
        </main>

        <aside className="pilot-ladder" aria-label="Pilot pricing ladder">
          <h3 className="pilot-ladder-title">The pilot ladder</h3>
          <ol className="pilot-ladder-list">
            <li className="pilot-ladder-rung pilot-ladder-rung--current">
              <div className="pilot-ladder-rung-tag">You are here · free</div>
              <div className="pilot-ladder-rung-title">Self-serve pilot</div>
              <ul>
                <li>2–10 clips of one specific scenario</li>
                <li>Two iteration rounds, results within 48 hours</li>
                <li>7-day exploration window</li>
              </ul>
            </li>
            <li className="pilot-ladder-rung">
              <div className="pilot-ladder-rung-tag">$25K flat · 30 days</div>
              <div className="pilot-ladder-rung-title">Paid pilot</div>
              <ul>
                <li>~16 hours of footage processed</li>
                <li>Unlimited iteration rounds</li>
                <li>Dedicated Nomadic engineer</li>
              </ul>
            </li>
            <li className="pilot-ladder-rung">
              <div className="pilot-ladder-rung-tag">Custom · talk to us</div>
              <div className="pilot-ladder-rung-title">Annual contract</div>
              <ul>
                <li>Production deployment on your fleet</li>
                <li>Custom agents tailored to your scenarios</li>
                <li>Pricing scoped to your data volume and use case</li>
              </ul>
            </li>
          </ol>
          <a
            className="pilot-ladder-cta"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
          >
            Skip the ladder — talk to an engineer{" "}
            <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </div>
  );
}
