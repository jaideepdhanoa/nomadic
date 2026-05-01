import { useEffect, useRef, useState } from "react";
import { PERSONAS, type PersonaId } from "../data/personas";

const STEP_LABELS: Record<PersonaId, string[]> = {
  av: ["Indexing fleet", "Detecting events", "Validating", "Reporting"],
  robotics: ["Indexing teleop", "Segmenting demos", "Flagging slips", "Grouping"],
  construction: ["Indexing shift", "Detecting cycles", "Tracking trucks", "Reporting"],
};

const STEP_INTERVAL_MS = 2200;
const STEPS_PER_PERSONA = 4;

/** Lucide-style line icons, rendered inline so they inherit color. */
function PersonaIcon({ id }: { id: PersonaId }): JSX.Element {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (id === "av") {
    return (
      <svg {...common}>
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  }
  if (id === "robotics") {
    return (
      <svg {...common}>
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    );
  }
  // construction
  return (
    <svg {...common}>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1Z" />
      <path d="M10 10h4" />
      <path d="M10 14V8a2 2 0 1 1 4 0v6" />
      <path d="M5 16a7 7 0 0 1 14 0" />
    </svg>
  );
}

/**
 * Hero right-column interactive demo.
 *
 * Cycles automatically through PERSONAS in array order
 * (av → robotics → construction). Refs drive the counters so the
 * advance logic survives React Strict Mode's updater double-invoke
 * — if we used `setActiveId(prev => next(prev))` in an updater
 * function, Strict Mode would re-run it and skip a persona.
 *
 * Hover pauses rotation; reduced-motion disables it; user clicks
 * jump to that persona and reset the cycle.
 */
export function HeroDemo(): JSX.Element {
  const [activeId, setActiveId] = useState<PersonaId>(PERSONAS[0].id);
  const [activeStep, setActiveStep] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const personaIdxRef = useRef(0);
  const stepRef = useRef(0);

  const active = PERSONAS.find((p) => p.id === activeId) ?? PERSONAS[0];
  const steps = STEP_LABELS[active.id];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent): void => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return undefined;
    const tickerId = window.setInterval(() => {
      const nextStep = stepRef.current + 1;
      if (nextStep >= STEPS_PER_PERSONA) {
        // Advance persona via flash transition.
        setTransitioning(true);
        window.setTimeout(() => {
          personaIdxRef.current =
            (personaIdxRef.current + 1) % PERSONAS.length;
          stepRef.current = 0;
          setActiveId(PERSONAS[personaIdxRef.current].id);
          setActiveStep(0);
          setTransitioning(false);
        }, 280);
      } else {
        stepRef.current = nextStep;
        setActiveStep(nextStep);
      }
    }, STEP_INTERVAL_MS);
    return () => window.clearInterval(tickerId);
  }, [paused, reduceMotion]);

  const handleTabClick = (id: PersonaId): void => {
    if (id === activeId) return;
    const newIdx = PERSONAS.findIndex((p) => p.id === id);
    setTransitioning(true);
    window.setTimeout(() => {
      personaIdxRef.current = newIdx;
      stepRef.current = 0;
      setActiveId(id);
      setActiveStep(0);
      setTransitioning(false);
    }, 280);
  };

  return (
    <div
      className={`hero-demo-wrapper${transitioning ? " hdp-transitioning" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-demo-frame">
        <div className="hero-demo-banner">
          <span className="hero-demo-banner-dot" aria-hidden="true" />
          {active.heroLabel}
        </div>
        <video
          key={active.id}
          className="hero-demo-video"
          src={active.heroVideoUrl}
          poster={active.heroPosterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="hdp-cat-tabs" role="tablist" aria-label="Industry preview">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === activeId}
            tabIndex={p.id === activeId ? 0 : -1}
            className={`hdp-cat-tab${
              p.id === activeId ? " hdp-cat-tab--active" : ""
            }`}
            onClick={() => handleTabClick(p.id)}
          >
            <span className="hdp-cat-icon" aria-hidden="true">
              <PersonaIcon id={p.id} />
            </span>
            <span className="hdp-cat-label">{p.shortTag}</span>
          </button>
        ))}
      </div>
      <div className="hdp-step-pills" aria-hidden="true">
        {steps.map((label, i) => (
          <span
            key={`${active.id}-${label}`}
            className={`hdp-step-pill${
              i === activeStep ? " hdp-step-pill--active" : ""
            }`}
          >
            <span className="hdp-step-pill-num">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="hdp-step-pill-label">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
