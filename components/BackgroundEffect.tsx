import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration
    const gridSize = 60;
    const packets: { x: number; y: number; axis: 'x' | 'y'; speed: number; size: number; alpha: number }[] = [];
    const maxPackets = 15;

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.15)'; // Very subtle grid
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const updatePackets = () => {
      // Spawn new packets
      if (packets.length < maxPackets && Math.random() < 0.05) {
        const axis = Math.random() > 0.5 ? 'x' : 'y';
        packets.push({
          x: axis === 'x' ? 0 : Math.floor(Math.random() * (width / gridSize)) * gridSize,
          y: axis === 'y' ? 0 : Math.floor(Math.random() * (height / gridSize)) * gridSize,
          axis,
          // SLOWED DOWN: Speed reduced from (2-5) to (0.5-2)
          speed: 0.5 + Math.random() * 1.5,
          size: 2 + Math.random() * 2,
          alpha: 1
        });
      }

      // Draw and move packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        
        // Changed to Electric Blue (Blue 500 equivalent)
        ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`; 
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#3b82f6';
        
        ctx.beginPath();
        if (p.axis === 'x') {
          ctx.rect(p.x, p.y - 1, 40, 3); // Elongated packet
          p.x += p.speed;
        } else {
          ctx.rect(p.x - 1, p.y, 3, 40);
          p.y += p.speed;
        }
        ctx.fill();

        // Fade out slightly - Reduced chance to fade so they travel further at slow speeds
        if (Math.random() > 0.99) p.alpha -= 0.1;

        // Remove if off screen or invisible
        if (p.x > width || p.y > height || p.alpha <= 0) {
          packets.splice(i, 1);
        }
        
        ctx.shadowBlur = 0;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();
      updatePackets();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

export default BackgroundEffect;