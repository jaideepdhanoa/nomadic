import { Link } from "react-router-dom";
import "../demo/styles/demo-tokens.css";
import "./pilot-stub.css";

/**
 * Slice 1 stub. The full PRD §3.3 four-step wizard (scenario → upload →
 * suggested prompts → confirmation) ships in Slice 3.
 */
export function PilotUploadStub(): JSX.Element {
  return (
    <div className="demo-app pilot-stub-page">
      <div className="pilot-stub-card">
        <span className="pilot-stub-tag">Self-serve pilot</span>
        <h1>Upload 2 to 10 clips of one specific scenario.</h1>
        <p>
          This is a capability check, not a full evaluation. Send the clips
          that best represent the problem you want solved — Round 1 results
          land in your inbox within 24 hours.
        </p>
        <ul className="pilot-stub-list">
          <li>SOC 2 Type II compliant infrastructure</li>
          <li>You control deletion — one click removes everything</li>
          <li>VPC deployment available for enterprise customers</li>
          <li>
            No data is used to train shared models without explicit opt-in
          </li>
        </ul>
        <div className="pilot-stub-actions">
          <a
            className="d-btn d-btn--primary"
            href="https://calendly.com/nomadicml/20min"
            target="_blank"
            rel="noreferrer"
          >
            Schedule a scoping call instead
          </a>
          <Link to="/" className="d-btn--link">
            ← Back to nomadicai.com
          </Link>
        </div>
        <div className="pilot-stub-meta">
          The full 4-step upload wizard (scenario · upload · suggested
          prompts · confirmation) is wired in Slice 3 of the build plan.
        </div>
      </div>
    </div>
  );
}
