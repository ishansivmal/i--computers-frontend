import { useRef, useState, useEffect } from "react";

/**
 * Creates a parallax scrolling effect on an image.
 * Uses transform3d for GPU-accelerated smooth movement.
 */
export default function ParallaxImage({ src, alt, speed = 0.3, className = "" }) {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId;
    function handleScroll() {
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Only compute when in viewport
        if (rect.bottom > 0 && rect.top < windowH) {
          const center = rect.top + rect.height / 2 - windowH / 2;
          setOffset(center * speed);
        }
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover"
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
        loading="lazy"
      />
    </div>
  );
}