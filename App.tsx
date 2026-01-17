import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CorporateStatement from './components/CorporateStatement';
import Portfolio from './components/Portfolio';
import Infrastructure from './components/Infrastructure';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundEffect from './components/BackgroundEffect';
import TacticalCursor from './components/TacticalCursor';
import BootSequence from './components/BootSequence';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBootComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <BootSequence onComplete={handleBootComplete} />
      ) : (
        <div className="min-h-screen bg-corporate-bg text-corporate-text selection:bg-corporate-accent selection:text-white flex flex-col relative overflow-x-hidden cursor-none md:cursor-none animate-fade-in">
          {/* 
             NOTE: 'cursor-none' hides default cursor so TacticalCursor can take over on desktop.
             Mobile will ignore TacticalCursor component due to media query, but might need css adjustment if cursor:none affects touch.
             Usually cursor:none is fine on mobile, just invisible.
          */}
          
          {/* Custom HUD Cursor */}
          <TacticalCursor />

          {/* Active Data Flow Background */}
          <BackgroundEffect />
          
          {/* Global Noise Texture Overlay */}
          <div className="fixed inset-0 bg-noise pointer-events-none z-0 opacity-30 mix-blend-overlay"></div>
          
          {/* Scanning Laser Effect (Vignette) */}
          <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]"></div>

          {/* Right Side Telemetry / Scroll Bar */}
          <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-1 pointer-events-none mix-blend-difference">
             <div className="text-[10px] font-mono text-corporate-dim mb-2">SYS.DEPTH</div>
             <div className="h-64 w-1 bg-corporate-card relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 w-full bg-corporate-accent transition-all duration-100 ease-out"
                  style={{ height: `${scrollProgress * 100}%` }}
                ></div>
             </div>
             <div className="text-[10px] font-mono text-corporate-accent mt-2">
                {Math.round(scrollProgress * 100).toString().padStart(3, '0')}%
             </div>
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-grow">
              <Hero />
              
              {/* 
                CRITICAL FOR STRIPE: 
                This section contains the specific wording required for verification.
              */}
              <CorporateStatement />
              
              <Portfolio />
              
              {/* NEW: Global Network & Tech Stack */}
              <Infrastructure />
              
              <Contact />
            </main>

            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default App;