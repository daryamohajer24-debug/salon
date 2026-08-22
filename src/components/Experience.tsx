import { useEffect, useRef } from "react";
import { experience } from "../data";
import { useReveal } from "../hooks/useReveal";

export default function Experience() {
  const ref = useReveal<HTMLElement>();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let raf = 0;
    let scrollProgress = 0;
    let target = 0;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      target = Math.max(0, Math.min(1, -rect.top / total));
    };

    const tick = () => {
      scrollProgress += (target - scrollProgress) * 0.08;
      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${
        -scrollProgress * trackWidth
      }px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={(el) => {
        (ref as any).current = el;
        sectionRef.current = el;
      }}
      className="relative bg-[#efe7d6] text-[#0b0a08]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="reveal-fade text-[10px] tracking-[0.5em] uppercase text-[#8a6b30]"
              data-reveal
            >
              — The Signature
            </div>
            <h2
              className="reveal-fade mt-3 font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]"
              data-reveal
              data-reveal-delay="100"
            >
              Four quiet acts.{" "}
              <span className="italic text-[#b8924d]">One</span> considered
              transformation.
            </h2>
          </div>
          <p
            className="reveal-fade max-w-sm text-sm text-[#0b0a08]/70"
            data-reveal
            data-reveal-delay="200"
          >
            Each visit is choreographed. Scroll to walk through the Maison
            ritual.
          </p>
        </div>
      </div>

      {/* Pinned horizontal track */}
      <div className="relative h-[300vh] overflow-hidden">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-center gap-12 px-6 will-change-transform md:gap-24 md:px-20"
            style={{ width: "max-content" }}
          >
            {experience.map((e, i) => (
              <article
                key={e.step}
                className="relative grid w-[88vw max-w-[640px] grid-cols-1 gap-8 md:w-[80vw] md:grid-cols-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#0b0a08]">
                  <img
                    src={
                      [
                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1100&q=70",
                        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=70",
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1100&q=70",
                        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1100&q=70",
                      ][i]
                    }
                    alt={e.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 font-serif text-xs italic text-[#c8a96a]">
                    Act {e.step}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-serif text-6xl italic text-[#b8924d]/60">
                    /{e.step}
                  </div>
                  <h3 className="mt-2 font-serif text-4xl md:text-5xl">
                    {e.title}
                  </h3>
                  <p className="mt-5 text-[15px] leading-relaxed text-[#0b0a08]/70">
                    {e.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
