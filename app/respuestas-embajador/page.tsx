'use client';

import React, { useState, useMemo } from 'react';
import { CONTENT_CONFIG, VideoItem, CategoryOption } from './data/contentConfig';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { CategoryNavigation } from './components/CategoryNavigation';
import { VideoCard } from './components/VideoCard';
import { VideoModal } from './components/VideoModal';
import { ComparisonSection } from './components/ComparisonSection';
import { FaqSection } from './components/FaqSection';
import { FloatingWhatsAppBar } from './components/FloatingWhatsAppBar';
import { FooterSection } from './components/FooterSection';

export default function RespuestasEmbajadorPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryOption['id']>('todas');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Filtro reactivo de videos
  const filteredVideos = useMemo(() => {
    if (activeCategory === 'todas') {
      return CONTENT_CONFIG.videos;
    }
    return CONTENT_CONFIG.videos.filter((v) => v.category === activeCategory);
  }, [activeCategory]);

  // Contadores por categoría
  const videoCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todas: CONTENT_CONFIG.videos.length,
    };
    CONTENT_CONFIG.videos.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#05070c] text-white pb-28 sm:pb-32">
      {/* 1. Header de Navegación Glass */}
      <HeaderNav />

      {/* 2. Hero con Video Principal Destacado */}
      <HeroSection />

      {/* 3. Navegación por Categorías (Tabs Interactivas) */}
      <CategoryNavigation
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        videoCounts={videoCounts}
      />

      {/* 4. Grilla Modular de Tarjetas de Video */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onOpenVideo={setSelectedVideo}
            />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-16 text-center text-slate-400">
            No se encontraron respuestas en esta categoría.
          </div>
        )}
      </section>

      {/* 5. Sección Comparativa: GoHighLevel vs Plan Embajador */}
      <ComparisonSection />

      {/* 6. Sección de Preguntas Frecuentes / Objeciones */}
      <FaqSection />

      {/* 7. Footer Oficial */}
      <FooterSection />

      {/* 8. Barra Fija de WhatsApp (Flotante estilo La Fábrica) */}
      <FloatingWhatsAppBar />

      {/* 9. Modal de Video / Ficha Explicativa */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
