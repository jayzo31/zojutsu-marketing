import React, { useState, useEffect, useRef } from 'react';

interface ScrambleRevealProps {
  text: string;
  className?: string;
  speed?: number; // ms per char
}

const ScrambleReveal: React.FC<ScrambleRevealProps> = ({ text, className = "", speed = 50 }) => {
  const [display, setDisplay] = useState(text); // Start with full text for SEO/SSR, then we scramble on mount if needed
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_!@#%&";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 2; // Speed of resolve
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, text, speed]);

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? display : <span className="opacity-0">{text}</span>}
    </div>
  );
};

export default ScrambleReveal;