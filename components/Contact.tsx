import React from 'react';
import { Mail, MapPin, Radio } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-corporate-surface border-t border-corporate-dim">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="border border-corporate-dim bg-corporate-bg p-1">
          <div className="border border-corporate-dim p-8 md:p-16 relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-corporate-accent to-transparent opacity-50"></div>
            <div className="absolute -left-10 bottom-10 -rotate-90 text-corporate-dim font-mono text-xs tracking-[1em]">TRANSMISSION</div>

            <div className="text-center relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-corporate-card border border-corporate-dim mb-6">
                <Radio className="w-6 h-6 text-corporate-accent animate-pulse" />
              </div>
              
              <h2 className="text-3xl font-bold text-white tracking-tight mb-2">ESTABLISH CONTACT</h2>
              <p className="text-corporate-muted font-mono text-xs mb-12">ENCRYPTED CHANNEL OPEN</p>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <a href="mailto:contact@zojutsu.com" className="group p-6 bg-corporate-card border border-corporate-dim hover:border-corporate-text transition-all">
                  <div className="flex items-center gap-4 mb-2">
                    <Mail className="w-5 h-5 text-corporate-dim group-hover:text-corporate-accent transition-colors" />
                    <span className="font-mono text-xs text-corporate-dim">METHOD: EMAIL</span>
                  </div>
                  <div className="text-white font-bold group-hover:text-corporate-accent transition-colors">contact@ZoJutsu.com</div>
                </a>

                <div className="p-6 bg-corporate-card border border-corporate-dim">
                  <div className="flex items-center gap-4 mb-2">
                    <MapPin className="w-5 h-5 text-corporate-dim" />
                    <span className="font-mono text-xs text-corporate-dim">HEADQUARTERS</span>
                  </div>
                  <div className="text-white font-bold">
                    ZoJutsu LLC<br />
                    <span className="font-normal text-corporate-muted">Princeton, New Jersey</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-corporate-dim border-dashed">
                <p className="text-[10px] font-mono text-corporate-dim uppercase">
                  [ SYSTEM NOTE: Product support tickets must be routed through respective platform helpdesks ]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;