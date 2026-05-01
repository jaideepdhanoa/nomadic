import { useEffect, useRef } from "react";
import { track } from "../../lib/analytics";

interface AccountRequiredDialogProps {
  /** Reason for the gate, e.g., "Modify event" or "Save analysis". */
  action: string;
  onClose: () => void;
}

/**
 * PRD §2.7 — Recreated `LiveDemoAccountRequiredDialog`. Triggers when a
 * user attempts a privileged action in the demo (Modify event, save
 * analysis, export, upload). Two CTAs: Sign up (primary, navy) and
 * Talk to a Nomadic engineer (secondary). Esc dismisses.
 *
 * No real auth in the demo — Sign up routes to /pilot/upload, the
 * concierge/self-serve fork.
 */
export function AccountRequiredDialog({
  action,
  onClose,
}: AccountRequiredDialogProps): JSX.Element {
  const closeBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    track("demo_account_dialog_shown", { action });
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [action, onClose]);

  return (
    <div
      className="account-dialog-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="account-dialog">
        <button
          ref={closeBtn}
          type="button"
          className="account-dialog-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>
        <div className="account-dialog-icon" aria-hidden="true">
          🔒
        </div>
        <h2 id="account-dialog-title" className="account-dialog-title">
          Sign in to {action.toLowerCase()}.
        </h2>
        <p className="account-dialog-paragraph">
          You're in the live demo sandbox. To run this on your own
          footage, save analyses, or export events, you'll need a Nomadic
          account.
        </p>
        <ul className="account-dialog-perks">
          <li>Upload up to 10 of your own clips for a free pilot run</li>
          <li>Save analyses, share results with your team</li>
          <li>Round 1 results in 24 hours, Round 2 within 48 hours</li>
        </ul>
        <div className="account-dialog-actions">
          <a
            className="d-btn d-btn--primary"
            href="/pilot/upload"
            onClick={() => onClose()}
          >
            Sign up &amp; start a free pilot
          </a>
          <a
            className="d-btn d-btn--ghost"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
          >
            Talk to a Nomadic engineer
          </a>
        </div>
        <button
          type="button"
          className="account-dialog-dismiss"
          onClick={onClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
