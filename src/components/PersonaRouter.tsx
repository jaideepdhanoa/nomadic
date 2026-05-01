import { Link } from "react-router-dom";
import { PERSONA_ROUTER } from "../data/copy";
import { PERSONAS, type PersonaId } from "../data/personas";
import { track } from "../lib/analytics";

export function PersonaRouter(): JSX.Element {
  const handleClick = (persona: PersonaId): void => {
    track("persona_card_clicked", { persona });
  };

  return (
    <section
      id="persona-router"
      className="persona-router-section"
      aria-labelledby="persona-router-heading"
    >
      <div className="persona-router-inner">
        <h2 id="persona-router-heading" className="persona-router-heading">
          {PERSONA_ROUTER.heading}
        </h2>
        <p className="persona-router-supporting">
          {PERSONA_ROUTER.supporting}
        </p>
        <div className="persona-cards">
          {PERSONAS.map((persona) => (
            <Link
              key={persona.id}
              className="persona-card"
              to={persona.ctaHref}
              onClick={() => handleClick(persona.id)}
            >
              <div
                className="persona-card-thumb"
                style={{
                  backgroundImage: `url('${persona.heroPosterUrl}')`,
                }}
                aria-hidden="true"
              >
                <span className="persona-card-thumb-tag">{persona.tag}</span>
              </div>
              <div className="persona-card-content">
                <h3 className="persona-card-title">{persona.title}</h3>
                <p className="persona-card-body">{persona.body}</p>
                <span className="persona-card-cta">
                  <span>{persona.ctaLabel}</span>
                  <span className="persona-card-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
