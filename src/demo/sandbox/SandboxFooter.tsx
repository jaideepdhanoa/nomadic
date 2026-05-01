import { Link } from "react-router-dom";

/**
 * PRD §2.7 footer CTA bar — appears once Beat 4 has rendered.
 * Concierge-primary / self-serve-secondary pairing per §0.6 rule 6.
 * Small line under references the $25K paid-pilot ladder per PRD §3.7
 * — first surface that mentions pricing, deliberately scoped here
 * (not on the marketing homepage, per PRD §1.10).
 */
export function SandboxFooter(): JSX.Element {
  return (
    <div className="sandbox-footer" role="contentinfo">
      <div className="sandbox-footer-inner">
        <div className="sandbox-footer-left">
          <div className="sandbox-footer-prompt">
            Want to see this on your data?
          </div>
          <div className="sandbox-footer-meta">
            Pilots run free for 2 rounds · Paid pilots from $25K · 30 days,
            ~16 hours of footage, dedicated engineer
          </div>
        </div>
        <div className="sandbox-footer-actions">
          <a
            className="d-btn d-btn--primary"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
          >
            Schedule a scoping call
          </a>
          <Link to="/pilot/upload" className="sandbox-footer-secondary">
            <span>Or try the self-serve pilot</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
