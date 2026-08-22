import { useRef, useEffect, ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: "button" | "a" | "div";
  onClick?: () => void;
  href?: string;
}

export default function Magnetic({
  children,
  strength = 0.35,
  className = "",
  as = "div",
  onClick,
  href,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = `translate(0px, 0px)`;
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  const props: any = {
    ref,
    className: `magnetic inline-block ${className}`,
    onClick,
  };
  if (href) props.href = href;

  if (as === "button") return <button {...props}>{children}</button>;
  if (as === "a") return <a {...props}>{children}</a>;
  return <div {...props}>{children}</div>;
}
