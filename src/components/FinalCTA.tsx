import { FINAL_CTA } from "../data/copy";
import { track } from "../lib/analytics";

export function FinalCTA(): JSX.Element {
  return (
    <section
      className="final-cta-section"
      aria-labelledby="final-cta-heading"
    >
      <div className="final-cta-inner">
        <h2 id="final-cta-heading" className="final-cta-heading">
          {FINAL_CTA.heading}
        </h2>
        <p className="final-cta-body">{FINAL_CTA.body}</p>
        <div className="final-cta-buttons">
          <a
            className="btn btn--inverted-filled"
            href={FINAL_CTA.primaryHref}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              track("pilot_concierge_clicked", { source: "final_band" })
            }
          >
            {FINAL_CTA.primaryCta}
          </a>
          <a
            className="final-cta-secondary"
            href={FINAL_CTA.secondaryHref}
            onClick={() =>
              track("pilot_self_serve_clicked", { source: "final_band" })
            }
          >
            <span>Or try the self-serve pilot</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
