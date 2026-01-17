import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Specific state for the Jutsu part of the logo
  const [jutsuText, setJutsuText] = useState("Jutsu");
  const intervalRef = useRef<number | null>(null);

  const TARGET_TEXT = "Jutsu";
  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrambleJutsu = () => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    // SLOWED DOWN: Increased interval from 40ms to 75ms
    intervalRef.current = window.setInterval(() => {
      setJutsuText(prev => 
        prev.split("").map((letter, index) => {
          if (index < iteration) {
            return TARGET_TEXT[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= TARGET_TEXT.length) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      // SLOWED DOWN: Decreased increment step from 1/2 to 1/4 (resolve one letter every 4 ticks)
      iteration += 1 / 4;
    }, 75);
  };

  const navLinks = [
    { name: 'STRUCTURE', href: '#corporate' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'UPLINK', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-corporate-bg/95 backdrop-blur-md border-corporate-dim py-3' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* NEW SPLIT LOGO DESIGN */}
        <div 
          className="flex items-stretch select-none group cursor-pointer" 
          onMouseEnter={scrambleJutsu}
        >
          {/* THE CORE: Zo */}
          <div className="relative bg-corporate-accent px-4 py-1 flex items-center justify-center skew-x-[-12deg] z-10 overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-corporate-accent">
             {/* Sheen effect on hover - Slowed down for smoother feel */}
             <div className="absolute inset-0 bg-white/30 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-[12deg]"></div>
             <span className="skew-x-[12deg] font-black text-2xl text-white tracking-tight leading-none pt-1">Zo</span>
          </div>

          {/* THE TECHNIQUE: Jutsu */}
          <div className="relative border-y border-r border-corporate-dim bg-corporate-surface/80 px-4 py-1 flex items-center skew-x-[-12deg] -ml-2 pl-6">
             <span className="skew-x-[12deg] font-mono text-lg font-bold text-corporate-muted tracking-[0.2em] group-hover:text-white transition-colors leading-none pt-1 min-w-[80px]">
               {jutsuText}
             </span>
             {/* Decorator Dot */}
             <div className="absolute right-2 top-2 w-1 h-1 bg-corporate-accent rounded-full opacity-50 group-hover:opacity-100 group-hover:animate-ping skew-x-[12deg]"></div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative group py-2"
            >
              <span className="text-xs font-mono font-bold text-corporate-muted group-hover:text-white transition-colors tracking-widest">
                {link.name}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-corporate-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
          <div className="h-4 w-px bg-corporate-dim mx-2"></div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-corporate-accent">
            <span className="w-2 h-2 rounded-full bg-corporate-accent animate-pulse"></span>
            SYS.ONLINE
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-corporate-text p-2 border border-corporate-dim bg-corporate-surface"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-corporate-bg border-b border-corporate-dim p-6">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="flex items-center justify-between text-corporate-text hover:text-corporate-accent font-mono text-sm border-b border-corporate-dim pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
                <Activity size={14} className="opacity-50" />
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;