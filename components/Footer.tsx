import React, { useEffect, useState } from 'react';
import { Cpu, Wifi, Server, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  const [cpuLoad, setCpuLoad] = useState(32);
  const [memLoad, setMemLoad] = useState(45);
  const [netActivity, setNetActivity] = useState([10, 20, 15, 40, 30, 60, 20, 10]);

  // Simulate system fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => Math.min(99, Math.max(10, prev + (Math.random() * 20 - 10))));
      setMemLoad(prev => Math.min(90, Math.max(20, prev + (Math.random() * 10 - 5))));
      
      setNetActivity(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.floor(Math.random() * 100));
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-corporate-surface border-t border-corporate-dim pt-12 pb-8 relative overflow-hidden">
      {/* Decorative Scanline top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-corporate-accent to-transparent opacity-50 animate-pulse"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COL 1: Branding & Legal */}
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-corporate-accent"></div>
                <span className="text-xl font-black text-white tracking-tighter">ZoJutsu LLC</span>
             </div>
             <p className="text-xs text-corporate-muted leading-relaxed mb-4">
                Software holding company building tools for creators and enterprises.
             </p>
             <div className="text-[10px] font-mono text-corporate-dim space-y-1">
                <div>Princeton, New Jersey</div>
                <div>contact@zojutsu.com</div>
             </div>
          </div>

          {/* COL 2: System Metrics (Fake Charts) */}
          <div className="col-span-1">
             <h4 className="text-xs font-mono font-bold text-white mb-6 flex items-center gap-2">
               <Cpu size={12} className="text-corporate-accent" /> SYSTEM_LOAD
             </h4>
             
             <div className="space-y-3 font-mono text-[10px] text-corporate-muted">
                {/* CPU Bar */}
                <div className="flex items-center justify-between">
                   <span>CPU_CORE_01</span>
                   <span className="text-corporate-accent">{Math.round(cpuLoad)}%</span>
                </div>
                <div className="w-full h-1 bg-corporate-bg border border-corporate-dim">
                   <div className="h-full bg-corporate-accent transition-all duration-500" style={{ width: `${cpuLoad}%` }}></div>
                </div>

                {/* MEM Bar */}
                <div className="flex items-center justify-between mt-2">
                   <span>MEM_ALLOC</span>
                   <span className="text-white">{Math.round(memLoad)}%</span>
                </div>
                <div className="w-full h-1 bg-corporate-bg border border-corporate-dim">
                   <div className="h-full bg-corporate-text/50 transition-all duration-500" style={{ width: `${memLoad}%` }}></div>
                </div>
             </div>
          </div>

          {/* COL 3: Network Status */}
          <div className="col-span-1">
            <h4 className="text-xs font-mono font-bold text-white mb-6 flex items-center gap-2">
               <Server size={12} className="text-corporate-accent" /> NODE_STATUS
             </h4>
             <ul className="space-y-2 font-mono text-[10px]">
                <li className="flex justify-between text-corporate-muted">
                   <span>[US-EAST-1]</span>
                   <span className="text-green-500">ONLINE</span>
                </li>
                <li className="flex justify-between text-corporate-muted">
                   <span>[EU-WEST-2]</span>
                   <span className="text-green-500">ONLINE</span>
                </li>
                <li className="flex justify-between text-corporate-muted">
                   <span>[AP-SOUTH-1]</span>
                   <span className="text-yellow-500 animate-pulse">REROUTING</span>
                </li>
                <li className="flex justify-between text-corporate-muted">
                   <span>[ZJ-INTERNAL]</span>
                   <span className="text-corporate-accent">SECURE</span>
                </li>
             </ul>
          </div>

          {/* COL 4: Products & Links */}
          <div className="col-span-1">
             <h4 className="text-xs font-mono font-bold text-white mb-6 flex items-center gap-2">
               <Wifi size={12} className="text-corporate-accent" /> PRODUCTS
             </h4>
             <ul className="space-y-2 font-mono text-xs">
                <li><a href="https://studiovid.ai" target="_blank" rel="noopener noreferrer" className="text-corporate-muted hover:text-corporate-accent transition-colors">StudioVid.ai</a></li>
                <li><a href="https://citebrand.com" target="_blank" rel="noopener noreferrer" className="text-corporate-muted hover:text-corporate-accent transition-colors">CiteBrand.com</a></li>
                <li className="pt-2 border-t border-corporate-dim mt-2">
                   <a href="#contact" className="text-corporate-muted hover:text-corporate-accent transition-colors">Contact Us</a>
                </li>
             </ul>
          </div>

        </div>

        {/* Bottom Bar: Logs & Copyright */}
        <div className="border-t border-corporate-dim pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           {/* Scrolling Log (Visual Only) */}
           <div className="flex items-center gap-4 text-[10px] font-mono text-corporate-dim overflow-hidden whitespace-nowrap max-w-md">
              <Activity size={10} className="animate-spin" />
              <div className="animate-pulse">
                 logs: connection_established... authenticating... packet_loss: 0%...
              </div>
           </div>

           <div className="text-[10px] font-mono text-corporate-dim uppercase">
              &copy; {new Date().getFullYear()} ZoJutsu LLC. All systems operational.
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;