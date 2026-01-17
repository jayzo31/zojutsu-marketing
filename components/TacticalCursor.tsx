import React, { useEffect, useRef, useState } from 'react';

const TacticalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Track mouse position and trailing position
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update coordinates text occasionally (throttled by react state, but fine for this purpose)
      // We'll update the ref for the loop, but state for the render
      if (Math.random() > 0.8) { // update periodically to save renders
         setCoords({ x: e.clientX, y: e.clientY });
      }

      // Check hover state
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, .cursor-interactive');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop for smooth trailing
    const animate = () => {
      // Lerp (Linear Interpolation) for smooth follow
      const dx = mouse.current.x - cursor.current.x;
      const dy = mouse.current.y - cursor.current.y;
      
      cursor.current.x += dx * 0.15;
      cursor.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorDotRef.current) {
         // Dot follows instantly
         cursorDotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Small instant dot */}
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
      />
      
      {/* Trailing Reticle */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center transition-[width,height] duration-300 ease-out ${
          isHovering ? 'w-12 h-12' : 'w-8 h-8'
        }`}
      >
        {/* Corners */}
        <div className={`absolute inset-0 border border-corporate-accent transition-all duration-300 ${isHovering ? 'rotate-45 scale-90 border-white' : 'rotate-0 opacity-50'}`}></div>
        <div className={`absolute inset-0 border border-white opacity-20 scale-50 transition-all duration-300 ${isHovering ? 'scale-0' : 'scale-50'}`}></div>

        {/* Coordinate Label */}
        <div className="absolute top-full left-full ml-2 mt-2 font-mono text-[8px] text-corporate-accent whitespace-nowrap opacity-70">
           X:{Math.round(coords.x)}<br/>Y:{Math.round(coords.y)}
        </div>
      </div>
    </>
  );
};

export default TacticalCursor;