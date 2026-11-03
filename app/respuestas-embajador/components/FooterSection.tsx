'use client';

import React from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#05070c] pt-12 pb-16 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400 font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#00f5c4]" />
          <span>{CONTENT_CONFIG.brand.name}</span>
          <span className="text-slate-600">•</span>
          <span>{CONTENT_CONFIG.brand.tagline}</span>
        </div>

        <p className="max-w-md text-slate-500 leading-relaxed">
          Idea Sintética es un ecosistema independiente de soluciones comerciales y automatización.
          GoHighLevel es una marca registrada de HighLevel Inc.
        </p>

        <div className="flex items-center gap-4 text-slate-400 mt-2">
          <a href="https://ideasintetica.pro" className="hover:text-[#00f5c4] transition-colors">
            Sitio Principal
          </a>
          <span>•</span>
          <a href={CONTENT_CONFIG.whatsapp.link} target="_blank" rel="noopener noreferrer" className="hover:text-[#00f5c4] transition-colors">
            Contacto WhatsApp
          </a>
        </div>

        <div className="font-mono text-[11px] text-slate-600 mt-4">
          © {new Date().getFullYear()} Idea Sintética. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

