import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import MatrixRain from './MatrixRain';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "ARCHITECTING";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  useEffect(() => {
    let index = 0;
    // Slightly slower, more deliberate typing speed
    const timer = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
         clearInterval(timer);
         setIsTypingComplete(true);
      }
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden bg-transparent border-b border-corporate-dim/50 min-h-[90vh] flex items-center">
      
      {/* DIGITAL RAIN MATRIX - Full background but masked in the component */}
      <div className="absolute inset-0 z-0 opacity-60">
         <MatrixRain />
      </div>

      {/* GIANT WATERMARK - Reduced opacity */}
      <div className="absolute top-0 right-0 opacity-[0.02] select-none pointer-events-none z-0 hidden lg:block overflow-hidden">
        <div className="flex flex-col items-end leading-[0.8]">
          <span className="text-[25vw] font-black text-white tracking-tighter mr-[-2vw]">Zo</span>
          <span className="text-[12vw] font-mono text-white tracking-[0.5em] mt-[-4vw] mr-[4vw]">Jutsu</span>
        </div>
      </div>

      {/* Technical Markings */}
      <div className="absolute top-1/3 left-6 hidden md:block text-[10px] font-mono text-corporate-dim space-y-1 animate-fade-in delay-500 z-10">
        <div>LAT: 34.0522 N</div>
        <div>LON: 118.2437 W</div>
        <div>SEC: 001-A</div>
        <div className="text-corporate-accent animate-pulse">LIVE FEED</div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-start border-l-2 border-corporate-accent pl-8 ml-2 md:ml-0 backdrop-blur-[2px]">
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-corporate-card/50 backdrop-blur-sm border border-corporate-dim text-corporate-accent text-xs font-mono mb-8 animate-fade-in">
            <Terminal size={12} />
            <span>EST. 2024 // ROOT ACCESS GRANTED</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9] group cursor-default">
            {/* 
               Smooth Shimmer Effect:
               Instead of glitching, the text has a 'liquid metal' reflection passing over it.
            */}
            <div className={`inline-block ${isTypingComplete ? 'animate-text-shimmer text-gradient-shimmer' : 'text-white'}`}>
               {text}
            </div>
            
            {/* Blinking Cursor - stops blinking and fades out slightly when done to reduce noise */}
            <span className={`text-corporate-accent ${isTypingComplete ? 'opacity-50' : 'cursor-blink'}`}>_</span> 
            
            <br />
            <span className="text-corporate-dim animate-fade-in delay-300 block hover:text-corporate-muted transition-colors duration-500">
                DIGITAL SCALE
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-corporate-muted mb-12 max-w-2xl leading-relaxed font-light animate-fade-in delay-500">
            ZoJutsu LLC is a software holding company building intelligent tools for creators and enterprises. Our products—<span className="text-corporate-accent">StudioVid.ai</span> and <span className="text-corporate-accent">CiteBrand.com</span>—power the next generation of digital analytics.
          </p>
          
          <div className="flex flex-wrap gap-6 animate-fade-in delay-500">
            <a 
              href="#portfolio" 
              className="group relative px-8 py-4 bg-corporate-accent text-white text-sm font-bold font-mono tracking-wider overflow-hidden hover:bg-white hover:text-black transition-colors duration-300"
            >
              {/* Button Sheen Effect */}
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
              
              <span className="relative flex items-center gap-2 z-10">
                VIEW BLUEPRINTS
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
            
            <a 
              href="#corporate" 
              className="group px-8 py-4 border border-corporate-dim text-corporate-muted text-sm font-bold font-mono tracking-wider hover:border-corporate-text hover:text-white transition-all bg-corporate-bg/50 backdrop-blur-sm"
            >
              CORPORATE_DATA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;