import { useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import { track } from "../lib/analytics";
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
import { AccountRequiredDialog } from "./sandbox/AccountRequiredDialog";
import { ExitIntentModal } from "./sandbox/ExitIntentModal";
import { SandboxFooter } from "./sandbox/SandboxFooter";
import { SandboxProper } from "./sandbox/SandboxProper";
import "./styles/demo-tokens.css";
import "./styles/demo-components.css";

type Phase = "beat1" | "beat2" | "beat3" | "beat4" | "sandbox";

const ALL_PERSONAS: BeatPersonaCopy[] = [
  BEATS.av,
  BEATS.robotics,
  BEATS.construction,
];

const EXIT_INTENT_KEY = "nomadic_exit_intent_shown";

export function DemoApp(): JSX.Element {
  const { persona } = useParams<{ persona?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activePersona, setActivePersona] = useState<DemoPersonaId>(
    isDemoPersonaId(persona ?? "") ? (persona as DemoPersonaId) : "av"
  );
  const [phase, setPhase] = useState<Phase>("beat1");
  const [reasoningCollapsed, setReasoningCollapsed] = useState(false);
  const [accountAction, setAccountAction] = useState<string | null>(null);
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [beat4Seen, setBeat4Seen] = useState(false);

  const guidedStartedRef = useRef(false);
  const path = searchParams.get("path") ?? "default";

  // Fire demo_guided_started once per session-entry.
  useEffect(() => {
    if (phase !== "beat1") return;
    if (guidedStartedRef.current) return;
    guidedStartedRef.current = true;
    track("demo_guided_started", { persona: activePersona, path });
  }, [phase, activePersona, path]);

  // Beat 4 → set the flag that gates exit-intent.
  useEffect(() => {
    if (phase === "beat4" && !beat4Seen) {
      setBeat4Seen(true);
    }
  }, [phase, beat4Seen]);

  // Exit-intent: cursor leaving viewport top, after Beat 4, once per session.
  useEffect(() => {
    if (!beat4Seen) return undefined;
    if (typeof window === "undefined") return undefined;
    if (window.sessionStorage.getItem(EXIT_INTENT_KEY) === "1")
      return undefined;
    const onLeave = (e: MouseEvent): void => {
      // clientY <= 0 means cursor crossed the top edge of the viewport.
      if (e.clientY <= 0) {
        window.sessionStorage.setItem(EXIT_INTENT_KEY, "1");
        setExitIntentOpen(true);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [beat4Seen]);

  if (!persona) return <Navigate to="/demo/av" replace />;
  if (!isDemoPersonaId(persona)) return <Navigate to="/demo/av" replace />;

  const copy = BEATS[activePersona];

  const handleBeat1Run = (): void => setPhase("beat2");
  const handleBeat2Run = (queryWasEdited: boolean): void => {
    track("demo_beat2_run_clicked", {
      persona: activePersona,
      query_was_edited: queryWasEdited,
    });
    setPhase("beat3");
  };
  const handleBeat3Complete = (): void => {
    track("demo_beat3_completed", {
      persona: activePersona,
      duration_ms: 12000, // approximate; real timer in Beat3 component
    });
    setPhase("beat4");
    setReasoningCollapsed(true);
  };
  const handleSkipToSandbox = (): void => {
    if (phase === "beat1") {
      track("demo_beat1_dismissed", { persona: activePersona });
    }
    setPhase("sandbox");
  };
  const handlePersonaSwitch = (id: DemoPersonaId): void => {
    if (id === activePersona) return;
    track("demo_industry_tab_switched", {
      from_persona: activePersona,
      to_persona: id,
    });
    setActivePersona(id);
  };

  const showCompactReasoning = phase === "beat4";

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

              {phase === "beat3" ? <Beat3RunningSurface copy={copy} /> : null}

              {phase === "beat4" ? (
                <Beat4Results
                  copy={copy}
                  allPersonas={ALL_PERSONAS}
                  onPersonaSwitch={handlePersonaSwitch}
                  onPrivilegedAction={(action) => setAccountAction(action)}
                />
              ) : null}

              {phase === "sandbox" ? (
                <SandboxProper
                  copy={copy}
                  allPersonas={ALL_PERSONAS}
                  onPersonaSwitch={handlePersonaSwitch}
                  onPrivilegedAction={(action) => setAccountAction(action)}
                  reminder
                />
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
                onToggleCollapse={() => setReasoningCollapsed((c) => !c)}
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

      {accountAction ? (
        <AccountRequiredDialog
          action={accountAction}
          onClose={() => setAccountAction(null)}
        />
      ) : null}

      {exitIntentOpen ? (
        <ExitIntentModal
          persona={activePersona}
          onClose={() => setExitIntentOpen(false)}
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
