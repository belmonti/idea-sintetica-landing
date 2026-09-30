const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update ClickFunnels and Birdeye image extensions
html = html.replace(/assets\/tools\/clickfunnels\.svg/g, 'assets/tools/clickfunnels.png');
html = html.replace(/assets\/tools\/birdeye\.svg/g, 'assets/tools/birdeye.png');

// 2. Update navbar link
html = html.replace('<li><a href="#testimonios" class="nav-link">Testimonios</a></li>', '<li><a href="#casos-de-uso" class="nav-link">Casos de Uso</a></li>');

// 3. Hero badge rating and sub
const oldHeroBadge = `<div class="badge-title">★ 4.9 / 5.0</div>
            <div class="badge-sub">+340 negocios en producción</div>`;
const newHeroBadge = `<div class="badge-title">Todo en 1 Plataforma</div>
            <div class="badge-sub">Sin dependencias externas</div>`;
html = html.replace(oldHeroBadge, newHeroBadge);

// 4. Hero badge WhatsApp lead name
html = html.replace('[WHATSAPP_SYNC] Sofía Morales', '[WHATSAPP_CRM] Lead Calificado');

// 5. CRM mockup fake name
html = html.replace('Carlos Méndez • Director Comercial', 'Prospecto B2B • Sector Consultoría');

// 6. Google review mockup text
html = html.replace('“Excelente atención y rapidez en la implementación”', '[Plantilla automática para recopilación de reseñas]');

// 7. Testimonials section refactor to Business Use Cases
const oldTestimonialSectionRegex = /<!-- =+\s+8\.5\.\s+TESTIMONIOS REALES Y RESULTADOS VERIFICABLES[\s\S]*?<\/section>/;

const newSection = `<!-- ====================================================================
       8.5. MODELOS OPERATIVOS Y CASOS DE USO (ARQUITECTURA DE NEGOCIO)
       ==================================================================== -->
  <section class="testimonials-section" id="casos-de-uso">
    <div id="testimonios" style="position: absolute; top: 0;" aria-hidden="true"></div>
    <div class="container container-wide">
      
      <div class="section-editorial-header reveal-on-scroll" style="text-align: center;">
        <span class="section-tag section-tag-lime">MODELOS OPERATIVOS // CASOS DE USO</span>
        <h2 class="section-title">
          Una arquitectura flexible para <br>
          <span class="text-gradient">distintos modelos de negocio.</span>
        </h2>
        <p class="section-lead" style="margin: 0 auto; max-width: 680px;">
          Idea Sintética se adapta a la dinámica de tu empresa, unificando la captación, la gestión de ventas y la entrega en una sola plataforma centralizada.
        </p>
      </div>

      <div class="testimonials-grid">
        
        <!-- Caso 1: Agencias de Servicios & Crecimiento -->
        <div class="testimonial-card reveal-on-scroll">
          <div>
            <span class="card-category-tag mono" style="color: var(--accent-teal); font-size: 0.72rem; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">// MODELO AGENCIA &amp; GROWTH</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 12px;">Agencias de Crecimiento &amp; Servicios</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 20px;">
              Centraliza la prospección comercial, el seguimiento de clientes y la operación de múltiples embudos desde un solo centro de mando, eliminando pérdidas de leads por fallos de integración.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: #cbd5e1;">
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-teal);">✓</span> Pipelines comerciales y CRM con vista Kanban</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-teal);">✓</span> Automatizaciones de seguimiento por WhatsApp y email</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-teal);">✓</span> Control unificado sin depender de suscripciones dispersas</li>
            </ul>
          </div>
          <div class="testimonial-author">
            <img src="assets/people/avatar-carlos.jpg" alt="Perfil: Dirección Comercial y Agencias" class="author-avatar" loading="lazy">
            <div class="author-info">
              <h4 style="font-size: 0.92rem; font-weight: 600; color: #fff;">Dirección Comercial &amp; Agencias</h4>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">Enfoque: Gestión de leads y operaciones de prospección</p>
            </div>
          </div>
        </div>

        <!-- Caso 2: Academias & Creadores Digitales -->
        <div class="testimonial-card reveal-on-scroll">
          <div>
            <span class="card-category-tag mono" style="color: var(--accent-lime); font-size: 0.72rem; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">// MODELO EDUCACIÓN &amp; FORMACIÓN</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 12px;">Academias &amp; Formación Digital</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 20px;">
              Sincroniza la captación de nuevos alumnos con el procesamiento de pagos y las notificaciones automáticas, ofreciendo una experiencia sin interrupciones desde el primer registro.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: #cbd5e1;">
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-lime);">✓</span> Páginas de captura y cobros directos integrados</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-lime);">✓</span> Notificaciones y confirmaciones de acceso automáticas</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: var(--accent-lime);">✓</span> Acompañamiento del ciclo formativo en un solo panel</li>
            </ul>
          </div>
          <div class="testimonial-author">
            <img src="assets/people/avatar-elena.jpg" alt="Perfil: Formación y Negocios Digitales" class="author-avatar" loading="lazy">
            <div class="author-info">
              <h4 style="font-size: 0.92rem; font-weight: 600; color: #fff;">Formación &amp; Negocios Digitales</h4>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">Enfoque: Conversión fluida y comunicación automatizada</p>
            </div>
          </div>
        </div>

        <!-- Caso 3: Empresas de Servicios Profesionales & B2B -->
        <div class="testimonial-card reveal-on-scroll">
          <div>
            <span class="card-category-tag mono" style="color: #38bdf8; font-size: 0.72rem; letter-spacing: 0.08em; display: block; margin-bottom: 8px;">// MODELO CONSULTORÍA &amp; SERVICIOS B2B</span>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #fff; margin-bottom: 12px;">Consultoría &amp; Servicios B2B</h3>
            <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 20px;">
              Acelera los tiempos de respuesta ante prospectos entrantes, coordina llamadas comerciales sincronizadas con tus agendas y mantén el historial de cada oportunidad accesible.
            </p>
            <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; color: #cbd5e1;">
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #38bdf8;">✓</span> Respuestas ágiles y calificación de consultas en WhatsApp</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #38bdf8;">✓</span> Agendamiento directo sincronizado con Google Calendar</li>
              <li style="display: flex; align-items: center; gap: 8px;"><span style="color: #38bdf8;">✓</span> Historial comercial y trazabilidad compartida del equipo</li>
            </ul>
          </div>
          <div class="testimonial-author">
            <img src="assets/people/avatar-diego.jpg" alt="Perfil: Consultoría y Servicios Corporativos" class="author-avatar" loading="lazy">
            <div class="author-info">
              <h4 style="font-size: 0.92rem; font-weight: 600; color: #fff;">Consultoría &amp; Servicios B2B</h4>
              <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0;">Enfoque: Velocidad de atención y agendamiento comercial</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>`;

if (oldTestimonialSectionRegex.test(html)) {
  html = html.replace(oldTestimonialSectionRegex, newSection);
  console.log('Successfully replaced testimonials section with business use cases.');
} else {
  console.error('Could not match old testimonials section regex!');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');
