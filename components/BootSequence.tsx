import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, Cpu, Wifi } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);

  const bootLogs = [
    "INITIALIZING_KERNEL...",
    "LOADING_MODULES: [CORE] [NET] [CRYPTO]",
    "ESTABLISHING_SECURE_UPLINK...",
    "VERIFYING_IDENTITY_TOKENS...",
    "ALLOCATING_MEMORY_BLOCKS...",
    "MOUNTING_VIRTUAL_DOM...",
    "OPTIMIZING_RENDER_PATH...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    // Progress Bar Animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random increments for realism
        return prev + Math.random() * 5;
      });
    }, 100);

    // Log Logic
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(onComplete, 800); // Wait a bit after logs finish before unmounting
      }
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono p-6 cursor-none">
      
      {/* Container */}
      <div className="w-full max-w-md">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-8">
           <div className="relative">
             <div className="absolute inset-0 bg-corporate-accent blur-xl opacity-20 animate-pulse"></div>
             <Terminal size={48} className="text-corporate-accent relative z-10" />
           </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2 flex justify-between text-xs text-corporate-accent font-bold">
          <span>BOOT_SEQUENCE</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="h-1 w-full bg-corporate-dim mb-8 relative overflow-hidden">
          <div 
            className="h-full bg-corporate-accent transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Logs */}
        <div className="h-48 overflow-hidden flex flex-col justify-end border border-corporate-dim p-4 bg-corporate-card/20 backdrop-blur-sm">
          {logs.map((log, i) => (
            <div key={i} className="text-xs text-corporate-muted mb-1 flex items-center gap-2">
              <span className="text-corporate-dim">{`>`}</span>
              <span className={i === logs.length - 1 ? 'text-white animate-pulse' : ''}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* System Badges */}
        <div className="mt-6 flex justify-center gap-8 opacity-50">
           <div className="flex flex-col items-center gap-1">
              <Cpu size={14} className="text-corporate-dim" />
              <span className="text-[8px] text-corporate-dim">CPU_OK</span>
           </div>
           <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={14} className="text-corporate-dim" />
              <span className="text-[8px] text-corporate-dim">SEC_OK</span>
           </div>
           <div className="flex flex-col items-center gap-1">
              <Wifi size={14} className="text-corporate-dim" />
              <span className="text-[8px] text-corporate-dim">NET_OK</span>
           </div>
        </div>
        
      </div>

      {/* Version Footer */}
      <div className="absolute bottom-6 text-[10px] text-corporate-dim">
        ZOJUTSU_OS v4.2.0 // BUILD_2991
      </div>
    </div>
  );
};

export default BootSequence;