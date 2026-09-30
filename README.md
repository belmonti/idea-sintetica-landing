# Idea Sintética — Landing Page Oficial

Landing page moderna estilo **SaaS premium** para **Idea Sintética**, desarrollada con HTML5 semántico, Vanilla CSS de alto rendimiento y JavaScript modular.

---

## 🎨 Identidad de Marca y Concepto
- **Marca:** Idea Sintética
- **Concepto:** *“Transformamos ideas complejas en sistemas simples, claros y listos para funcionar.”*
- **Paleta de Colores:** 
  - Turquesa Neón (`#00f5c4`)
  - Verde Lima Suave (`#b4ff39`)
  - Cyan Tecnológico (`#06b6d4`)
  - Fondo Oscuro Elegante (`#070a13`, `#0c1220`)
  - Blanco puro para contraste y legibilidad óptima

---

## ⚙️ Configuración Rápida (WhatsApp y Video Demo)

Todos los enlaces de WhatsApp, mensajes y el video de demostración se configuran en un único archivo: **[`js/config.js`](file:///c:/Users/fabia/OneDrive/Desktop/ANTIGRAVITY/Pagina%20web%20general/js/config.js)**.

```javascript
const CONFIG = {
  // Reemplaza por tu número de WhatsApp internacional (sin '+' ni espacios)
  whatsapp: {
    phoneNumber: "TUNUMERO", // Ej: 5491112345678, 521XXXXXXXXXX, 34XXXXXXXXX
    defaultMessage: "Hola, quiero más información sobre Idea Sintética",
    purchaseMessage: "Hola, quiero comenzar y contratar Idea Sintética",
    // Opcional: Si tienes una URL completa personalizada
    customUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20más%20información%20sobre%20Idea%20Sintética",
    customPurchaseUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20contratar%20Idea%20Sintética"
  },

  // Video Demo del Sistema
  video: {
    // Puedes colocar un video de YouTube, Vimeo, Loom o MP4
    embedUrl: "https://www.youtube-nocookie.com/embed/TU_ID_DE_VIDEO?autoplay=1"
  }
};
```

---

## 📁 Estructura del Proyecto

```text
├── index.html          # Estructura principal con las 10 secciones y SEO
├── assets/
│   ├── logo.svg        # Logotipo vectorial (ampolleta + circuito de síntesis)
│   └── favicon.svg     # Favicon optimizado para el navegador
├── css/
│   ├── styles.css      # Estilos SaaS, glassmorphism, tipografía y responsive design
│   └── animations.css  # Microinteracciones, halos de luz y animaciones fluidas
├── js/
│   ├── config.js       # Variables configurables (WhatsApp, video demo, correos)
│   └── main.js         # Lógica interactiva (tabs, modal de video, acordeón FAQ, navbar)
└── serve.js            # Servidor local ultra liviano para pruebas (opcional)
```

---

## 🚀 Despliegue en Producción (Cloudflare Pages u otro hosting)
Dado que es un desarrollo con estándares web modernos sin dependencias pesadas:
1. Puedes arrastrar la carpeta directamente a **Cloudflare Pages**, **Netlify**, **Vercel** o cualquier hosting cPanel/Apache/Nginx.
2. Si utilizas Git con Cloudflare Pages, solo debes seleccionar la rama principal y dejar el comando de compilación en blanco (Build command: *vacío*, Build output directory: `.`).
