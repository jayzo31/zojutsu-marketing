import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
        if (canvas.parentElement) {
            width = canvas.parentElement.offsetWidth;
            height = canvas.parentElement.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        }
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16; // Slightly larger for better readability at low opacity
    const columns = Math.ceil(width / fontSize);
    
    // State for drops
    const drops: number[] = [];
    const speeds: number[] = [];
    
    // Initialize
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start above screen
        // SUPER SLOW SPEED: 0.05 to 0.2
        speeds[i] = 0.05 + Math.random() * 0.15; 
    }

    // Charset: Katakana + Latin + Numbers + Zojutsu chars
    const chars = 'ZOJUTSUｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>';

    // Frame throttling variables
    let lastTime = 0;
    const targetFps = 30; // Cap at 30fps for a more "cinematic/retro" feel, less jittery
    const interval = 1000 / targetFps;

    const animate = (timeStamp: number) => {
        const deltaTime = timeStamp - lastTime;

        if (deltaTime > interval) {
            lastTime = timeStamp - (deltaTime % interval);

            // Trail effect: Fade out previous frame. 
            // Using a higher opacity here (0.12) makes the trails disappear faster, keeping it cleaner.
            ctx.fillStyle = 'rgba(9, 9, 11, 0.12)'; 
            ctx.fillRect(0, 0, width, height);

            ctx.font = `500 ${fontSize}px "JetBrains Mono", monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                // Pick a character
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Render Logic
                const randomVal = Math.random();
                
                // Very rare bright white flash (0.2%)
                if (randomVal > 0.998) {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; 
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                } 
                // Occasional Electric Blue (5%)
                else if (randomVal > 0.95) {
                     // Blue 500 equivalent
                     ctx.fillStyle = 'rgba(59, 130, 246, 0.4)'; 
                     ctx.shadowBlur = 2;
                     ctx.shadowColor = 'rgba(59, 130, 246, 0.2)';
                } 
                // Standard: Ghostly Zinc (Invisible background texture)
                else {
                     // Very transparent grey/zinc. Subliminal.
                     ctx.fillStyle = 'rgba(63, 63, 70, 0.15)';
                     ctx.shadowBlur = 0;
                }

                ctx.fillText(text, x, y);

                // Move drop
                drops[i] += speeds[i];

                // Reset when off screen
                if (drops[i] * fontSize > height && Math.random() > 0.98) {
                    drops[i] = 0;
                }
            }
        }
        
        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="w-full h-full pointer-events-none"
        style={{ 
            // Aggressive Masking: 
            // Fades out significantly on the left (to keep text readable)
            // Fades out at the bottom
            maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 80%, transparent 100%)' 
        }}
    />
  );
};

export default MatrixRain;