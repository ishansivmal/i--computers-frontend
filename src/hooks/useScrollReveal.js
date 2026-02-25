import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that detects when an element enters the viewport.
 * Uses IntersectionObserver for best performance (no scroll listeners).
 *
 * @param {Object} options
 * @param {number} options.threshold - 0 to 1, how much must be visible
 * @param {string} options.rootMargin - offset from viewport edge
 * @param {boolean} options.triggerOnce - only animate once?
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}