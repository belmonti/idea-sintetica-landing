'use client';

import React from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const ComparisonSection: React.FC = () => {
  const { comparison } = CONTENT_CONFIG;

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Kicker y Título */}
      <div className="text-center mb-8 sm:mb-12">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#00f5c4] font-semibold block mb-2">
          {comparison.kicker}
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {comparison.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          {comparison.subtitle}
        </p>
      </div>

      {/* Grid de 2 Columnas Comparativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Columna Izquierda: GoHighLevel Directo */}
        <div className="rounded-2xl p-6 sm:p-8 bg-[#0c111c]/60 border border-white/10 relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/[0.05] text-slate-400 border border-white/10">
                {comparison.columns.left.badge}
              </span>
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-1">
              {comparison.columns.left.title}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {comparison.columns.left.subtitle}
            </p>

            <ul className="space-y-3.5">
              {comparison.columns.left.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 text-red-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span>{feat.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-slate-500 text-center font-mono">
            Mayor curva técnica · Más tiempo invertido
          </div>
        </div>

        {/* Columna Derecha: Plan Embajador (Destacada) */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#0f1725] to-[#0c111c] border border-[#00f5c4]/35 shadow-[0_0_40px_rgba(0,245,196,0.12)] relative flex flex-col justify-between">
          <div className="absolute -top-3 right-6">
            <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-[#00f5c4] to-[#10b981] text-[#05070c] text-[11px] font-mono font-extrabold uppercase tracking-wider shadow-md">
              {comparison.columns.right.badge}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#00f5c4]/10 text-[#00f5c4] border border-[#00f5c4]/20 font-semibold">
                SISTEMA LLAVE EN MANO
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {comparison.columns.right.title}
            </h3>
            <p className="text-xs text-emerald-300/80 mb-6">
              {comparison.columns.right.subtitle}
            </p>

            <ul className="space-y-3.5">
              {comparison.columns.right.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-[#00f5c4]/15 border border-[#00f5c4]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#00f5c4]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feat.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.08] text-xs text-[#00f5c4] text-center font-semibold">
            Despliegue inmediato · Listo para monetizar
          </div>
        </div>
      </div>
    </section>
  );
};

