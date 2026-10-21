import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import '../css/styles.css';
import '../css/animations.css';
import '../css/brand-visuals.css';
import '../css/commercial-platform.css';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ideasintetica.pro'),
  title: 'Idea Sintética | Sistema de Automatización y Gestión de Negocios',
  description:
    'Deja de pagar múltiples herramientas dispersas. Centraliza tu operación en un solo sistema. CRM, WhatsApp omnicanal, automatizaciones, calendarios y embudos con Idea Sintética.',
  keywords: [
    'Idea Sintética',
    'automatización de negocios',
    'CRM',
    'embudos de venta',
    'gestión comercial',
    'software empresarial',
    'herramientas que reemplaza',
    'integraciones WhatsApp',
  ],
  authors: [{ name: 'Idea Sintética' }],
  icons: {
    icon: '/assets/favicon.svg',
  },
  openGraph: {
    title: 'Idea Sintética | Tu negocio sintetizado en un solo sistema',
    description:
      'Muchas herramientas dispersas. Un solo núcleo inteligente. Centraliza tus ventas, clientes y automatizaciones en una plataforma unificada.',
    type: 'website',
    images: ['/assets/brand/idea-sintetica-hero.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"4Av5RXA8DKaLEnKRFTtRLW",debug:true});`,
          }}
        />
        <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
      </head>
      <body>
        <div className="bg-grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
