import { useEffect, useRef } from "react";
import { track } from "../../lib/analytics";

interface ExitIntentModalProps {
  persona: string;
  onClose: () => void;
}

/**
 * PRD §3.5 — Exit-intent modal. Fired by DemoApp when the user has
 * completed Beat 4 and tries to navigate away. One-shot per session.
 */
export function ExitIntentModal({
  persona,
  onClose,
}: ExitIntentModalProps): JSX.Element {
  const dismiss = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    track("exit_modal_shown", { persona });
    dismiss.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [persona, onClose]);

  return (
    <div
      className="exit-intent-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          track("exit_modal_action", { action: "dismiss" });
          onClose();
        }
      }}
    >
      <div className="exit-intent-modal">
        <h2 id="exit-intent-title" className="exit-intent-title">
          Want to see this on your own data?
        </h2>
        <p className="exit-intent-paragraph">
          Most teams know within 20 minutes whether Nomadic fits their
          use case.
        </p>
        <div className="exit-intent-actions">
          <a
            className="d-btn d-btn--primary"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              track("exit_modal_action", { action: "concierge" });
              onClose();
            }}
          >
            Schedule a 20-min call
          </a>
          <a
            className="exit-intent-secondary"
            href="/pilot/upload"
            onClick={() => {
              track("exit_modal_action", { action: "self_serve" });
              onClose();
            }}
          >
            <span>Or upload 2–10 clips</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
        <button
          ref={dismiss}
          type="button"
          className="exit-intent-dismiss"
          onClick={() => {
            track("exit_modal_action", { action: "dismiss" });
            onClose();
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
