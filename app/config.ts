export const CONFIG = {
  // Marca
  brandName: "Idea Sintética",
  tagline: "Transformamos ideas complejas en sistemas simples, claros y listos para funcionar.",

  // Enlace de WhatsApp
  whatsapp: {
    phoneNumber: "TUNUMERO",
    defaultMessage: "Hola, quiero más información sobre Idea Sintética",
    purchaseMessage: "Hola, quiero comenzar y contratar Idea Sintética",
    customUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20más%20información%20sobre%20Idea%20Sintética",
    customPurchaseUrl: "https://wa.me/TUNUMERO?text=Hola,%20quiero%20contratar%20Idea%20Sintética"
  },

  // Video Demo del Sistema
  video: {
    embedUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1",
    title: "Demostración de Idea Sintética en Acción",
    badge: "Demo en video • 4 minutos"
  },

  // Correo de contacto
  email: "contacto@ideasintetica.pro"
};

export function getWhatsAppUrl(type: 'default' | 'purchase' = 'default'): string {
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
