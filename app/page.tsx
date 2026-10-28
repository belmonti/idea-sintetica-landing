'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CONFIG, getWhatsAppUrl } from './config';

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStudioFilter, setActiveStudioFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const defaultWhatsApp = getWhatsAppUrl('default');
  const purchaseWhatsApp = getWhatsAppUrl('purchase');

  // Control de scroll y navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spotlight effect en tarjetas interactivas
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      '.bento-card, .spotlight-card, .replacement-card'
    );
    if (!cards.length) return;

    const cleanupFns: Array<() => void> = [];

    cards.forEach((card) => {
      let rafId: number | null = null;

      const onMouseMove = (e: MouseEvent) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      };

      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      cleanupFns.push(() => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  // Animaciones suaves con IntersectionObserver
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Modal de video: tecla Escape y bloqueo de scroll
  useEffect(() => {
    if (videoModalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setVideoModalOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [videoModalOpen]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const openVideo = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const heroVid = document.getElementById('heroVideo');
    if (heroVid) {
      heroVid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      setVideoModalOpen(true);
    }
  };
  const closeVideo = () => setVideoModalOpen(false);

  return (
    <>
      {/* ====================================================================
           HEADER / NAVEGACIÓN REFINADA
           ==================================================================== */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="mainNavbar">
        <div className="container nav-container">
          {/* Logotipo de Marca */}
          <a href="#hero" className="brand-logo-link" aria-label="Ir al inicio de Idea Sintética">
            <div className="brand-icon-wrapper">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="20" stroke="#00f5c4" strokeWidth="1.6" strokeOpacity="0.6" />
                <path
                  d="M16 18C16 13.58 19.58 10 24 10C28.42 10 32 13.58 32 18C32 20.94 30.4 23.51 28.03 24.88C27.39 25.26 27 25.96 27 26.71V29H21V26.71C21 25.96 20.6 25.26 19.96 24.88C17.59 23.51 16 20.94 16 18Z"
                  stroke="#00f5c4"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M21 32H27" stroke="#00f5c4" strokeWidth="2" strokeLinecap="round" />
                <path d="M22.5 35H25.5" stroke="#b4ff39" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="18" r="2.5" fill="#00f5c4" />
              </svg>
            </div>
            <span className="brand-text">
              Idea<span>Sintética</span>
            </span>
          </a>

          {/* Navegación Limpia y Equilibrada */}
          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="navMenu">
              <li>
                <a href="#reemplaza" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  ¿Qué reemplaza?
                </a>
              </li>
              <li>
                <a href="#experiencia" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Experiencia
                </a>
              </li>
              <li>
                <a href="#integraciones" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Integraciones
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Funcionalidades
                </a>
              </li>
              <li>
                <a href="#casos-de-uso" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Casos de Uso
                </a>
              </li>
            </ul>
          </nav>

          {/* Botón Standout VER DEMO + WhatsApp */}
          <div className="nav-actions">
            <button
              type="button"
              className="btn btn-demo-nav btn-sm open-video-btn"
              id="navDemoBtn"
              onClick={openVideo}
            >
              <span className="pulse-dot-green"></span>
              VER DEMO
            </button>
            <a
              href={defaultWhatsApp}
              className="btn btn-whatsapp btn-sm"
              target="_blank"
              rel="noopener noreferrer"
              id="navWhatsAppBtn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Menú Móvil */}
          <button
            className="menu-toggle"
            id="menuToggle"
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* ====================================================================
           1. HERO SECTION — POSICIONAMIENTO PLATAFORMA INTEGRAL
           ==================================================================== */}
      <section className="hero" id="hero">
        <div className="hero-glow-core" aria-hidden="true"></div>
        <div className="container">
          {/* Contenido Editorial Principal con Emblema de Marca */}
          <div className="hero-content reveal-on-scroll">
            {/* Emblema de la Ampolleta Sintética */}
            <div className="hero-brand-emblem-wrapper">
              <div
                className="hero-brand-emblem open-video-btn"
                title="Idea Sintética — La chispa que activa tu sistema"
                onClick={openVideo}
                style={{ cursor: 'pointer' }}
              >
                <div className="emblem-pulse-ring"></div>
                <img
                  src="/assets/brand/idea-sintetica-hero.jpg"
                  alt="Idea Sintética Símbolo Core"
                  width="78"
                  height="78"
                />
              </div>
            </div>

            <div className="hero-meta-badge mono">
              <span className="tag-highlight">[PLATAFORMA INTEGRAL // V2.4]</span>
              <span>REEMPLAZA MÚLTIPLES HERRAMIENTAS EN UN SOLO SISTEMA</span>
            </div>

            <h1 className="hero-title">
              Deja de pagar y administrar herramientas dispersas. <br />
              <span className="text-gradient">Centraliza tu negocio en un solo sistema.</span>
            </h1>

            <p className="hero-subtitle">
              Idea Sintética consolida tu CRM, WhatsApp omnicanal, calendarios, automatizaciones, embudos, facturación
              y reputación en una sola plataforma inteligente. Menos costos mensuales, cero integraciones rotas y
              claridad operativa total.
            </p>

            {/* Cluster de Acciones de Conversión */}
            <div className="hero-actions-cluster">
              <a
                href={defaultWhatsApp}
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                id="heroWhatsAppBtn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Hablar por WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-lg open-video-btn"
                id="heroDemoBtn"
                onClick={openVideo}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Ver demostración en video (4 min)
              </button>
            </div>

            {/* Telemetría en Vivo de WhatsApp & Pagar */}
            <div className="whatsapp-telemetry mono">
              <div className="telemetry-item">
                <span className="telemetry-dot"></span>
                <span>Atención directa • Respuesta en minutos</span>
              </div>
              <span>•</span>
              <a
                href={purchaseWhatsApp}
                className="telemetry-item"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-lime)', fontWeight: 600 }}
              >
                Pagar o contratar por WhatsApp →
              </a>
            </div>
          </div>

          {/* ====================================================================
               CENTRO DE COMANDO HERO (HUMAN FOUNDER + TELEMETRÍA HUD EN VIVO)
               ==================================================================== */}
          <div className="hero-human-stage reveal-on-scroll">
            {/* Badge Flotante Superior Izquierdo: Valor del Pipeline */}
            <div className="hero-badge-overlay hero-badge-top-left">
              <div className="badge-icon-box badge-icon-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
              </div>
              <div className="badge-text-group">
                <div className="badge-title mono">$128,450 USD</div>
                <div className="badge-sub mono" style={{ color: 'var(--accent-teal)' }}>
                  Pipeline Activo • +34.8% este mes
                </div>
              </div>
            </div>

            {/* Badge Flotante Superior Derecho: Plataforma Centralizada */}
            <div className="hero-badge-overlay hero-badge-top-right">
              <div className="badge-icon-box badge-icon-lime">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="badge-text-group">
                <div className="badge-title">Todo en 1 Plataforma</div>
                <div className="badge-sub">Sin dependencias externas</div>
              </div>
            </div>

            {/* Badge Flotante Inferior Izquierdo: Lead Entrante WhatsApp */}
            <div className="hero-badge-overlay hero-badge-bottom-left">
              <div className="badge-icon-box badge-icon-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <div className="badge-text-group">
                <div className="badge-title">[WHATSAPP_CRM] Lead Calificado</div>
                <div className="badge-sub mono" style={{ color: '#22c55e' }}>
                  Oportunidad calificada automáticamente ✓
                </div>
              </div>
            </div>

            {/* Badge Flotante Inferior Derecho: Recorrido Guiado */}
            <div
              className="hero-badge-overlay hero-badge-bottom-right"
              title="Demostración oficial en video"
            >
              <div className="badge-icon-box badge-icon-teal" style={{ background: 'rgba(0, 245, 196, 0.25)' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                </svg>
              </div>
              <div className="badge-text-group">
                <div className="badge-title">Video de Recorrido</div>
                <div className="badge-sub mono">Demostración oficial • 4 min</div>
              </div>
            </div>

            {/* Ventana Principal con Reproductor de Video Nativo */}
            <div
              className="hero-human-viewport"
              id="heroVideo"
            >
              <div className="app-chrome-bar">
                <div className="chrome-controls">
                  <span className="chrome-dot dot-1"></span>
                  <span className="chrome-dot dot-2"></span>
                  <span className="chrome-dot dot-3"></span>
                </div>
                <div className="chrome-status-tag mono">
                  <span className="pulse-dot-green"></span>
                  SISTEMA CENTRAL OPERATIVO // DEMO EN VIVO
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-teal)' }}>
                  V2.4 ONLINE
                </div>
              </div>

              <div className="hero-video-viewport">
                <iframe
                  id="heroNativeVideoFrame"
                  src="https://www.youtube-nocookie.com/embed/nuHaSttuWKk"
                  title="Idea Sintética // Demostración en Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           2. STORYTELLING VISUAL: "TU NEGOCIO NO NECESITA MÁS SOFTWARE"
           ==================================================================== */}
      <section className="story-synthesis-section">
        <div className="container">
          <div className="section-editorial-header reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="section-tag section-tag-lime">LA TRANSFORMACIÓN OPERATIVA</span>
            <h2 className="section-title">
              Tu negocio no necesita más software. <br />
              <span className="text-gradient">Necesita que todo funcione junto.</span>
            </h2>
            <p className="section-lead" style={{ margin: '0 auto' }}>
              El coste oculto de las herramientas aisladas no es solo el dinero mensual: es el tiempo perdido conectando
              plataformas que fallan.
            </p>
          </div>

          <div className="story-conduit-wrapper reveal-on-scroll">
            {/* Antes: 10 herramientas separadas */}
            <div className="story-col-before">
              <span className="story-header-pill pill-before mono">EL MODELO DISPERSO</span>
              <div className="story-metric-cost mono" style={{ color: '#ef4444' }}>
                $650 - $1,100+ USD
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                Gastados cada mes en suscripciones duplicadas
              </div>
              <ul className="story-items-list before">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>10 accesos, contraseñas y facturas distintas</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Zapier rompiéndose y perdiendo prospectos</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Datos dispersos entre Excel, WhatsApp y CRM</span>
                </li>
              </ul>
            </div>

            {/* Centro: Núcleo de Síntesis */}
            <div className="story-center-core">
              <div className="core-bulb-orb">
                <img src="/assets/brand/idea-sintetica-hero.jpg" alt="Núcleo Idea Sintética" />
              </div>
              <div className="core-arrow-label mono">SÍNTESIS</div>
            </div>

            {/* Después: 1 sistema coordinado */}
            <div className="story-col-after">
              <span className="story-header-pill pill-after mono">CON IDEA SINTÉTICA</span>
              <div className="story-metric-cost mono" style={{ color: 'var(--accent-teal)' }}>
                1 Solo Sistema
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                Toda tu operación sincronizada de forma nativa
              </div>
              <ul className="story-items-list after">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Un solo inicio de sesión para todo tu equipo</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Cero integraciones rotas ni pérdida de leads</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Respuestas automáticas en menos de 60 segundos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           CONECTOR ENERGÉTICO ENTRE SECCIONES (PHOTON BEAM DIVIDER)
           ==================================================================== */}
      <div className="photon-track-container" aria-hidden="true">
        <div className="photon-beam"></div>
      </div>

      {/* ====================================================================
           3. SECCIÓN ESTRATÉGICA: HERRAMIENTAS QUE REEMPLAZA
           ==================================================================== */}
      <section className="tools-replaced-section" id="reemplaza">
        <div className="container container-wide">
          <div className="section-editorial-header reveal-on-scroll">
            <span className="section-tag section-tag-lime">CONSOLIDACIÓN DE SOFTWARE</span>
            <h2 className="section-title">
              Muchas herramientas dispersas. <br />
              <span className="text-gradient-lime">Un solo núcleo inteligente.</span>
            </h2>
            <p className="section-lead">
              Descubre las herramientas especializadas que las capacidades nativas de Idea Sintética pueden sustituir o
              consolidar en tu empresa.
            </p>
          </div>

          {/* Marquee Infinito de Logos Reemplazados */}
          <div className="tools-marquee-container reveal-on-scroll">
            <div className="tools-marquee-track">
              {/* Loop original */}
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/calendly.svg" alt="Calendly" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Calendly</span>
                <span className="tool-chip-cost">$20/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/zapier.svg" alt="Zapier" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Zapier</span>
                <span className="tool-chip-cost">$75/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/hubspot.svg" alt="HubSpot" width="24" height="24" />
                </div>
                <span className="tool-chip-name">HubSpot</span>
                <span className="tool-chip-cost">$120/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/activecampaign.svg" alt="ActiveCampaign" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ActiveCampaign</span>
                <span className="tool-chip-cost">$90/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/clickfunnels.png" alt="ClickFunnels" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ClickFunnels</span>
                <span className="tool-chip-cost">$147/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/typeform.svg" alt="Typeform" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Typeform</span>
                <span className="tool-chip-cost">$50/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/manychat.svg" alt="ManyChat" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ManyChat</span>
                <span className="tool-chip-cost">$45/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/hootsuite.svg" alt="Hootsuite" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Hootsuite / Buffer</span>
                <span className="tool-chip-cost">$99/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/kajabi.svg" alt="Kajabi" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Kajabi / Skool</span>
                <span className="tool-chip-cost">$149/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/birdeye.png" alt="BirdEye" width="24" height="24" />
                </div>
                <span className="tool-chip-name">BirdEye / Podium</span>
                <span className="tool-chip-cost">$199/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/salesforce.svg" alt="Salesforce" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Salesforce</span>
                <span className="tool-chip-cost">$150/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/mailchimp.svg" alt="Mailchimp" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Mailchimp</span>
                <span className="tool-chip-cost">$65/mo</span>
              </div>

              {/* Duplicado exacto para loop continuo y fluido */}
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/calendly.svg" alt="Calendly" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Calendly</span>
                <span className="tool-chip-cost">$20/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/zapier.svg" alt="Zapier" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Zapier</span>
                <span className="tool-chip-cost">$75/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/hubspot.svg" alt="HubSpot" width="24" height="24" />
                </div>
                <span className="tool-chip-name">HubSpot</span>
                <span className="tool-chip-cost">$120/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/activecampaign.svg" alt="ActiveCampaign" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ActiveCampaign</span>
                <span className="tool-chip-cost">$90/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/clickfunnels.png" alt="ClickFunnels" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ClickFunnels</span>
                <span className="tool-chip-cost">$147/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/typeform.svg" alt="Typeform" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Typeform</span>
                <span className="tool-chip-cost">$50/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/manychat.svg" alt="ManyChat" width="24" height="24" />
                </div>
                <span className="tool-chip-name">ManyChat</span>
                <span className="tool-chip-cost">$45/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/hootsuite.svg" alt="Hootsuite" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Hootsuite / Buffer</span>
                <span className="tool-chip-cost">$99/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/kajabi.svg" alt="Kajabi" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Kajabi / Skool</span>
                <span className="tool-chip-cost">$149/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/birdeye.png" alt="BirdEye" width="24" height="24" />
                </div>
                <span className="tool-chip-name">BirdEye / Podium</span>
                <span className="tool-chip-cost">$199/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/salesforce.svg" alt="Salesforce" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Salesforce</span>
                <span className="tool-chip-cost">$150/mo</span>
              </div>
              <div className="tool-chip-badge">
                <div className="logo-container-pill">
                  <img src="/assets/tools/mailchimp.svg" alt="Mailchimp" width="24" height="24" />
                </div>
                <span className="tool-chip-name">Mailchimp</span>
                <span className="tool-chip-cost">$65/mo</span>
              </div>
            </div>
          </div>

          {/* Cuadrícula de Comparación por Categorías */}
          <div className="replacement-cards-grid">
            {/* 1. Agendamiento */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// AGENDAMIENTO</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>Calendly</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Calendarios Ilimitados
              </div>
              <p className="rep-desc">
                Reservas directas sincronizadas con Google Calendar y recordatorios automáticos por WhatsApp para
                reducir ausencias a cero.
              </p>
            </div>

            {/* 2. CRM & Ventas */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// CRM Y VENTAS</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>HubSpot / Pipedrive</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Pipelines Visuales 360°
              </div>
              <p className="rep-desc">
                Base de datos ilimitada de prospectos con historial completo de compras, notas y valor comercial en
                columnas Kanban.
              </p>
            </div>

            {/* 3. Automatización */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// AUTOMATIZACIÓN</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>Zapier / Make</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Workflows Nativos 24/7
              </div>
              <p className="rep-desc">
                Flujos de causa y efecto ejecutándose dentro de la misma plataforma, eliminando el coste de tareas de
                Zapier y fallos de conexión.
              </p>
            </div>

            {/* 4. Email & WhatsApp */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// MARKETING Y MENSAJES</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>ActiveCampaign</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Email & WhatsApp Marketing
              </div>
              <p className="rep-desc">
                Secuencias de reactivación, boletines informativos y campañas masivas segmentadas con métricas de
                apertura y clics reales.
              </p>
            </div>

            {/* 5. Embudos y Web */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// CONVERSIÓN WEB</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>ClickFunnels</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Constructor de Funnels
              </div>
              <p className="rep-desc">
                Landing pages ultra veloces, páginas de captura, formularios integrados y páginas de pago sin límites de
                tráfico.
              </p>
            </div>

            {/* 6. Chat y Mensajería */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// MENSAJERÍA</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>ManyChat / Zendesk</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Inbox Omnicanal Unificado
              </div>
              <p className="rep-desc">
                Responde WhatsApp, Instagram DMs, Facebook y chat web desde una sola ventana compartida para todo tu
                equipo comercial.
              </p>
            </div>

            {/* 7. Formularios */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// CAPTURA DE DATOS</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>Typeform / Jotform</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Formularios y Encuestas
              </div>
              <p className="rep-desc">
                Preguntas interactivas condicionales que clasifican al prospecto y lo asignan directamente al pipeline
                correspondiente.
              </p>
            </div>

            {/* 8. Reputación en Google */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// REPUTACIÓN</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>BirdEye / Podium</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Gestión de Reseñas Google
              </div>
              <p className="rep-desc">
                Solicitudes automáticas enviadas por WhatsApp tras cada compra o servicio para multiplicar tus
                opiniones de 5 estrellas.
              </p>
            </div>

            {/* 9. Redes Sociales */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// SOCIAL MEDIA</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>Hootsuite / Buffer</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Planificador de Contenido
              </div>
              <p className="rep-desc">
                Programa tus publicaciones en Instagram, Facebook, LinkedIn y TikTok desde un solo calendario visual
                centralizado.
              </p>
            </div>

            {/* 10. Cursos y Comunidades */}
            <div className="replacement-card reveal-on-scroll">
              <div className="rep-card-top">
                <span className="rep-category mono">// FORMACIÓN</span>
                <div className="rep-replaced-tools">
                  Sustituye: <strong>Kajabi / Skool</strong>
                </div>
              </div>
              <div className="rep-system-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Cursos y Comunidades
              </div>
              <p className="rep-desc">
                Alojamiento de video seguro, áreas de membresía privadas y foros de comunidad para tus clientes o
                alumnos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           3.5. EXPERIENCIA HUMANA: DISEÑADO PARA EQUIPOS QUE ESCALAN
           ==================================================================== */}
      <section className="human-experience-section" id="experiencia">
        <div className="container container-wide">
          <div className="section-editorial-header reveal-on-scroll" style={{ textAlign: 'center' }}>
            <span className="section-tag section-tag-lime">PERSONAS + SOFTWARE</span>
            <h2 className="section-title">
              Tecnología de vanguardia con <br />
              <span className="text-gradient">experiencia humana en el centro.</span>
            </h2>
            <p className="section-lead" style={{ margin: '0 auto' }}>
              Idea Sintética no es una caja negra de algoritmos. Es el sistema que le devuelve el control, la
              tranquilidad y el tiempo a las personas que mueven tu negocio.
            </p>
          </div>

          <div className="human-experience-grid">
            {/* Tarjeta 1: Colaboración de Equipo */}
            <div className="human-experience-card reveal-on-scroll">
              <div className="human-card-image-wrap">
                <span className="human-card-overlay-tag mono">// EQUIPO &amp; CRECIMIENTO</span>
                <img
                  src="/assets/people/team-collaboration.jpg"
                  alt="Colaboración y Crecimiento de Equipo en Idea Sintética"
                  loading="lazy"
                />
              </div>
              <div className="human-card-body">
                <h3 className="human-card-title">Colaboración Fluida para Todo tu Equipo</h3>
                <p className="human-card-desc">
                  Di adiós al desorden de cuentas compartidas y contraseñas en hojas de cálculo. Asigna roles, mide la
                  velocidad de cierre de tus ejecutivos y unifica cada interacción de clientes en una sola vista
                  compartida.
                </p>
                <ul className="human-card-points">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Accesos sin límites:</strong> Sin cobros adicionales por cada miembro comercial que sumes
                      a tu equipo.
                    </span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Asignación inteligente:</strong> Distribuye prospectos de WhatsApp y llamadas en rotación
                      o por especialidad.
                    </span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Historial transparente:</strong> Notas, grabaciones y mensajes audibles en una línea de
                      tiempo única por cliente.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Tarjeta 2: Control Móvil en Tiempo Real */}
            <div className="human-experience-card reveal-on-scroll">
              <div className="human-card-image-wrap">
                <span
                  className="human-card-overlay-tag mono"
                  style={{ color: 'var(--accent-lime)', borderColor: 'rgba(180,255,57,0.35)' }}
                >
                  // CONTROL TOTAL 24/7
                </span>
                <img
                  src="/assets/people/mobile-business-control.jpg"
                  alt="Control Móvil de Negocios en Tiempo Real"
                  loading="lazy"
                />
              </div>
              <div className="human-card-body">
                <h3 className="human-card-title">Tu Negocio en la Palma de tu Mano</h3>
                <p className="human-card-desc">
                  Supervisa la salud de tu empresa mientras te desplazas, viajas o compartes un café. Recibe
                  notificaciones instantáneas de compras, responde prospectos de WhatsApp en segundos y consulta
                  métricas vitales desde tu teléfono.
                </p>
                <ul className="human-card-points">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Alertas Push en Vivo:</strong> Entérate en el instante exacto en que entra un pago o un
                      lead VIP.
                    </span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Bandeja Móvil Unificada:</strong> Chatea por WhatsApp, Instagram y SMS sin saltar entre
                      aplicaciones.
                    </span>
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>
                      <strong>Calendario al día:</strong> Revisa tu agenda comercial y reprograma citas con un toque.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           4. SECCIÓN: INTEGRADO CON TUS HERRAMIENTAS FAVORITAS (NEXUS CENTRAL)
           ==================================================================== */}
      <section className="integrations-hub-section" id="integraciones">
        <div className="container container-wide">
          <div className="section-editorial-header reveal-on-scroll" style={{ textAlign: 'center', marginBottom: 24 }}>
            <span className="section-tag section-tag-lime">CONEXIÓN NATIVA // SINCRONIZACIÓN TOTAL</span>
            <h2 className="section-title">
              Integrado con tus herramientas favoritas. <br />
              <span className="text-gradient">El núcleo central que conecta tu ecosistema.</span>
            </h2>
            <p className="section-lead" style={{ margin: '0 auto', maxWidth: 680 }}>
              No tienes que abandonar los canales esenciales donde ya viven tus clientes o tu facturación. Idea Sintética
              se conecta de forma directa y bidireccional con las plataformas líderes del mercado.
            </p>
          </div>

          <div className="nexus-ecosystem-wrapper reveal-on-scroll">
            {/* Núcleo Central de Idea Sintética con Anillos Orbitales */}
            <div className="nexus-center-core">
              <div className="nexus-rings-pulse" aria-hidden="true"></div>
              <div className="nexus-bulb-orb" title="Idea Sintética — Núcleo de Integración Central">
                <img src="/assets/brand/idea-sintetica-hero.jpg" alt="Idea Sintética Núcleo Central" />
              </div>
              <div className="nexus-label mono">[NÚCLEO_OPERATIVO_CENTRAL]</div>
            </div>

            {/* Cuadrícula Expandida de 14 Herramientas Favoritas */}
            <div className="nexus-grid-expanded">
              {/* 1. WhatsApp Business */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/whatsapp.svg" alt="WhatsApp Business" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>WhatsApp Business</h5>
                  <p>Mensajería directa oficial y flujos automáticos</p>
                  <span className="tag-live mono">● API Oficial Conectada</span>
                </div>
              </div>

              {/* 2. Stripe */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/stripe.svg" alt="Stripe" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Stripe Pagos</h5>
                  <p>Cobros con un clic, checkout y suscripciones</p>
                  <span className="tag-live mono">● Certificado SSL</span>
                </div>
              </div>

              {/* 3. Google Workspace */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/google.svg" alt="Google" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Google Workspace</h5>
                  <p>Calendar, Gmail, Google Ads y Reviews Maps</p>
                  <span className="tag-live mono">● Sincronización Bidireccional</span>
                </div>
              </div>

              {/* 4. Meta (Facebook & Instagram) */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/meta.svg" alt="Meta" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Meta (IG &amp; FB)</h5>
                  <p>DMs unificados y captura Lead Ads en 0s</p>
                  <span className="tag-live mono">● Webhooks Nativos</span>
                </div>
              </div>

              {/* 5. Shopify */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/shopify.svg" alt="Shopify" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Shopify</h5>
                  <p>Sincronización de pedidos y carritos recuperados</p>
                  <span className="tag-live mono">● E-commerce Sync</span>
                </div>
              </div>

              {/* 6. Slack */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/slack.svg" alt="Slack" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Slack</h5>
                  <p>Alertas instantáneas para equipos comerciales</p>
                  <span className="tag-live mono">● Bot de Notificación</span>
                </div>
              </div>

              {/* 7. TikTok */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/tiktok.svg" alt="TikTok" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>TikTok Ads</h5>
                  <p>Captura directa de prospectos desde videos</p>
                  <span className="tag-live mono">● Instant Sync</span>
                </div>
              </div>

              {/* 8. LinkedIn */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/linkedin.svg" alt="LinkedIn" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>LinkedIn Ads</h5>
                  <p>Formularios B2B Lead Gen directo a tu CRM</p>
                  <span className="tag-live mono">● Conexión Corporativa</span>
                </div>
              </div>

              {/* 9. Zoom */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/zoom.svg" alt="Zoom" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Zoom Meetings</h5>
                  <p>Generación automática de enlaces en cada reserva</p>
                  <span className="tag-live mono">● Auto Link Gen</span>
                </div>
              </div>

              {/* 10. QuickBooks */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/quickbooks.svg" alt="QuickBooks" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>QuickBooks</h5>
                  <p>Facturación y conciliación contable automática</p>
                  <span className="tag-live mono">● Finanzas Conectadas</span>
                </div>
              </div>

              {/* 11. Twilio */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/twilio.svg" alt="Twilio" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Twilio Global</h5>
                  <p>Líneas telefónicas virtuales y SMS a nivel mundial</p>
                  <span className="tag-live mono">● Carrier Grade</span>
                </div>
              </div>

              {/* 12. Mailgun */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/mailgun.svg" alt="Mailgun" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>Mailgun SMTP</h5>
                  <p>Entregabilidad garantizada para correos de alta escala</p>
                  <span className="tag-live mono">● 99.8% Inbox Rate</span>
                </div>
              </div>

              {/* 13. WordPress */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/wordpress.svg" alt="WordPress" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>WordPress</h5>
                  <p>Inserción de formularios y widgets en sitios existentes</p>
                  <span className="tag-live mono">● Plugin Nativo</span>
                </div>
              </div>

              {/* 14. PayPal */}
              <div className="nexus-tool-item">
                <div className="logo-container-pill">
                  <img src="/assets/integrations/paypal.svg" alt="PayPal" width="28" height="28" />
                </div>
                <div className="nexus-tool-meta">
                  <h5>PayPal Internacional</h5>
                  <p>Recepción de pagos y suscripciones en múltiples monedas</p>
                  <span className="tag-live mono">● Pasarela Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           5. ESTUDIO VISUAL DE LAS 12 FUNCIONALIDADES COMPLETAS
           ==================================================================== */}
      <section className="features-studio-section" id="funcionalidades">
        <div className="container container-wide">
          <div className="section-editorial-header reveal-on-scroll">
            <span className="section-tag section-tag-lime">ECOSISTEMA OPERATIVO COMPLETO</span>
            <h2 className="section-title">
              Todo lo que Idea Sintética incluye. <br />
              <span className="text-gradient">Diseñado para operar, vender y escalar.</span>
            </h2>
            <p className="section-lead">
              Una suite integral de 12 capacidades construidas para funcionar sincronizadas desde el primer día.
            </p>
          </div>

          {/* Barra de Filtros por Categoría */}
          <div className="studio-filter-bar mono reveal-on-scroll">
            <button
              className={`filter-pill-btn ${activeStudioFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveStudioFilter('all')}
            >
              Todas (12)
            </button>
            <button
              className={`filter-pill-btn ${activeStudioFilter === 'ventas' ? 'active' : ''}`}
              onClick={() => setActiveStudioFilter('ventas')}
            >
              Ventas &amp; CRM
            </button>
            <button
              className={`filter-pill-btn ${activeStudioFilter === 'comunicacion' ? 'active' : ''}`}
              onClick={() => setActiveStudioFilter('comunicacion')}
            >
              Comunicación &amp; Mensajes
            </button>
            <button
              className={`filter-pill-btn ${activeStudioFilter === 'captacion' ? 'active' : ''}`}
              onClick={() => setActiveStudioFilter('captacion')}
            >
              Captación &amp; Web
            </button>
            <button
              className={`filter-pill-btn ${activeStudioFilter === 'operacion' ? 'active' : ''}`}
              onClick={() => setActiveStudioFilter('operacion')}
            >
              Operación &amp; Cursos
            </button>
          </div>

          {/* Cuadrícula de 12 Funcionalidades con Mini-Mockups de Producto */}
          <div className="studio-features-grid">
            {/* 1. CRM 360° */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="ventas"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'ventas'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// VENTAS &amp; CRM</span>
                <h3 className="card-feature-title">CRM y Contactos 360°</h3>
                <p className="card-feature-desc">
                  Ficha unificada con historial de WhatsApp, compras, citas agendadas y campos personalizados.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>
                    <span className="mockup-status-dot"></span>LEAD CALIFICADO
                  </span>
                  <span>$3,800 USD</span>
                </div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem', marginBottom: 4 }}>
                  Prospecto B2B • Sector Consultoría
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-teal)' }}>
                  Etiqueta: Interesado en Demo • WhatsApp
                </div>
              </div>
            </div>

            {/* 2. Embudos y Pipelines */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="ventas"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'ventas'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// VENTAS &amp; CRM</span>
                <h3 className="card-feature-title">Pipelines Comerciales</h3>
                <p className="card-feature-desc">
                  Visualiza y arrastra oportunidades en columnas Kanban con valores monetarios en tiempo real.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>PIPELINE PRINCIPAL</span>
                  <span style={{ color: 'var(--accent-lime)' }}>$42,850 EN JUEGO</span>
                </div>
                <div className="funnel-visual-step">
                  <span>Propuesta Enviada (4)</span>
                  <strong className="mono" style={{ color: '#fff' }}>
                    $12,400
                  </strong>
                </div>
                <div
                  className="funnel-visual-step"
                  style={{ background: 'rgba(0, 245, 196, 0.08)', borderLeft: '2px solid var(--accent-teal)' }}
                >
                  <span>Cerrado Ganado (8)</span>
                  <strong className="mono" style={{ color: 'var(--accent-lime)' }}>
                    $30,450 ✓
                  </strong>
                </div>
              </div>
            </div>

            {/* 3. Pagos y Facturación */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="ventas"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'ventas'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// VENTAS &amp; CRM</span>
                <h3 className="card-feature-title">Pagos y Facturación</h3>
                <p className="card-feature-desc">
                  Cobra con tarjeta mediante Stripe, genera enlaces de pago directos y emite facturas al instante.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>LINK DE PAGO STRIPE</span>
                  <span style={{ color: '#10b981' }}>PAGADO ✓</span>
                </div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>
                  Cobro: Servicio de Consultoría Pro
                </div>
                <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--accent-lime)', marginTop: 4 }}>
                  Total recibido: $1,250.00 USD
                </div>
              </div>
            </div>

            {/* 4. Inbox Omnicanal */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="comunicacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'comunicacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// COMUNICACIÓN</span>
                <h3 className="card-feature-title">Inbox Omnicanal Unificado</h3>
                <p className="card-feature-desc">
                  WhatsApp, Instagram Direct, Messenger y chat web en una sola bandeja de entrada compartida.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>WHATSAPP EMPRESARIAL</span>
                  <span style={{ color: '#34d399' }}>● ACTIVO</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#e2e8f0', marginBottom: 6 }}>
                  “Hola, me interesa agendar una demostración”
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-teal)' }}>
                  Respuesta automática enviada con link de reserva ✓
                </div>
              </div>
            </div>

            {/* 5. Email & Mensajería */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="comunicacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'comunicacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// COMUNICACIÓN</span>
                <h3 className="card-feature-title">Email &amp; WhatsApp Marketing</h3>
                <p className="card-feature-desc">
                  Crea secuencias de reactivación y campañas masivas con alta entregabilidad y métricas de apertura.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>CAMPAÑA: BOLETÍN MENSUAL</span>
                  <span>2,400 ENVIADOS</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: 6 }}>
                  <span>Tasa de apertura:</span>
                  <strong className="mono" style={{ color: 'var(--accent-teal)' }}>
                    58.4%
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span>Clicks generados:</span>
                  <strong className="mono" style={{ color: 'var(--accent-lime)' }}>
                    24.1%
                  </strong>
                </div>
              </div>
            </div>

            {/* 6. Redes Sociales */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="comunicacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'comunicacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// COMUNICACIÓN</span>
                <h3 className="card-feature-title">Planificador de Redes</h3>
                <p className="card-feature-desc">
                  Programa publicaciones en Instagram, Facebook, TikTok y LinkedIn desde un calendario visual.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>CALENDARIO DE CONTENIDO</span>
                  <span>4 REDES</span>
                </div>
                <div className="social-cal-item">
                  <span>Hoy 18:00 • Post IG + Reel</span>
                  <span className="mono" style={{ color: 'var(--accent-teal)' }}>
                    Programado ✓
                  </span>
                </div>
              </div>
            </div>

            {/* 7. Funnels y Sitios Web */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="captacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'captacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// CAPTACIÓN &amp; WEB</span>
                <h3 className="card-feature-title">Funnels y Landing Pages</h3>
                <p className="card-feature-desc">
                  Embudos de alta conversión con carga instantánea y optimización total para móviles sin límites.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>EMBUDO COMERCIAL V3</span>
                  <span style={{ color: 'var(--accent-lime)' }}>CONV: 18.2%</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fff' }}>
                  Paso 1: Landing → Paso 2: Agenda → Paso 3: Gracias
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  Tráfico ilimitado • SSL automático
                </div>
              </div>
            </div>

            {/* 8. Formularios Inteligentes */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="captacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'captacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// CAPTACIÓN &amp; WEB</span>
                <h3 className="card-feature-title">Formularios y Encuestas</h3>
                <p className="card-feature-desc">
                  Captura información clave con lógica condicional que clasifica y filtra prospectos de forma automática.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>FORMULARIO DE DIAGNÓSTICO</span>
                  <span>5 PREGUNTAS</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#fff', marginBottom: 4 }}>
                  ¿Cuál es tu facturación mensual aproximada?
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-teal)' }}>
                  &gt; $10k/mes → Asignar a Ejecutivo Senior
                </div>
              </div>
            </div>

            {/* 9. Gestión de Reputación */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="captacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'captacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// CAPTACIÓN &amp; WEB</span>
                <h3 className="card-feature-title">Gestión de Reseñas Google</h3>
                <p className="card-feature-desc">
                  Solicita opiniones de clientes de manera automatizada por WhatsApp tras cada compra o servicio
                  completado.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>GOOGLE BUSINESS PROFILE</span>
                  <span style={{ color: 'var(--accent-teal)' }}>FLUJO AUTOMÁTICO</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: 6 }}>
                  Envío programado: Solicitud de opinión post-servicio
                </div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-lime)' }}>
                  Canal: WhatsApp + Enlace directo a Google Maps ✓
                </div>
              </div>
            </div>

            {/* 10. Calendarios y Citas */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="operacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'operacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// OPERACIÓN &amp; CURSOS</span>
                <h3 className="card-feature-title">Calendarios y Citas</h3>
                <p className="card-feature-desc">
                  Reservas en línea con sincronización en Google Calendar y recordatorios automáticos por WhatsApp.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>DISPONIBILIDAD SEMANAL</span>
                  <span>12 CITAS</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fff' }}>Hoy • 15:30 hrs — Reunión Estratégica</div>
                <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--accent-lime)', marginTop: 4 }}>
                  Asistencia confirmada por WhatsApp ✓
                </div>
              </div>
            </div>

            {/* 11. Automatizaciones Nativas */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="operacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'operacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// OPERACIÓN &amp; CURSOS</span>
                <h3 className="card-feature-title">Workflows y Automatizaciones</h3>
                <p className="card-feature-desc">
                  Flujos lógicos autónomos que operan sin intervención humana las 24 horas del día.
                </p>
              </div>
              <div className="mini-ui-mockup-frame mono" style={{ fontSize: '0.76rem' }}>
                <div style={{ color: 'var(--text-muted)' }}>DISPARADOR: Lead registrado en web</div>
                <div style={{ color: 'var(--accent-teal)', margin: '2px 0' }}>
                  → Enviar WhatsApp de bienvenida (0s)
                </div>
                <div style={{ color: 'var(--accent-lime)' }}>→ Notificar a equipo de ventas por Slack</div>
              </div>
            </div>

            {/* 12. Cursos y Comunidades */}
            <div
              className="studio-feature-card reveal-on-scroll"
              data-category="operacion"
              style={{
                display:
                  activeStudioFilter === 'all' || activeStudioFilter === 'operacion'
                    ? 'flex'
                    : 'none',
              }}
            >
              <div className="card-feature-header">
                <span className="card-category-tag mono">// OPERACIÓN &amp; CURSOS</span>
                <h3 className="card-feature-title">Cursos y Comunidades</h3>
                <p className="card-feature-desc">
                  Aloja cursos en video, entrega accesos privados y gestiona comunidades de miembros sin pagar Kajabi.
                </p>
              </div>
              <div className="mini-ui-mockup-frame">
                <div className="mockup-top-meta mono">
                  <span>ÁREA PRIVADA DE MIEMBROS</span>
                  <span>180 ALUMNOS</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fff' }}>
                  Módulo 2: Configuración de Flujos Comerciales
                </div>
                <div className="course-progress-bar">
                  <div className="course-progress-fill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           6. DIAGRAMA DE SÍNTESIS DE FLUJO (DE LA DISPERSIÓN AL ORDEN)
           ==================================================================== */}
      <section className="section" id="producto">
        <div className="container">
          <div className="section-editorial-header reveal-on-scroll">
            <span className="section-tag">EL CONCEPTO DE SÍNTESIS</span>
            <h2 className="section-title">
              De la dispersión al orden: <br />
              <span className="text-gradient">un solo motor de ejecución.</span>
            </h2>
            <p className="section-lead">
              Visualiza cómo las entradas caóticas de múltiples canales se refractan y sintetizan en un flujo operativo
              coordinado.
            </p>
          </div>

          <div className="synthesis-graphic-stage reveal-on-scroll">
            <img
              src="/assets/brand/synthesis-diagram.svg"
              alt="Diagrama de Síntesis: De la dispersión caótica al sistema coherente"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ====================================================================
           7. CÓMO FUNCIONA (TIMELINE EDITORIAL CON NODOS ENERGÉTICOS)
           ==================================================================== */}
      <section className="section" id="como-funciona">
        <div className="container">
          <div className="timeline-split-layout">
            {/* Columna Izquierda Fija / Sticky */}
            <div className="timeline-sticky-col reveal-on-scroll">
              <span className="section-tag">METODOLOGÍA DE IMPLEMENTACIÓN</span>
              <h2 className="section-title">
                De la captación al cierre: <br />
                <span className="text-gradient">simple, claro y automático.</span>
              </h2>
              <p className="section-lead" style={{ marginBottom: 30 }}>
                Un flujo estructurado en 4 fases para garantizar que cada interacción con tu negocio tenga un rumbo
                predefinido.
              </p>
              <a
                href={defaultWhatsApp}
                className="btn btn-whatsapp btn-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Comenzar implementación por WhatsApp
              </a>
            </div>

            {/* Columna Derecha con los 4 Pasos e Íconos Energéticos */}
            <div className="timeline-steps-flow">
              <div className="flow-step-box reveal-on-scroll">
                <div className="flow-step-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                  </svg>
                </div>
                <div className="flow-number-tag mono">FASE 01</div>
                <h3 className="flow-title">Ingesta Unificada de Contactos</h3>
                <p className="flow-desc">
                  Tus prospectos llegan por WhatsApp, sitio web, formularios o campañas publicitarias. El sistema los
                  captura de forma instantánea sin riesgo de pérdida de datos.
                </p>
              </div>

              <div className="flow-step-box reveal-on-scroll">
                <div className="flow-step-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div className="flow-number-tag mono">FASE 02</div>
                <h3 className="flow-title">Clasificación y Asignación Inteligente</h3>
                <p className="flow-desc">
                  Cada contacto se etiqueta según su canal de origen, nivel de urgencia e interés, integrándose
                  automáticamente en la columna adecuada del pipeline comercial.
                </p>
              </div>

              <div className="flow-step-box reveal-on-scroll">
                <div className="flow-step-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div className="flow-number-tag mono">FASE 03</div>
                <h3 className="flow-title">Ejecución de Flujos Autónomos</h3>
                <p className="flow-desc">
                  Se disparan respuestas automáticas personalizadas, enlaces de reserva de citas y recordatorios para
                  asegurar una respuesta inmediata en menos de 60 segundos.
                </p>
              </div>

              <div className="flow-step-box reveal-on-scroll">
                <div className="flow-step-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div className="flow-number-tag mono">FASE 04</div>
                <h3 className="flow-title">Visibilidad Ejecutiva y Toma de Decisiones</h3>
                <p className="flow-desc">
                  Accedes a tableros de rendimiento en tiempo real para conocer exactamente de dónde provienen tus
                  clientes más rentables y cuánto valor tienes en proceso de cierre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           8. PARA QUIÉN ES (CHECKLIST EDITORIAL CON CONTRASTE)
           ==================================================================== */}
      <section className="section" id="para-quien">
        <div className="container">
          <div className="section-editorial-header reveal-on-scroll">
            <span className="section-tag">COMPATIBILIDAD OPERATIVA</span>
            <h2 className="section-title">
              ¿Es Idea Sintética la solución <br />
              <span className="text-gradient">adecuada para tu negocio?</span>
            </h2>
            <p className="section-lead">
              Diseñado con rigor para empresas y profesionales que buscan orden, escalabilidad y consistencia comercial.
            </p>
          </div>

          <div className="fit-contrast-grid">
            {/* Para quién SÍ es */}
            <div className="fit-card fit-positive reveal-on-scroll">
              <div className="fit-header">
                <div style={{ color: 'var(--accent-teal)', fontWeight: 800, fontSize: '1.1rem' }}>
                  ✓ DISEÑADO CON PRECISIÓN PARA:
                </div>
              </div>
              <ul className="fit-list">
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Negocios que quieren operar con un sistema comercial predecible y ordenado.</span>
                </li>
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Empresas que pierden ventas porque el seguimiento manual se vuelve caótico.</span>
                </li>
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Equipos cansados de pagar múltiples suscripciones a herramientas aisladas.</span>
                </li>
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Líderes que quieren tomar decisiones basadas en números reales de conversión.</span>
                </li>
              </ul>
            </div>

            {/* Para quién NO es */}
            <div className="fit-card fit-negative reveal-on-scroll">
              <div className="fit-header">
                <div style={{ color: '#94a3b8', fontWeight: 800, fontSize: '1.1rem' }}>
                  ✕ NO ES LA SOLUCIÓN ADECUADA SI:
                </div>
              </div>
              <ul className="fit-list">
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Prefieres seguir gestionando clientes con libretas o notas sueltas en papel.</span>
                </li>
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>No te interesa mejorar la velocidad de atención ni la experiencia de tus clientes.</span>
                </li>
                <li className="fit-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  <span>Estás satisfecho reescribiendo los mismos datos manualmente entre plataformas.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           8.5. MODELOS OPERATIVOS Y CASOS DE USO (ARQUITECTURA DE NEGOCIO)
           ==================================================================== */}
      <section className="testimonials-section" id="casos-de-uso">
        <div id="testimonios" style={{ position: 'absolute', top: 0 }} aria-hidden="true"></div>
        <div className="container container-wide">
          <div className="section-editorial-header reveal-on-scroll" style={{ textAlign: 'center' }}>
            <span className="section-tag section-tag-lime">MODELOS OPERATIVOS // CASOS DE USO</span>
            <h2 className="section-title">
              Una arquitectura flexible para <br />
              <span className="text-gradient">distintos modelos de negocio.</span>
            </h2>
            <p className="section-lead" style={{ margin: '0 auto', maxWidth: 680 }}>
              Idea Sintética se adapta a la dinámica de tu empresa, unificando la captación, la gestión de ventas y la
              entrega en una sola plataforma centralizada.
            </p>
          </div>

          <div className="testimonials-grid">
            {/* Caso 1: Agencias de Servicios & Crecimiento */}
            <div className="testimonial-card reveal-on-scroll">
              <div>
                <span
                  className="card-category-tag mono"
                  style={{
                    color: 'var(--accent-teal)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  // MODELO AGENCIA &amp; GROWTH
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                  Agencias de Crecimiento &amp; Servicios
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Centraliza la prospección comercial, el seguimiento de clientes y la operación de múltiples embudos
                  desde un solo centro de mando, eliminando pérdidas de leads por fallos de integración.
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-teal)' }}>✓</span> Pipelines comerciales y CRM con vista Kanban
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-teal)' }}>✓</span> Automatizaciones de seguimiento por WhatsApp y
                    email
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-teal)' }}>✓</span> Control unificado sin depender de
                    suscripciones dispersas
                  </li>
                </ul>
              </div>
              <div className="testimonial-author">
                <img
                  src="/assets/people/avatar-carlos.jpg"
                  alt="Perfil: Dirección Comercial y Agencias"
                  className="author-avatar"
                  loading="lazy"
                />
                <div className="author-info">
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff' }}>
                    Dirección Comercial &amp; Agencias
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                    Enfoque: Gestión de leads y operaciones de prospección
                  </p>
                </div>
              </div>
            </div>

            {/* Caso 2: Academias & Creadores Digitales */}
            <div className="testimonial-card reveal-on-scroll">
              <div>
                <span
                  className="card-category-tag mono"
                  style={{
                    color: 'var(--accent-lime)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  // MODELO EDUCACIÓN &amp; FORMACIÓN
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                  Academias &amp; Formación Digital
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Sincroniza la captación de nuevos alumnos con el procesamiento de pagos y las notificaciones
                  automáticas, ofreciendo una experiencia sin interrupciones desde el primer registro.
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-lime)' }}>✓</span> Páginas de captura y cobros directos
                    integrados
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-lime)' }}>✓</span> Notificaciones y confirmaciones de acceso
                    automáticas
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent-lime)' }}>✓</span> Acompañamiento del ciclo formativo en un solo
                    panel
                  </li>
                </ul>
              </div>
              <div className="testimonial-author">
                <img
                  src="/assets/people/avatar-elena.jpg"
                  alt="Perfil: Formación y Negocios Digitales"
                  className="author-avatar"
                  loading="lazy"
                />
                <div className="author-info">
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff' }}>
                    Formación &amp; Negocios Digitales
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                    Enfoque: Conversión fluida y comunicación automatizada
                  </p>
                </div>
              </div>
            </div>

            {/* Caso 3: Empresas de Servicios Profesionales & B2B */}
            <div className="testimonial-card reveal-on-scroll">
              <div>
                <span
                  className="card-category-tag mono"
                  style={{
                    color: '#38bdf8',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  // MODELO CONSULTORÍA &amp; SERVICIOS B2B
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                  Consultoría &amp; Servicios B2B
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 20 }}>
                  Acelera los tiempos de respuesta ante prospectos entrantes, coordina llamadas comerciales
                  sincronizadas con tus agendas y mantén el historial de cada oportunidad accesible.
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 24px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    fontSize: '0.82rem',
                    color: '#cbd5e1',
                  }}
                >
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#38bdf8)' }}>✓</span> Respuestas ágiles y calificación de consultas en
                    WhatsApp
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#38bdf8)' }}>✓</span> Agendamiento directo sincronizado con Google Calendar
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#38bdf8)' }}>✓</span> Historial comercial y trazabilidad compartida del
                    equipo
                  </li>
                </ul>
              </div>
              <div className="testimonial-author">
                <img
                  src="/assets/people/avatar-diego.jpg"
                  alt="Perfil: Consultoría y Servicios Corporativos"
                  className="author-avatar"
                  loading="lazy"
                />
                <div className="author-info">
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#fff' }}>
                    Consultoría &amp; Servicios B2B
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                    Enfoque: Velocidad de atención y agendamiento comercial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           9. PREGUNTAS FRECUENTES (FAQ ACCORDION)
           ==================================================================== */}
      <section className="section" id="faq">
        <div className="container">
          <div className="section-editorial-header reveal-on-scroll" style={{ textAlign: 'center' }}>
            <span className="section-tag">PREGUNTAS FRECUENTES</span>
            <h2 className="section-title">
              Resolvemos tus inquietudes <br />
              <span className="text-gradient">con total claridad.</span>
            </h2>
          </div>

          <div className="faq-box-wrapper reveal-on-scroll">
            {/* FAQ Item 1 */}
            <div className={`faq-accordion-item ${openFaqIndex === 0 ? 'active' : ''}`}>
              <button className="faq-trigger-btn" type="button" onClick={() => toggleFaq(0)}>
                <span>¿Idea Sintética realmente puede reemplazar a todas esas herramientas?</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openFaqIndex === 0 ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className="faq-content-drawer"
                style={{
                  display: openFaqIndex === 0 ? 'block' : 'none',
                }}
              >
                <p>
                  Sí. Idea Sintética incluye de manera nativa CRM de contactos, embudos de venta, automatizaciones
                  lógicas, calendarios de reservas, email marketing, bandeja omnicanal de WhatsApp e Instagram,
                  formularios y gestión de reseñas. Esto te permite cancelar suscripciones duplicadas y centralizar tu
                  operación en un solo panel de control.
                </p>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className={`faq-accordion-item ${openFaqIndex === 1 ? 'active' : ''}`}>
              <button className="faq-trigger-btn" type="button" onClick={() => toggleFaq(1)}>
                <span>¿Qué diferencia hay entre "herramientas que reemplaza" e "integraciones"?</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openFaqIndex === 1 ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className="faq-content-drawer"
                style={{
                  display: openFaqIndex === 1 ? 'block' : 'none',
                }}
              >
                <p>
                  Las <strong>herramientas que reemplaza</strong> son aplicaciones de software que ya no necesitas pagar
                  por separado (como Calendly, Zapier, HubSpot o Mailchimp). Las <strong>integraciones</strong> son
                  plataformas externas esenciales con las que Idea Sintética se conecta de forma nativa (como tu línea
                  de WhatsApp Business, pasarelas de pago de Stripe, tu cuenta de Google o tu tienda Shopify).
                </p>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className={`faq-accordion-item ${openFaqIndex === 2 ? 'active' : ''}`}>
              <button className="faq-trigger-btn" type="button" onClick={() => toggleFaq(2)}>
                <span>¿Necesito saber programar para utilizar Idea Sintética?</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openFaqIndex === 2 ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className="faq-content-drawer"
                style={{
                  display: openFaqIndex === 2 ? 'block' : 'none',
                }}
              >
                <p>
                  No, para nada. La plataforma está diseñada con una interfaz visual intuitiva sin necesidad de código.
                  Además, entregamos el sistema estructurado con acompañamiento directo para que tú y tu equipo aprendan
                  a utilizarlo de inmediato.
                </p>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className={`faq-accordion-item ${openFaqIndex === 3 ? 'active' : ''}`}>
              <button className="faq-trigger-btn" type="button" onClick={() => toggleFaq(3)}>
                <span>¿En cuánto tiempo queda listo para funcionar?</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openFaqIndex === 3 ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className="faq-content-drawer"
                style={{
                  display: openFaqIndex === 3 ? 'block' : 'none',
                }}
              >
                <p>
                  El despliegue inicial y las automatizaciones esenciales quedan configurados en cuestión de pocos días
                  una vez definidas las etapas de tu proceso comercial y tus canales de captación.
                </p>
              </div>
            </div>

            {/* FAQ Item 5 */}
            <div className={`faq-accordion-item ${openFaqIndex === 4 ? 'active' : ''}`}>
              <button className="faq-trigger-btn" type="button" onClick={() => toggleFaq(4)}>
                <span>¿Puedo consultar o contratar directamente por WhatsApp?</span>
                <svg
                  className="faq-chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: openFaqIndex === 4 ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div
                className="faq-content-drawer"
                style={{
                  display: openFaqIndex === 4 ? 'block' : 'none',
                }}
              >
                <p>
                  Sí, por supuesto. Puedes hacer clic en cualquiera de los botones de WhatsApp de la página para
                  conversar directamente con nosotros, resolver dudas puntuales sobre tu empresa y comenzar de
                  inmediato.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           10. TERMINAL FINAL CTA (CON SILUETA ENERGÉTICA DE MARCA)
           ==================================================================== */}
      <section className="section" id="contacto">
        <div className="container">
          <div className="final-cta-container reveal-on-scroll">
            {/* Silueta Arquitectónica de la Ampolleta en Fondo */}
            <div className="cta-bulb-backdrop" aria-hidden="true">
              <img src="/assets/brand/bulb-wireframe.svg" alt="Wireframe de Idea Sintética" loading="lazy" />
            </div>

            <div className="final-cta-glow" aria-hidden="true"></div>

            <span className="section-tag mono">[STATUS: READY_TO_DEPLOY]</span>
            <h2 className="final-cta-title">
              Enciende el sistema que tu negocio <br />
              <span className="text-gradient">necesita para operar con claridad.</span>
            </h2>
            <p className="final-cta-desc">
              Convierte tu operación en un sistema inteligente preparado para escalar. Hablemos hoy mismo por WhatsApp y
              te mostramos cómo sintetizar tus procesos.
            </p>

            <div className="final-cta-cluster">
              <a
                href={defaultWhatsApp}
                className="btn btn-whatsapp btn-lg"
                target="_blank"
                rel="noopener noreferrer"
                id="finalWhatsAppBtn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Hablar por WhatsApp
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-lg open-video-btn"
                id="finalDemoBtn"
                onClick={openVideo}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Ver demo en video
              </button>
            </div>

            <div
              className="mono"
              style={{
                marginTop: 24,
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Atención personalizada • Sin contratos forzosos • Despliegue ágil
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
           11. FOOTER LIMPIO
           ==================================================================== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#hero" className="brand-logo-link">
                <div className="brand-icon-wrapper" style={{ width: 32, height: 32 }}>
                  <svg viewBox="0 0 48 48" fill="none" width="18" height="18">
                    <circle cx="24" cy="24" r="20" stroke="#00f5c4" strokeWidth="2" />
                    <circle cx="24" cy="24" r="6" fill="#00f5c4" />
                  </svg>
                </div>
                <span className="brand-text" style={{ fontSize: '1.05rem' }}>
                  Idea<span>Sintética</span>
                </span>
              </a>
              <p className="footer-brand-p">
                Transformamos ideas complejas en sistemas simples, claros y listos para funcionar.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Plataforma</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#reemplaza">¿Qué reemplaza?</a>
                </li>
                <li>
                  <a href="#funcionalidades">12 Funcionalidades</a>
                </li>
                <li>
                  <a href="#integraciones">Integraciones</a>
                </li>
                <li>
                  <a href="#como-funciona">Cómo funciona</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Módulos</h4>
              <ul className="footer-nav">
                <li>
                  <a href="#funcionalidades">CRM &amp; Ventas</a>
                </li>
                <li>
                  <a href="#funcionalidades">WhatsApp Omnicanal</a>
                </li>
                <li>
                  <a href="#funcionalidades">Automatizaciones</a>
                </li>
                <li>
                  <a href="#faq">Preguntas</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contacto</h4>
              <ul className="footer-nav">
                <li>
                  <a
                    href={defaultWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="15"
                      height="15"
                      style={{ color: 'var(--accent-teal)' }}
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Atención por WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={purchaseWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--accent-lime)', fontWeight: 600 }}
                  >
                    Pagar o Contratar →
                  </a>
                </li>
                <li className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 6 }}>
                  {CONFIG.email}
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom-row">
            <div>© {new Date().getFullYear()} Idea Sintética. Todos los derechos reservados.</div>
            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#hero">Términos del Servicio</a>
              <a href="#hero">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ====================================================================
           BOTÓN FLOTANTE DE WHATSAPP (CONVERSIÓN RÁPIDA)
           ==================================================================== */}
      <a
        href={defaultWhatsApp}
        className="floating-whatsapp"
        id="floatingWhatsAppBtn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hablar por WhatsApp con Idea Sintética"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span>Hablar por WhatsApp</span>
      </a>

      {/* ====================================================================
           MODAL DE VIDEO INTERACTIVO
           ==================================================================== */}
      <div
        className={`video-modal ${videoModalOpen ? 'open' : ''}`}
        id="videoModal"
        role="dialog"
        aria-modal="true"
        aria-label="Demostración de Idea Sintética"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeVideo();
        }}
      >
        <div className="video-modal-shell">
          <div className="video-modal-bar">
            <div className="mono" style={{ fontSize: '0.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pulse-dot-green"></span>
              <span>Idea Sintética // Demostración en Video</span>
            </div>
            <button
              className="modal-close-trigger"
              id="closeVideoModal"
              aria-label="Cerrar video"
              onClick={closeVideo}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="modal-video-viewport">
            {videoModalOpen && (
              <iframe
                id="modalVideoFrame"
                src={CONFIG.video.embedUrl}
                title="Demostración de Idea Sintética"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
