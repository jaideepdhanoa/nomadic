import { useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import {
  BEATS,
  isDemoPersonaId,
  type BeatPersonaCopy,
  type DemoPersonaId,
} from "./data/beats";
import { Beat1Modal } from "./beats/Beat1Modal";
import { Beat2QueryStage } from "./beats/Beat2QueryStage";
import { Beat3NarrationSidebar } from "./beats/Beat3NarrationSidebar";
import { Beat4Results } from "./beats/Beat4Results";
import { DemoSidebar } from "./layout/DemoSidebar";
import { DemoTopbar } from "./layout/DemoTopbar";
import { SandboxFooter } from "./sandbox/SandboxFooter";
import { SandboxStub } from "./sandbox/SandboxStub";
import "./styles/demo-tokens.css";
import "./styles/demo-components.css";

type Phase = "beat1" | "beat2" | "beat3" | "beat4" | "sandbox";

const ALL_PERSONAS: BeatPersonaCopy[] = [
  BEATS.av,
  BEATS.robotics,
  BEATS.construction,
];

/**
 * Slice 2 — full Beat 1 → 2 → 3 → 4 → sandbox phase machine.
 *
 * URL params (PRD §2.2):
 *   /demo/:persona              → start at Beat 1, persona-aware
 *   /demo/:persona?path=foo     → reserved for variant guided paths
 *   /demo                       → no params; redirect to AV for now
 *
 * Persona switch from Beat 4 industry tabs replays the prior persona's
 * Beat 4 (no re-trigger of the Beat 1 modal).
 */
export function DemoApp(): JSX.Element {
  const { persona } = useParams<{ persona?: string }>();
  const navigate = useNavigate();
  const [activePersona, setActivePersona] = useState<DemoPersonaId>(
    isDemoPersonaId(persona ?? "") ? (persona as DemoPersonaId) : "av"
  );
  const [phase, setPhase] = useState<Phase>("beat1");
  const [reasoningCollapsed, setReasoningCollapsed] = useState(false);

  if (!persona) {
    return <Navigate to="/demo/av" replace />;
  }
  if (!isDemoPersonaId(persona)) {
    return <Navigate to="/demo/av" replace />;
  }

  const copy = BEATS[activePersona];

  const handleBeat1Run = (): void => setPhase("beat2");
  const handleBeat2Run = (_queryWasEdited: boolean): void => setPhase("beat3");
  const handleBeat3Complete = (): void => {
    setPhase("beat4");
    setReasoningCollapsed(true); // Collapse reasoning panel into compact dock.
  };
  const handleSkipToSandbox = (): void => setPhase("sandbox");
  const handlePersonaSwitch = (id: DemoPersonaId): void => {
    setActivePersona(id);
    // Stay on Beat 4 with the new persona's results.
  };

  const showCompactReasoning = phase === "beat4" || phase === "sandbox";

  return (
    <div className="demo-app">
      <div className="demo-shell">
        <DemoSidebar persona={copy.id} />
        <main className="demo-main">
          <DemoTopbar />
          <div
            className={`demo-stage${
              phase === "beat3" ? " demo-stage--running" : ""
            }${
              showCompactReasoning ? " demo-stage--with-reasoning" : ""
            }`}
          >
            <div className="demo-stage-main">
              {phase === "beat1" || phase === "beat2" ? (
                <Beat2QueryStage
                  copy={copy}
                  onRun={handleBeat2Run}
                  onSkip={handleSkipToSandbox}
                />
              ) : null}

              {phase === "beat3" ? (
                <Beat3RunningSurface copy={copy} />
              ) : null}

              {phase === "beat4" ? (
                <Beat4Results
                  copy={copy}
                  allPersonas={ALL_PERSONAS}
                  onPersonaSwitch={handlePersonaSwitch}
                />
              ) : null}

              {phase === "sandbox" ? (
                <SandboxStub copy={copy} reminder />
              ) : null}
            </div>

            {phase === "beat3" ? (
              <Beat3NarrationSidebar
                copy={copy}
                onComplete={handleBeat3Complete}
              />
            ) : null}

            {showCompactReasoning ? (
              <Beat3NarrationSidebar
                copy={copy}
                onComplete={() => undefined}
                compact
                collapsed={reasoningCollapsed}
                onToggleCollapse={() =>
                  setReasoningCollapsed((c) => !c)
                }
              />
            ) : null}
          </div>
          {phase === "beat4" || phase === "sandbox" ? <SandboxFooter /> : null}
        </main>
      </div>

      {phase === "beat1" ? (
        <Beat1Modal
          copy={copy}
          onRun={handleBeat1Run}
          onSkip={handleSkipToSandbox}
        />
      ) : null}

      <button
        type="button"
        onClick={() => navigate("/")}
        className="demo-exit-link"
        aria-label="Exit demo"
      >
        ← Back to nomadicai.com
      </button>
    </div>
  );
}

/**
 * Beat 3's main-stage view: dimmed processing area while the narration
 * sidebar streams. PRD §2.5 just says "main content area shows a
 * processing state" — keep it minimal.
 */
function Beat3RunningSurface({
  copy,
}: {
  copy: BeatPersonaCopy;
}): JSX.Element {
  return (
    <div className="demo-content beat3-stage">
      <div className="beat3-stage-card">
        <div className="beat3-stage-spinner" aria-hidden="true">
          <span /> <span /> <span />
        </div>
        <h2 className="beat3-stage-title">
          Running the agent on{" "}
          <strong>{copy.defaultFolder.name}</strong>
        </h2>
        <p className="beat3-stage-paragraph">
          Streaming reasoning is shown in the panel on the right. Results
          will render here when the run completes.
        </p>
      </div>
    </div>
  );
}
