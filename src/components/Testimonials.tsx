import { useEffect, useRef, useState } from "react";
import { testimonials } from "../data";
import { useReveal } from "../hooks/useReveal";

export default function Testimonials() {
  const ref = useReveal<HTMLElement>();
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => {
      setI((v) => (v + 1) % testimonials.length);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  // current testimonial used via i

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#efe7d6] py-24 text-[#0b0a08] md:py-32"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-32 top-12 h-72 w-72 rounded-full bg-[#c8a96a]/30 blur-3xl" />
        <div className="absolute -right-32 bottom-12 h-72 w-72 rounded-full bg-[#b8924d]/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <div
          className="reveal-fade text-[10px] tracking-[0.5em] uppercase text-[#8a6b30]"
          data-reveal
        >
          — Words
        </div>

        <div
          className="relative mt-10 min-h-[280px] perspective"
          aria-live="polite"
        >
          {testimonials.map((tt, idx) => (
            <div
              key={tt.name}
              className="absolute inset-0 transition-all duration-[1100ms]"
              style={{
                opacity: idx === i ? 1 : 0,
                transform: `translate3d(0, ${
                  idx === i ? 0 : idx > i ? 20 : -20
                }px, 0) scale(${idx === i ? 1 : 0.96})`,
                pointerEvents: idx === i ? "auto" : "none",
              }}
            >
              <svg
                className="mx-auto h-10 w-10 text-[#b8924d]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.17 6C4.32 6 2 8.32 2 11.17v6.83h7V11.17H5.83C5.83 9.79 6.79 8.83 8.17 8.83V6h-1zm10 0c-2.85 0-5.17 2.32-5.17 5.17v6.83h7V11.17h-3.17c0-1.38.96-2.34 2.34-2.34V6h-1z" />
              </svg>
              <p className="mx-auto mt-6 max-w-3xl font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.25]">
                "{tt.quote}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#0b0a08]/30" />
                <div>
                  <div className="text-sm font-medium">{tt.name}</div>
                  <div className="text-[10px] tracking-[0.4em] uppercase text-[#8a6b30]">
                    {tt.role}
                  </div>
                </div>
                <span className="h-px w-8 bg-[#0b0a08]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-12 flex items-center justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Testimonial ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-px transition-all duration-700 ${
                idx === i ? "w-12 bg-[#0b0a08]" : "w-6 bg-[#0b0a08]/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
