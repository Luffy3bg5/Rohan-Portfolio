import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Lightweight, accessible reveal-on-scroll container using IntersectionObserver.
 * Animates from ~20px below with a subtle fade and respects prefers-reduced-motion.
 * Unobserves immediately upon reveal to avoid re-triggering during scroll.
 */
export default function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up',
  threshold = 0.12 
}) {
  const ref = useRef(null);
  
  // Initialize to true if user prefers reduced motion
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, isRevealed]);

  const style = {
    transitionDelay: `${delay}ms`
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal-box ${direction} ${isRevealed ? 'revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
