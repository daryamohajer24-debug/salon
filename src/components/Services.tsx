import { useEffect, useRef } from "react";
import { services } from "../data";
import { useReveal } from "../hooks/useReveal";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${
        -y * 6
      }deg) translateZ(0)`;
      const img = el.querySelector<HTMLElement>(".tilt-img");
      if (img)
        img.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.06)`;
    };
    const onLeave = () => {
      el.style.transform =
        "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
      const img = el.querySelector<HTMLElement>(".tilt-img");
      if (img) img.style.transform = "translate(0,0) scale(1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="tilt-card relative"
      style={{ transformStyle: "preserve-3d", transition: "transform .6s" }}
    >
      <div style={{ transform: "translateZ(0)" }}>{children}</div>
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(200,169,106,.4), transparent 40%, rgba(200,169,106,.2))",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </div>
  );
}

export default function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-[#f6f1e7] py-24 text-[#0b0a08] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section header */}
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:mb-24 md:grid-cols-12">
          <div className="md:col-span-2">
            <div
              className="reveal-fade text-[10px] tracking-[0.5em] uppercase text-[#8a6b30]"
              data-reveal
            >
              — The Services
            </div>
          </div>
          <div className="md:col-span-7">
            <h2
              className="reveal-fade font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05] tracking-tight text-balance"
              data-reveal
              data-reveal-delay="100"
            >
              A quiet menu, considered{" "}
              <span className="italic text-[#b8924d]">down to the last</span>{" "}
              detail.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p
              className="reveal-fade text-sm text-[#0b0a08]/70"
              data-reveal
              data-reveal-delay="200"
            >
              Every ritual begins with consultation. Every service ends with a
              signature.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.id}
              data-reveal
              data-reveal-delay={i * 80}
              className="reveal-fade group"
            >
              <TiltCard>
                <article className="relative overflow-hidden rounded-2xl bg-[#efe7d6] border border-[#0b0a08]/8">
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="tilt-img absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08]/40 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                      <span className="font-serif text-xs italic text-white">
                        {s.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl leading-tight">
                        {s.title}
                      </h3>
                      <span className="shrink-0 text-[10px] tracking-[0.3em] uppercase text-[#8a6b30]">
                        {s.price}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#0b0a08]/65">
                      {s.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between border-t border-[#0b0a08]/10 pt-4">
                      <span className="text-[10px] tracking-[0.35em] uppercase text-[#0b0a08]/60">
                        Discover
                      </span>
                      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#0b0a08]/15 transition-all duration-500 group-hover:bg-[#0b0a08] group-hover:text-[#f6f1e7] group-hover:border-[#0b0a08]">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
