import { useEffect, useState } from "react";
import { ANNOUNCE } from "../data/copy";

const STORAGE_KEY = "nomadic_announce_dismissed";

export function AnnouncementBanner(): JSX.Element | null {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
    }
  }, []);

  if (dismissed) return null;

  const handleDismiss = (e: React.MouseEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    window.localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="announce-banner" role="region" aria-label="Announcement">
      <a
        className="announce-banner-content"
        href={ANNOUNCE.href}
        target="_blank"
        rel="noreferrer"
      >
        <span className="announce-banner-pulse" aria-hidden="true" />
        <span className="announce-banner-text">
          <strong>{ANNOUNCE.text}</strong> {ANNOUNCE.cta}
        </span>
        <span className="announce-banner-arrow" aria-hidden="true">
          →
        </span>
      </a>
      <button
        className="announce-banner-close"
        aria-label="Dismiss announcement"
        onClick={handleDismiss}
      >
        ✕
      </button>
    </div>
  );
}
