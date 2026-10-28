/**
 * IDEA SINTÉTICA — CORE INTERACTION LOGIC
 * High-performance spotlight cursor tracking, console tab switcher,
 * studio 12-feature filter, video modal controller, and dynamic config binding.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inyectar enlaces de WhatsApp desde config.js
  initWhatsAppBindings();

  // 2. Control de barra de navegación y menú móvil
  initNavigation();

  // 3. Efecto de foco dinámico (Spotlight) en tarjetas Bento y de reemplazo
  initSpotlightEffect();

  // 4. Selector de pestañas interactivas de características
  initConsoleTabs();

  // 5. Filtro de categorías del Estudio de 12 Funcionalidades
  initStudioFilters();

  // 6. Acordeón de preguntas frecuentes (FAQ)
  initFaqAccordion();

  // 7. Modal de video de demostración
  initVideoModal();

  // 8. Animaciones suaves con IntersectionObserver
  initScrollAnimations();
});

/**
 * Enlaza los botones y llamadas a la acción con los valores de config.js
 */
function initWhatsAppBindings() {
  if (typeof getWhatsAppUrl !== 'function') return;

  const defaultUrl = getWhatsAppUrl('default');
  const purchaseUrl = getWhatsAppUrl('purchase');

  document.querySelectorAll('[data-whatsapp="default"]').forEach(el => {
    el.setAttribute('href', defaultUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  document.querySelectorAll('[data-whatsapp="purchase"]').forEach(el => {
    el.setAttribute('href', purchaseUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  const floatingBtn = document.getElementById('floatingWhatsAppBtn');
  if (floatingBtn) {
    floatingBtn.setAttribute('href', defaultUrl);
  }
}

/**
 * Manejo de navbar y menú móvil
 */
function initNavigation() {
  const navbar = document.getElementById('mainNavbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/**
 * Cursor Spotlight Effect para Bento Cards y Replacement Cards
 */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.bento-card, .spotlight-card, .replacement-card');
  if (!cards.length) return;

  cards.forEach(card => {
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  });
}

/**
 * Selector de pestañas interactivas del panel de características
 */
function initConsoleTabs() {
  const tabButtons = document.querySelectorAll('.console-tab-btn');
  const tabPanels = document.querySelectorAll('.console-stage-card');

  if (!tabButtons.length || !tabPanels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`panel-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * Filtro interactivo de 12 Funcionalidades en el Product Studio
 */
function initStudioFilters() {
  const filterButtons = document.querySelectorAll('.filter-pill-btn');
  const featureCards = document.querySelectorAll('.studio-feature-card');

  if (!filterButtons.length || !featureCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      featureCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInTab 0.35s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Acordeón interactivo de preguntas frecuentes
 */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger-btn');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      items.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });
}

/**
 * Controlador del modal de video demo
 */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const openButtons = document.querySelectorAll('.open-video-btn');
  const closeButton = document.getElementById('closeVideoModal');
  const iframe = document.getElementById('modalVideoFrame');

  if (!modal || !iframe) return;

  const open = (e) => {
    if (e) e.preventDefault();
    const heroVid = document.getElementById('heroVideo');
    if (heroVid) {
      heroVid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (typeof CONFIG !== 'undefined' && CONFIG.video && CONFIG.video.embedUrl) {
      iframe.setAttribute('src', CONFIG.video.embedUrl);
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    iframe.setAttribute('src', '');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', open));
  closeButton?.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

/**
 * Animaciones suaves al hacer scroll con IntersectionObserver
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
