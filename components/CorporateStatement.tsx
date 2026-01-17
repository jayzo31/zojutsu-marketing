import React from 'react';
import { Scale, Building2, Fingerprint, FileText } from 'lucide-react';
import ScrambleReveal from './ScrambleReveal';

const CorporateStatement: React.FC = () => {
  return (
    <section id="corporate" className="py-24 bg-corporate-surface border-b border-corporate-dim relative overflow-hidden">
      {/* Decorative large numbers */}
      <div className="absolute -top-20 -right-20 text-[200px] font-bold text-corporate-dim/10 font-mono select-none">
        01
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-end justify-between mb-16 border-b border-corporate-dim pb-6">
          <div>
            <div className="text-corporate-accent font-mono text-xs mb-2">SECURE DOCUMENT</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              <ScrambleReveal text="ENTITY STRUCTURE" />
            </h2>
          </div>
          <div className="hidden md:block text-right">
             <div className="text-[10px] font-mono text-corporate-dim">REF: ZJ-CORP-2026</div>
             <div className="text-[10px] font-mono text-corporate-dim">CLASS: UNCLASSIFIED</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Text / Dossier */}
          <div className="lg:col-span-7">
            <div className="bg-corporate-bg border border-corporate-dim p-8 relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-corporate-accent/20"></div>
              <FileText className="w-8 h-8 text-corporate-dim mb-6" />
              
              <div className="font-mono text-xs text-corporate-accent mb-4">
                // LEGAL DEFINITION
              </div>
              
              {/* COMPLIANCE NOTE: This paragraph explicitly retains 'ZoJutsu LLC' for Stripe verification */}
              <p className="text-xl text-white font-medium mb-6 leading-relaxed">
                <strong>ZoJutsu LLC</strong> is a software development company headquartered in <strong>Princeton, New Jersey</strong>. We build and operate SaaS products for creators and enterprises, including <a href="https://studiovid.ai" target="_blank" rel="noopener noreferrer" className="text-corporate-accent hover:underline decoration-1 underline-offset-4 cursor-pointer relative z-10">StudioVid.ai</a> (video analytics) and <a href="https://citebrand.com" target="_blank" rel="noopener noreferrer" className="text-corporate-accent hover:underline decoration-1 underline-offset-4 cursor-pointer relative z-10">CiteBrand.com</a> (SEO & brand monitoring).
              </p>
              
              <div className="space-y-4 text-corporate-muted font-mono text-sm border-t border-corporate-dim pt-6">
                <div className="flex gap-4">
                  <span className="text-corporate-dim">{">"}</span>
                  <p>Parent holding company owning and operating StudioVid.ai and CiteBrand.com.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-corporate-dim">{">"}</span>
                  <p>Provides subscription-based SaaS services with monthly and annual billing.</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-corporate-dim">{">"}</span>
                  <p>All payments processed securely. Charges appear as "ZOJUTSU" on statements.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Details */}
          <div className="lg:col-span-5 grid gap-4">
            {[
              {
                icon: Building2,
                title: "PARENT COMPANY",
                desc: "ZoJutsu LLC owns and operates StudioVid.ai and CiteBrand.com as wholly-owned products."
              },
              {
                icon: Scale,
                title: "BILLING & SUPPORT",
                desc: "Subscription billing, customer support, and refund requests handled by ZoJutsu LLC."
              },
              {
                icon: Fingerprint,
                title: "STATEMENT DESCRIPTOR",
                desc: "Credit card charges appear as 'ZOJUTSU' or 'ZOJUTSU*STUDIOVID' on your statement."
              }
            ].map((item, i) => (
              <div key={i} className="group p-6 bg-corporate-bg border border-corporate-dim hover:border-corporate-accent transition-colors relative cursor-interactive">
                <div className="corner-bracket corner-tl"></div>
                <div className="corner-bracket corner-tr"></div>
                <div className="corner-bracket corner-bl"></div>
                <div className="corner-bracket corner-br"></div>
                
                <div className="flex items-start gap-4">
                  <item.icon className="w-5 h-5 text-corporate-dim group-hover:text-corporate-accent transition-colors mt-1" />
                  <div>
                    <h3 className="text-white font-bold text-xs tracking-widest mb-2 font-mono">{item.title}</h3>
                    <p className="text-xs text-corporate-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CorporateStatement;