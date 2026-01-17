import React from 'react';
import { Network, Zap, Shield, Database, Code, Globe } from 'lucide-react';
import WireframeGlobe from './WireframeGlobe';
import ScrambleReveal from './ScrambleReveal';

const StatCard: React.FC<{ label: string; value: string; icon: any }> = ({ label, value, icon: Icon }) => (
  <div className="bg-corporate-bg border border-corporate-dim p-4 flex items-center gap-4 group hover:border-corporate-accent transition-colors">
    <div className="p-2 bg-corporate-card border border-corporate-dim text-corporate-accent group-hover:text-white group-hover:bg-corporate-accent transition-colors">
      <Icon size={18} />
    </div>
    <div>
      <div className="text-2xl font-mono font-bold text-white tracking-tighter">{value}</div>
      <div className="text-[10px] font-mono text-corporate-muted uppercase tracking-wider">{label}</div>
    </div>
  </div>
);

const TechTicker: React.FC = () => {
  const techs = ["REACT", "TYPESCRIPT", "PYTHON", "TENSORFLOW", "AWS_LAMBDA", "DOCKER", "KUBERNETES", "POSTGRESQL", "REDIS", "GRAPHQL", "TAILWIND", "NODE_JS", "RUST", "GO"];
  return (
    <div className="w-full overflow-hidden border-y border-corporate-dim bg-corporate-card/20 py-3 mt-12">
      <div className="animate-text-shimmer flex whitespace-nowrap gap-12 text-xs font-mono font-bold text-corporate-dim select-none">
        {[...techs, ...techs, ...techs].map((tech, i) => (
          <span key={i} className="hover:text-corporate-accent transition-colors cursor-default">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const Infrastructure: React.FC = () => {
  return (
    <section id="infrastructure" className="py-24 relative bg-corporate-surface overflow-hidden border-b border-corporate-dim">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-full bg-corporate-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className="flex items-center gap-2 mb-2">
              <Globe size={16} className="text-corporate-accent" />
              <span className="text-corporate-accent font-mono text-xs tracking-wider">SECTION 03 // INFRASTRUCTURE</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              <ScrambleReveal text="GLOBAL NEURAL NETWORK" />
            </h2>
            
            <p className="text-corporate-muted text-lg leading-relaxed mb-8 max-w-xl">
              ZoJutsu products are built on modern cloud infrastructure, leveraging edge computing and CDN networks for fast, reliable service delivery to creators worldwide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <StatCard icon={Network} label="Cloud Regions" value="12+" />
               <StatCard icon={Zap} label="Avg Response" value="< 100ms" />
               <StatCard icon={Shield} label="Uptime SLA" value="99.9%" />
               <StatCard icon={Database} label="API Calls/Day" value="500K+" />
            </div>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-corporate-dim">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               SYSTEM STATUS: ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Right Content: Globe Viz */}
          <div className="lg:w-1/2 w-full h-[500px] relative">
             <div className="absolute inset-0 border border-corporate-dim bg-corporate-bg/50 backdrop-blur-sm relative group overflow-hidden">
                {/* Tech Markings */}
                <div className="absolute top-4 left-4 text-[10px] font-mono text-corporate-accent">TOPOLOGY_VIEW</div>
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-corporate-dim">ROTATION: AUTO</div>
                
                {/* Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-corporate-dim/20 rounded-full"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[1px] bg-corporate-dim/10"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-corporate-dim/10"></div>

                {/* The Globe Component */}
                <WireframeGlobe />
             </div>
          </div>

        </div>
      </div>
      
      <TechTicker />

    </section>
  );
};

export default Infrastructure;