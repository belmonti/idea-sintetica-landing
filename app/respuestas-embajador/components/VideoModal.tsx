'use client';

import React, { useEffect } from 'react';
import { VideoItem, CONTENT_CONFIG } from '../data/contentConfig';

interface Props {
  video: VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<Props> = ({ video, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-[#0c111c] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#090d15]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f5c4]" />
            <span className="font-mono text-xs text-slate-300 font-bold uppercase">
              {video.fig} · {video.tag}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido Visual */}
        {video.isPlaceholder ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00f5c4] mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00f5c4] font-semibold mb-2">
              Contenido en grabación
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {video.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed">
              {video.shortDescription}
            </p>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] max-w-md w-full mb-6 text-xs text-slate-400 text-left">
              <span className="font-semibold text-white block mb-1">Nota informativa:</span>
              Estamos finalizando la grabación de esta cápsula demostrativa. Si requieres ver este módulo en vivo antes de la publicación, te mostramos la pantalla por WhatsApp.
            </div>
            <a
              href={CONTENT_CONFIG.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-gradient inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold"
            >
              <span>Consultar este tema por WhatsApp</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-8.6 15L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1112 20.2z" />
              </svg>
            </a>
          </div>
        ) : (
          <div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 sm:p-6 bg-[#090d15]">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {video.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {video.shortDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

