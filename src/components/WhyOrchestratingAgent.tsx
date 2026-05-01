import { WHY_AGENT } from "../data/copy";

/**
 * §1.6 — single architectural-claim paragraph, navy theme.
 * Iceberg sits on the left as the visual anchor; heading + paragraph on
 * the right read in the natural left-to-right scan path.
 */
export function WhyOrchestratingAgent(): JSX.Element {
  return (
    <section
      className="why-agent-section"
      aria-labelledby="why-agent-heading"
    >
      <div className="why-agent-inner">
        <div className="why-agent-iceberg">
          <img
            src="/assets/iceberg_graphic_v2-BLdbz0uu.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </div>
        <div className="why-agent-text">
          <h2 id="why-agent-heading" className="why-agent-heading">
            {WHY_AGENT.heading}
          </h2>
          <p className="why-agent-paragraph">{WHY_AGENT.paragraph}</p>
        </div>
      </div>
    </section>
  );
}
