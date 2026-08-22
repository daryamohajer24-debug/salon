import { useEffect, useState } from "react";

export default function Loader() {
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHide(true);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setHide(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hide) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0b0a08] transition-opacity duration-700"
      style={{ opacity: progress > 0.85 ? 0 : 1 }}
    >
      <div className="text-center">
        <div className="font-serif text-5xl italic text-[#c8a96a] md:text-7xl">
          M
        </div>
        <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
          <div
            className="h-full bg-[#c8a96a]"
            style={{ width: `${progress * 100}%`, transition: "width 80ms linear" }}
          />
        </div>
        <div className="mt-3 text-[10px] tracking-[0.5em] uppercase text-[#efe7d6]/50">
          Maison Lumière
        </div>
      </div>
    </div>
  );
}
