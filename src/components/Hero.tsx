import { useEffect, useRef } from "react";
import { HERO } from "../data/copy";
import { smoothScrollTo } from "../lib/scroll";
import { track } from "../lib/analytics";
import { HeroDemo } from "./HeroDemo";

export function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }
    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired) {
            fired = true;
            track("landing_hero_viewed", {
              referrer: document.referrer || "direct",
            });
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrimary = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    smoothScrollTo(HERO.primaryHref);
  };

  return (
    <section
      ref={sectionRef}
      className="home-hero"
      aria-labelledby="hero-heading"
    >
      <div className="home-hero-content">
        <div className="hero-text-wrapper">
          <span className="hero-eyebrow">
            <span className="announcement-dot" aria-hidden="true" />
            {HERO.eyebrow}
          </span>
          <h1 id="hero-heading" className="hero-heading">
            {HERO.headline}
          </h1>
          <p className="hero-subtext">{HERO.subtitle}</p>
          <div className="hero-cta-buttons">
            <a
              className="btn btn--filled hero-cta-btn--pulse"
              href={HERO.primaryHref}
              onClick={handlePrimary}
            >
              {HERO.primaryCta}
            </a>
            <a
              className="hero-cta-secondary"
              href={HERO.secondaryHref}
              target="_blank"
              rel="noreferrer"
            >
              <span>Talk to an engineer</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <HeroDemo />
      </div>
    </section>
  );
}
