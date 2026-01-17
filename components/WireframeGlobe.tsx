import React, { useEffect, useRef } from 'react';

const WireframeGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    
    const resize = () => {
       if (container) {
         width = container.clientWidth;
         height = container.clientHeight;
         canvas.width = width;
         canvas.height = height;
         ctx.font = '12px "JetBrains Mono", monospace';
         ctx.textAlign = 'center';
         ctx.textBaseline = 'middle';
       }
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Globe Config
    // Adjust radius based on smaller dimension to fit
    let globeRadius = Math.min(width, height) * 0.35; 
    const rotationSpeed = 0.002;
    let rotation = 0;
    
    // Matrix Charset (Half-width Katakana + Zojutsu chars)
    const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍZOJUTSU0123456789';
    
    // Generate Points
    const numPoints = 180; 
    const points: {x: number, y: number, z: number, char: string, changeRate: number}[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      
      points.push({
        x: Math.cos(theta) * radius * globeRadius,
        y: y * globeRadius,
        z: Math.sin(theta) * radius * globeRadius,
        char: chars.charAt(Math.floor(Math.random() * chars.length)),
        changeRate: 0.02 + Math.random() * 0.05 
      });
    }

    const animate = () => {
      // Re-calc radius on fly if needed or just use responsive canvas
      globeRadius = Math.min(width, height) * 0.35;
      
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      // Rotate
      rotation += rotationSpeed;

      // Projection
      const projectedPoints = points.map(p => {
        const rotatedX = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        const rotatedZ = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        
        // Depth scale
        const scale = (width * 0.8) / ((width * 0.8) - rotatedZ); 
        
        const x2d = (rotatedX * scale) + cx;
        const y2d = (p.y * scale) + cy;
        const alpha = Math.max(0, (rotatedZ + globeRadius) / (2 * globeRadius)); 
        
        // Character shift effect (The Matrix "Code" feel)
        if (Math.random() < p.changeRate) {
           p.char = chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return { x: x2d, y: y2d, z: rotatedZ, alpha, scale, char: p.char };
      });

      // Draw faint connections (The Network)
      ctx.lineWidth = 0.5;
      projectedPoints.forEach((p1, i) => {
        if (p1.z < -50 || p1.alpha < 0.1) return;
        
        // Proximity check for drawing lines
        for (let j = i + 1; j < numPoints; j++) {
           const p2 = projectedPoints[j];
           // Optimization: Check 2D distance roughly first
           const dx = p1.x - p2.x;
           const dy = p1.y - p2.y;
           
           if (Math.abs(dx) > 60 || Math.abs(dy) > 60) continue;

           const distSq = dx*dx + dy*dy;
           
           if (distSq < 2500) {
             ctx.beginPath();
             // Electric Blue
             ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(p1.alpha, p2.alpha) * 0.15})`;
             ctx.moveTo(p1.x, p1.y);
             ctx.lineTo(p2.x, p2.y);
             ctx.stroke();
           }
        }
      });

      // Draw Characters
      
      projectedPoints.forEach(p => {
        if (p.alpha < 0.05) return;

        const isHighlight = Math.random() > 0.99;
        
        ctx.fillStyle = isHighlight 
          ? '#ffffff' 
          : `rgba(59, 130, 246, ${p.alpha})`; 
        
        if (isHighlight) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffffff';
        } else {
            ctx.shadowBlur = 0;
        }
        
        const fontSize = Math.max(8, 12 * p.scale);
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        ctx.fillText(p.char, p.x, p.y);
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] pointer-events-none select-none mix-blend-screen perspective-1000">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default WireframeGlobe;