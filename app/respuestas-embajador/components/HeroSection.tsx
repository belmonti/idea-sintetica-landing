'use client';

import React, { useState } from 'react';
import { CONTENT_CONFIG } from '../data/contentConfig';

export const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { hero } = CONTENT_CONFIG;

  return (
    <section className="relative pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* 1. Kicker / Indicador Editorial estilo La Fábrica + Idea Sintética */}
      <div className="inline-flex flex-col items-center justify-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111722] border border-[#00f5c4]/30 text-[#00f5c4] font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,245,196,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4] animate-pulse" />
          <span>{hero.kicker}</span>
        </div>
      </div>

      {/* 2. Título Principal */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] mb-4 sm:mb-6 max-w-4xl mx-auto">
        {hero.titlePrimary}{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f5c4] via-[#38ef7d] to-[#b4ff39]">
          {hero.titleHighlight}
        </span>
      </h1>

      {/* 3. Subtítulo Conciso */}
      <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed">
        {hero.subtitle}
      </p>

      {/* 4. Reproductor Principal con Video Facade (Click-to-Load) */}
      <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c111c] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] group transition-all">
        {/* Halo ambiental interior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />

        {isPlaying ? (
          <iframe
            src={hero.featuredVideo.videoUrl}
            title={hero.featuredVideo.title}
            className="w-full h-full object-cover z-20 relative"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label="Reproducir video principal del Plan Embajador"
            className="w-full h-full text-left relative cursor-pointer block group focus:outline-none focus:ring-2 focus:ring-[#00f5c4]"
          >
            {/* Imagen de carátula optimizada */}
            <img
              src={hero.featuredVideo.poster}
              alt={hero.featuredVideo.title}
              className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500"
              loading="eager"
            />

            {/* Badge de duración superior */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {hero.featuredVideo.badge}
              </span>
            </div>

            {/* Botón Play Central con diseño premium */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-[#00f5c4]/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,245,196,0.3)] group-hover:scale-110 group-hover:border-[#00f5c4] group-hover:shadow-[0_0_40px_rgba(0,245,196,0.6)] transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#00f5c4] to-[#10b981] flex items-center justify-center text-[#05070c] pl-1 shadow-inner">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm font-semibold text-white drop-shadow-md tracking-wide">
                Hacer clic para ver presentación (4 min)
              </span>
            </div>
          </button>
        )}
      </div>
    </section>
  );
};

