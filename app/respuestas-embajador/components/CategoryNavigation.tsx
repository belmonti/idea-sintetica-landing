'use client';

import React from 'react';
import { CONTENT_CONFIG, CategoryOption } from '../data/contentConfig';

interface Props {
  activeCategory: string;
  onSelectCategory: (id: CategoryOption['id']) => void;
  videoCounts: Record<string, number>;
}

export const CategoryNavigation: React.FC<Props> = ({
  activeCategory,
  onSelectCategory,
  videoCounts,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#00f5c4] font-semibold">
            FIG. 01 · NAVEGACIÓN MODULAR
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
            Explora las respuestas por tema
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 font-normal">
          Selecciona una categoría para filtrar los videos y explicaciones
        </p>
      </div>

      {/* Barra de Pills con scroll horizontal suave en móvil */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto py-3 no-scrollbar scroll-smooth">
        {CONTENT_CONFIG.categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = videoCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#00f5c4] text-[#05070c] shadow-[0_0_20px_rgba(0,245,196,0.35)] scale-[1.02]'
                  : 'bg-[#0c111c]/90 text-slate-300 hover:text-white border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {cat.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-black/20 text-[#05070c] font-bold'
                      : 'bg-white/[0.06] text-slate-400'
                  }`}
                >
                  {cat.badge}
                </span>
              )}
              <span>{cat.label}</span>
              <span
                className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-black/20 text-[#05070c] font-bold'
                    : 'bg-white/[0.04] text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

