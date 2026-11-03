'use client';

import React from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const HeaderNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#05070c]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a href="https://ideasintetica.pro" className="flex items-center gap-2.5 group">
            {/* SVG Logo Ampolleta / Idea Sintética */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0F1523] border border-white/[0.12] flex items-center justify-center p-1.5 shadow-sm group-hover:border-[#00f5c4]/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#00f5c4]" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
                <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.15" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white group-hover:text-[#00f5c4] transition-colors">
                IDEA SINTÉTICA
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Plan Embajador
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
              Centro de Respuestas
            </span>
          </div>
        </div>

        {/* CTA rápido */}
        <div className="flex items-center gap-3">
          <a
            href={CONTENT_CONFIG.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#00f5c4]/40 text-xs text-slate-300 hover:text-white transition-all font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-pulse" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};

