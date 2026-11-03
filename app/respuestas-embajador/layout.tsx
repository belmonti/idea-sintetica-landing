import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Centro de Respuestas | Plan Embajador — Idea Sintética',
  description:
    'Conoce a fondo el Plan Embajador de Idea Sintética: videos explicativos, beneficios incluidos, demostraciones del sistema y resolución de objeciones comerciales.',
  openGraph: {
    title: 'Centro de Respuestas | Plan Embajador — Idea Sintética',
    description:
      'Conoce a fondo el Plan Embajador de Idea Sintética: videos explicativos, beneficios incluidos, demostraciones del sistema y resolución de objeciones comerciales.',
    type: 'website',
    images: ['/assets/video/vsl-poster.webp'],
  },
};

export default function RespuestasEmbajadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05070c] text-white selection:bg-[#00f5c4] selection:text-[#05070c] relative">
      <div className="bg-ambient-glow" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
