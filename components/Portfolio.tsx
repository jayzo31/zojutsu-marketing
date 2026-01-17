import React, { useRef, useState } from 'react';
import { ArrowUpRight, Cpu } from 'lucide-react';
import ScrambleReveal from './ScrambleReveal';

interface ProductCardProps {
  moduleCode: string;
  name: string;
  subtitle: string;
  url: string;
  description: string;
  techSpecs: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ moduleCode, name, subtitle, url, description, techSpecs }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (limit to +/- 5 degrees)
    // Y rotation is based on X position (left/right)
    // X rotation is based on Y position (top/bottom) - inverted
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = ((y - rect.height / 2) / rect.height) * -10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="group relative bg-corporate-card border-l-2 border-corporate-accent p-8 flex flex-col h-full shadow-lg transition-transform duration-100 ease-out will-change-transform transform-style-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.02 : 1})`,
          transition: isHovering ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        {/* Shine Effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white to-transparent"
          style={{
             mixBlendMode: 'overlay',
             transform: `translateX(${rotation.y * 2}%) translateY(${rotation.x * 2}%)`
          }}
        />

        {/* Status Light - Top Right */}
        <div className="absolute top-6 right-6 flex items-center gap-2 transform translate-z-10">
            <span className="text-[10px] font-mono text-corporate-dim group-hover:text-corporate-muted transition-colors tracking-widest">SYS.ONLINE</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
        </div>

        {/* Header */}
        <div className="font-mono text-xs text-corporate-accent mb-3 tracking-wider opacity-80 transform translate-z-20">
          {moduleCode}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight group-hover:text-white/90 transition-colors transform translate-z-30">
          {name}
        </h3>
        <div className="font-mono text-[10px] text-corporate-muted mb-6 tracking-[0.2em] uppercase transform translate-z-20">
          {subtitle}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-8 leading-relaxed border-l border-corporate-dim pl-4 py-1 transform translate-z-10">
          {description}
        </p>

        {/* Action Button */}
        <div className="mt-auto mb-6 transform translate-z-30">
          <a 
            href={url}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm font-bold text-corporate-accent hover:text-white transition-colors uppercase tracking-widest group/btn cursor-none"
          >
            <span>[ INITIATE UPLINK ]</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Tech Specs Footer */}
        <div className="text-[10px] font-mono text-corporate-dim pt-4 border-t border-corporate-dim/30 w-full tracking-wider opacity-70 transform translate-z-10">
          {techSpecs}
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-24 px-6 relative bg-corporate-bg border-b border-corporate-dim">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-corporate-dim pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Cpu size={16} className="text-corporate-accent animate-pulse" />
              <span className="text-corporate-accent font-mono text-xs tracking-wider">SECTION 02 // ASSETS</span>
            </div>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              <ScrambleReveal text="DEPLOYED ASSETS" />
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-corporate-muted font-mono text-xs leading-relaxed">
              [ SYSTEMS NORMAL ]<br/>
              Monitoring active nodes...
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <ProductCard
            moduleCode="// MODULE_01 — OWNED BY ZOJUTSU LLC"
            name="StudioVid.ai"
            subtitle="VIDEO_ANALYTICS_PLATFORM"
            url="https://studiovid.ai"
            description="AI-powered video analytics for YouTube creators. Track performance metrics, optimize thumbnails, analyze competitors, and grow your channel with data-driven insights."
            techSpecs="SUBSCRIPTION: $19-99/mo | BILLING: ZOJUTSU LLC"
          />

          <ProductCard
            moduleCode="// MODULE_02 — OWNED BY ZOJUTSU LLC"
            name="CiteBrand.com"
            subtitle="SEO_&_BRAND_MONITORING"
            url="https://citebrand.com"
            description="Monitor your brand's visibility across search engines and AI platforms. Track citations, analyze rankings, and measure your digital footprint in the age of AI search."
            techSpecs="SUBSCRIPTION: $29-149/mo | BILLING: ZOJUTSU LLC"
          />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;