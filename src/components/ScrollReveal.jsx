import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Wraps children with scroll-triggered animations.
 * Supports multiple animation directions & stagger delays.
 *
 * @param {"up"|"down"|"left"|"right"|"zoom"|"flip"} direction
 * @param {number} delay - stagger delay in ms
 * @param {number} duration - animation duration in ms
 */
export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  threshold = 0.15,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const transforms = {
    up: "translate3d(0, 60px, 0)",
    down: "translate3d(0, -60px, 0)",
    left: "translate3d(-60px, 0, 0)",
    right: "translate3d(60px, 0, 0)",
    zoom: "scale3d(0.85, 0.85, 0.85)",
    flip: "perspective(800px) rotateY(30deg)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0) scale3d(1,1,1) rotateY(0deg)" : transforms[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}