import { useReveal } from "../hooks/useReveal";
import { gallery } from "../data";

export default function Gallery() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative bg-[#0b0a08] py-24 text-[#f6f1e7] md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <div
              className="reveal-fade text-[10px] tracking-[0.5em] uppercase text-[#c8a96a]"
              data-reveal
            >
              — Gallery
            </div>
            <h2
              className="reveal-fade mt-3 font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]"
              data-reveal
              data-reveal-delay="100"
            >
              Inside the <span className="italic text-[#c8a96a]">Maison</span>.
            </h2>
          </div>
          <p
            className="reveal-fade max-w-sm text-sm text-[#efe7d6]/65"
            data-reveal
            data-reveal-delay="200"
          >
            A glance at the rooms, the rituals and the work. Shot in available
            light.
          </p>
        </div>

        {/* Masonry-ish layout — varied aspect ratios via padded containers */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((g, i) => {
            const ratios = [
              "aspect-[3/4]",
              "aspect-[4/5]",
              "aspect-[1/1]",
              "aspect-[3/4]",
              "aspect-[4/5]",
              "aspect-square",
              "aspect-[3/4]",
              "aspect-[4/5]",
            ];
            return (
            <figure
              key={g.src}
              data-reveal
              data-reveal-delay={(i % 3) * 100}
              className="reveal-fade group relative overflow-hidden rounded-xl break-inside-avoid bg-[#1a1814]"
            >
              <div className={ratios[i % ratios.length]}>
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a08]/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <figcaption className="pointer-events-none absolute bottom-4 left-4 translate-y-2 text-[10px] tracking-[0.4em] uppercase text-[#f6f1e7] opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                {g.alt}
              </figcaption>
            </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
