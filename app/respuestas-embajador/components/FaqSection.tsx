'use client';

import React, { useState } from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { faqs } = CONTENT_CONFIG;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00f5c4] font-semibold block mb-2">
          FIG. 04 · RESOLUCIÓN DE PREGUNTAS CLAVE
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Lo que todos preguntan antes de entrar
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Claridad total sobre las condiciones técnicas, operativas y de permanencia del sistema.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-200 border ${
                isOpen
                  ? 'bg-[#0f1725] border-[#00f5c4]/40 shadow-[0_8px_30px_rgba(0,245,196,0.08)]'
                  : 'bg-[#0c111c]/80 border-white/[0.08] hover:border-white/20'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#00f5c4] font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </h3>
                </div>
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                    isOpen
                      ? 'bg-[#00f5c4] text-[#05070c] border-[#00f5c4] rotate-180'
                      : 'bg-white/[0.04] text-slate-400 border-white/10'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

