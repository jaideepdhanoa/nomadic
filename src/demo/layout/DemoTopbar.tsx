import { Link } from "react-router-dom";

export function DemoTopbar(): JSX.Element {
  return (
    <div className="demo-topbar">
      <div className="demo-topbar-crumbs">
        <Link to="/" className="d-btn--link" aria-label="Back to landing">
          <span aria-hidden="true">←</span>
        </Link>
        <span className="demo-topbar-pill">Video ID</span>
        <span className="demo-topbar-pill">Batch ID</span>
        <span className="demo-topbar-pill">Share Link</span>
      </div>
      <div className="demo-topbar-actions">
        <button className="d-btn d-btn--ghost" type="button">
          Preview CSV
        </button>
        <button className="d-btn d-btn--ghost" type="button">
          New Analysis
        </button>
        <button className="d-btn d-btn--ghost" type="button">
          More Actions
        </button>
      </div>
    </div>
  );
}
