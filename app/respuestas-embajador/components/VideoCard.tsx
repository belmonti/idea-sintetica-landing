'use client';

import React from 'react';
import { VideoItem } from '../data/contentConfig';

interface Props {
  video: VideoItem;
  onOpenVideo: (video: VideoItem) => void;
}

export const VideoCard: React.FC<Props> = ({ video, onOpenVideo }) => {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl bg-[#0c111c]/90 border border-white/[0.08] hover:border-[#00f5c4]/40 hover:shadow-[0_16px_40px_rgba(0,245,196,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* 1. Header de Tarjeta: Índice estilo La Fábrica */}
      <div className="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-white/[0.05]">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5c4]" />
          <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-300 uppercase">
            {video.fig} · {video.tag}
          </span>
        </div>
        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
          {video.duration}
        </span>
      </div>

      {/* 2. Área Visual / Fachada de Video (16:9) */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#090d15] cursor-pointer" onClick={() => onOpenVideo(video)}>
        {video.isPlaceholder ? (
          // Vista Placeholder elegante y profesional (sin inventar contenidos)
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0c111c] via-[#0e1622] to-[#0c111c] relative group-hover:bg-[#111926] transition-colors">
            {/* Patrón de líneas sutiles */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00f5c4_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="w-11 h-11 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-400 mb-2 group-hover:border-[#00f5c4]/40 group-hover:text-[#00f5c4] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400/90 font-semibold">
              Video en producción
            </span>
            <span className="text-[10px] text-slate-500 mt-0.5">
              Disponible próximamente
            </span>
          </div>
        ) : (
          // Vista con Carátula y Botón Play
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 group-hover:border-[#00f5c4] group-hover:scale-110 flex items-center justify-center text-[#00f5c4] shadow-lg transition-all duration-300">
                <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 3. Cuerpo de la Tarjeta */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-[#00f5c4] transition-colors">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed line-clamp-3">
            {video.shortDescription}
          </p>
        </div>

        {/* 4. Trigger Inferior */}
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => onOpenVideo(video)}
            className="inline-flex items-center gap-1.5 font-semibold text-[#00f5c4] hover:text-[#34d399] transition-colors cursor-pointer"
          >
            {video.isPlaceholder ? (
              <span className="text-slate-400">Ver ficha explicativa</span>
            ) : (
              <span>Ver video explicativo</span>
            )}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

