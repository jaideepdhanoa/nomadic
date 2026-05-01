import { LOGO_STRIP } from "../data/copy";

interface Logo {
  className: string;
  src?: string;
  alt: string;
  isText?: boolean;
}

const LOGOS: Logo[] = [
  {
    className: "bedrock",
    src: "/assets/bedrock_logo-BIsigvjW.svg",
    alt: "Bedrock Robotics",
  },
  {
    className: "michigan-tech",
    src: "/assets/michigan_tech_logo-BckDZhuq.svg",
    alt: "Michigan Tech",
  },
  {
    className: "mitsubishi",
    src: "/assets/mitsubishi_electric_logo-Dib27VrY.svg",
    alt: "Mitsubishi Electric",
  },
  {
    className: "natix",
    src: "/assets/natix_network_logo-CGBiuVLu.svg",
    alt: "NATIX",
  },
  {
    className: "top-av-company",
    alt: "TOP AV COMPANY",
    isText: true,
  },
  {
    className: "autoware",
    src: "/assets/the_autoware_foundation_logo-Gje6LWh4.svg",
    alt: "Autoware Foundation",
  },
];

export function LogoStrip(): JSX.Element {
  // Duplicate the list so the -50% translateX yields a seamless loop.
  const reel = [...LOGOS, ...LOGOS];

  return (
    <section className="logo-slider-section" aria-label="Customers">
      <h3 className="logo-slider-heading">{LOGO_STRIP.heading}</h3>
      <div className="logo-slider-viewport">
        <div className="logo-slider-fade-left" aria-hidden="true" />
        <div className="logo-slider-fade-right" aria-hidden="true" />
        <div className="logo-slider-track">
          {reel.map((logo, i) => (
            <div
              className={`logo-slider-item ${logo.className}`}
              key={`${logo.className}-${i}`}
              aria-hidden={i >= LOGOS.length}
            >
              {logo.isText ? (
                <span>{logo.alt}</span>
              ) : (
                <img src={logo.src} alt={logo.alt} loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
