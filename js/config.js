/**
 * ====================================================================
 * CONFIGURACIÓN DE IDEA SINTÉTICA
 * ====================================================================
 * Edita fácilmente los enlaces y datos de contacto en este archivo.
 * Todos los botones y llamadas a la acción de la landing page
 * se actualizarán automáticamente con estos valores.
 */

const CONFIG = {
  // Marca
  brandName: "Idea Sintética",
  tagline: "Transformamos ideas complejas en sistemas simples, claros y listos para funcionar.",

  // Enlace de WhatsApp
  // Puedes usar tu número en formato internacional (ejemplo: 54911XXXXXXXX, 521XXXXXXXXXX, 34XXXXXXXXX)
  whatsapp: {
    phoneNumber: "TUNUMERO", // Reemplaza por tu número telefónico internacional sin "+" ni espacios
    defaultMessage: "Hola, quiero más información sobre Idea Sintética",
    purchaseMessage: "Hola, quiero comenzar y contratar Idea Sintética",
    // Si prefieres usar una URL directa personalizada completa, colócala aquí.
    // Si está vacía (""), se construirá automáticamente con el número y mensaje.
    customUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20más%20información%20sobre%20Idea%20Sintética",
    customPurchaseUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20contratar%20Idea%20Sintética"
  },

  // Video Demo del Sistema
  // Puedes colocar un video de YouTube (ej: https://www.youtube.com/embed/TU_ID_DE_VIDEO),
  // Vimeo (ej: https://player.vimeo.com/video/TU_ID), Loom o un archivo .mp4 directo.
  video: {
    // Placeholder configurable
    embedUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1", // Reemplazar con tu enlace de video real
    title: "Demostración de Idea Sintética en Acción",
    badge: "Demo en video • 4 minutos"
  },

  // Correo de contacto
  email: "contacto@ideasintetica.pro"
};

// Función auxiliar para obtener el enlace de WhatsApp principal
function getWhatsAppUrl(type = 'default') {
  if (type === 'purchase' && CONFIG.whatsapp.customPurchaseUrl) {
    return CONFIG.whatsapp.customPurchaseUrl;
  }
  if (type === 'default' && CONFIG.whatsapp.customUrl) {
    return CONFIG.whatsapp.customUrl;
  }
  const phone = CONFIG.whatsapp.phoneNumber;
  const msg = type === 'purchase' ? CONFIG.whatsapp.purchaseMessage : CONFIG.whatsapp.defaultMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}
