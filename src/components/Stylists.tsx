import { useReveal } from "../hooks/useReveal";
import { stylists } from "../data";

export default function Stylists() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="stylists"
      ref={ref}
      className="relative bg-[#f6f1e7] py-24 text-[#0b0a08] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="reveal-fade text-[10px] tracking-[0.5em] uppercase text-[#8a6b30]"
              data-reveal
            >
              — The Artisans
            </div>
            <h2
              className="reveal-fade mt-3 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]"
              data-reveal
              data-reveal-delay="100"
            >
              Hands, hearts,{" "}
              <span className="italic text-[#b8924d]">heritage</span>.
            </h2>
          </div>
          <p
            className="reveal-fade max-w-sm text-sm text-[#0b0a08]/70"
            data-reveal
            data-reveal-delay="200"
          >
            Meet the senior team. Each crafts a signature approach, but all share
            the same quiet discipline.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {stylists.map((s, i) => (
            <article
              key={s.name}
              data-reveal
              data-reveal-delay={i * 100}
              className="reveal-fade group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#0b0a08]">
                <img
                  src={s.image}
                  alt={s.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/20 bg-[#0b0a08]/50 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#f6f1e7]">
                    {s.exp}
                  </span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-[#c8a96a] text-[#0b0a08]">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl leading-tight">{s.name}</h3>
                <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-[#8a6b30]">
                  {s.role}
                </div>
                <p className="mt-2 text-sm text-[#0b0a08]/65">{s.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
