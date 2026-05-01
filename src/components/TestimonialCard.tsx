import { TESTIMONIAL } from "../data/copy";

export function TestimonialCard(): JSX.Element {
  return (
    <section
      id="testimonial"
      className="testimonial-section"
      aria-label="Customer testimonial"
    >
      <figure className="testimonial-card">
        <blockquote className="testimonial-quote">
          {TESTIMONIAL.quote}
        </blockquote>
        <figcaption className="testimonial-footer">
          <div className="testimonial-attribution">
            — {TESTIMONIAL.attribution},{" "}
            <span className="testimonial-attribution-role">
              {TESTIMONIAL.role}
            </span>
          </div>
          <a
            className="testimonial-case-study"
            href={TESTIMONIAL.caseStudyHref}
            target="_blank"
            rel="noreferrer"
          >
            <span>View case study</span>
            <span aria-hidden="true">→</span>
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
