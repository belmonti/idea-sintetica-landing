'use client';

import React from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const FloatingWhatsAppBar: React.FC = () => {
  const { whatsapp } = CONTENT_CONFIG;

  return (
    <aside
      aria-label="Contacto directo por WhatsApp"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 pointer-events-none transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#0a0e17]/95 border border-white/[0.12] p-3 sm:p-4 sm:px-6 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Resplandor sutil interior */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.06] via-transparent to-teal-500/[0.06] pointer-events-none" />

          {/* Lado Izquierdo: Icono + Mensaje */}
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto justify-center sm:justify-start text-center sm:text-left">
            {/* Icono de ampolleta / Idea Sintética */}
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-[#00f5c4] shrink-0 shadow-inner">
              <svg className="w-5 h-5 fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41M12 6a6 6 0 00-6 6c0 2.22 1.21 4.16 3 5.2V19a1 1 0 001 1h4a1 1 0 001-1v-1.8c1.79-1.04 3-2.98 3-5.2a6 6 0 00-6-6z" />
              </svg>
            </div>

            <div>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {whatsapp.floatingBarText}
              </p>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Te respondemos directamente y te mostramos el sistema por dentro.
              </p>
            </div>
          </div>

          {/* Lado Derecho: Botón de WhatsApp Verde */}
          <a
            href={whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-gradient w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#020b06] shadow-md hover:scale-[1.02] transition-transform shrink-0"
          >
            <span>{whatsapp.floatingButtonText}</span>
            {/* Icono WhatsApp Oficial */}
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1112 20.2z" />
              <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.6-1.5-.9-2.1-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.2.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  );
};

