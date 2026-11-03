export interface VideoItem {
  id: string;
  fig: string;
  category: 'beneficios' | 'plataforma' | 'diferencias' | 'academia' | 'objeciones';
  title: string;
  shortDescription: string;
  duration: string;
  isPlaceholder: boolean;
  videoUrl?: string;
  thumbnail: string;
  tag: string;
}

export interface CategoryOption {
  id: 'todas' | 'beneficios' | 'plataforma' | 'diferencias' | 'academia' | 'objeciones';
  label: string;
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const CONTENT_CONFIG = {
  brand: {
    name: "Idea Sintética",
    tagline: "Centro de Respuestas — Plan Embajador",
    logoSvg: "/assets/logo.svg",
    faviconSvg: "/assets/favicon.svg"
  },

  whatsapp: {
    phoneNumber: "56956610325",
    floatingBarText: "¿Aún tienes dudas sobre el Plan Embajador?",
    floatingButtonText: "Hablemos por WhatsApp",
    link: "https://wa.me/56956610325?text=Hola%2C%20tengo%20una%20consulta%20sobre%20el%20Plan%20Embajador"
  },

  hero: {
    kicker: "FIG. 00 · CENTRO DE RESPUESTAS OFICIAL",
    titlePrimary: "Todo lo que necesitas saber antes de ingresar al",
    titleHighlight: "Plan Embajador.",
    subtitle: "Explora las respuestas visuales, demostraciones reales de la plataforma y resuelve cualquier duda antes de implementar tu sistema comercial.",
    featuredVideo: {
      id: "featured-vsl",
      title: "Presentación Oficial del Plan Embajador",
      badge: "Video Central • 4:45 min",
      duration: "4:45 min",
      poster: "/assets/video/vsl-poster.webp",
      videoUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1"
    }
  },

  categories: [
    { id: 'todas', label: 'Todas las respuestas' },
    { id: 'beneficios', label: 'Beneficios incluidos', badge: '01' },
    { id: 'plataforma', label: 'Demostración de plataforma', badge: '02' },
    { id: 'diferencias', label: 'GoHighLevel vs. Embajador', badge: '03' },
    { id: 'academia', label: 'Academia y soporte', badge: '04' },
    { id: 'objeciones', label: 'Dudas y preguntas clave', badge: '05' },
  ] as CategoryOption[],

  videos: [
    {
      id: "vid-01",
      fig: "01",
      category: "beneficios",
      title: "Tu subcuenta GoHighLevel 100% configurada y lista",
      shortDescription: "Olvídate de empezar desde un lienzo en blanco. Entregamos la infraestructura lista con embudos, pipelines y DNS ya validados.",
      duration: "3:40 min",
      isPlaceholder: false,
      videoUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1",
      thumbnail: "/assets/video/vsl-poster.webp",
      tag: "Infraestructura"
    },
    {
      id: "vid-02",
      fig: "02",
      category: "beneficios",
      title: "Snapshots comerciales probados con clientes reales",
      shortDescription: "Plantillas maestras de conversión que puedes clonar para tus clientes en 1 clic: captación, reactivación y venta consultiva.",
      duration: "4:15 min",
      isPlaceholder: false,
      videoUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1",
      thumbnail: "/assets/brand/idea-sintetica-hero.jpg",
      tag: "Snapshots"
    },
    {
      id: "vid-03",
      fig: "03",
      category: "plataforma",
      title: "Bandeja omnicanal: WhatsApp, Instagram y correo",
      shortDescription: "Demostración de cómo centralizar todas las conversaciones comerciales en un solo buzón sin perder leads entre canales.",
      duration: "5:10 min",
      isPlaceholder: false,
      videoUrl: "https://www.youtube-nocookie.com/embed/nuHaSttuWKk?autoplay=1",
      thumbnail: "/assets/brand/idea-sintetica-hero.jpg",
      tag: "Omnicanal"
    },
    {
      id: "vid-04",
      fig: "04",
      category: "plataforma",
      title: "Automatizaciones con IA y seguimiento de oportunidades",
      shortDescription: "Observa en tiempo real cómo los flujos inteligentes responden preguntas frecuentes, califican prospectos y agendan citas.",
      duration: "Próximamente",
      isPlaceholder: true,
      thumbnail: "/assets/brand/idea-sintetica-hero.jpg",
      tag: "Inteligencia Artificial"
    },
    {
      id: "vid-05",
      fig: "05",
      category: "diferencias",
      title: "¿Por qué no comprar GoHighLevel por tu cuenta?",
      shortDescription: "Un análisis honesto de costos, curva de aprendizaje y los meses de prueba y error que te ahorras con nuestro sistema listo.",
      duration: "Próximamente",
      isPlaceholder: true,
      thumbnail: "/assets/video/vsl-poster.webp",
      tag: "Comparativa"
    },
    {
      id: "vid-06",
      fig: "06",
      category: "academia",
      title: "Acompañamiento semanal y comunidad de Embajadores",
      shortDescription: "Cómo funcionan las sesiones en vivo de soporte técnico y estratégico, y cómo te apoyamos cuando te trabas con un cliente.",
      duration: "Próximamente",
      isPlaceholder: true,
      thumbnail: "/assets/people/hero-founder-office.jpg",
      tag: "Comunidad"
    },
    {
      id: "vid-07",
      fig: "07",
      category: "objeciones",
      title: "¿Qué pasa con los costos de WhatsApp y telefonía?",
      shortDescription: "Desglose transparente de los costos por consumo (Twilio/LC Phone/WhatsApp Cloud API) y cómo cobrárselos a tus clientes.",
      duration: "Próximamente",
      isPlaceholder: true,
      thumbnail: "/assets/brand/idea-sintetica-hero.jpg",
      tag: "Costos y Facturación"
    },
    {
      id: "vid-08",
      fig: "08",
      category: "objeciones",
      title: "¿Necesito saber programar o tener experiencia técnica?",
      shortDescription: "No requieres programar. El sistema está construido con interfaz visual y te enseñamos la lógica paso a paso.",
      duration: "Próximamente",
      isPlaceholder: true,
      thumbnail: "/assets/people/team-collaboration.jpg",
      tag: "Nivel Requerido"
    }
  ] as VideoItem[],

  comparison: {
    kicker: "FIG. 03 · CLARIDAD DE VALOR",
    title: "¿GoHighLevel por tu cuenta o Plan Embajador?",
    subtitle: "Comprende exactamente qué cambia cuando entras con una infraestructura construida vs. empezar desde cero.",
    columns: {
      left: {
        title: "GoHighLevel Directo",
        subtitle: "Comprar una licencia estándar por tu cuenta",
        badge: "Modo Tradicional",
        features: [
          { text: "Software completamente en blanco (sin flujos)", negative: true },
          { text: "2 a 4 meses de configuración técnica inicial", negative: true },
          { text: "Soporte oficial en inglés y por tickets genéricos", negative: true },
          { text: "Sin plantillas comerciales probadas en el mercado", negative: true },
          { text: "Costo fijo mensual desde el primer día sin clientes", negative: true }
        ]
      },
      right: {
        title: "Plan Embajador (Idea Sintética)",
        subtitle: "Sistema comercial listo para desplegar",
        badge: "Recomendado",
        features: [
          { text: "Subcuenta configurada con dominio, correo y WhatsApp", positive: true },
          { text: "Snapshots comerciales listos para clonar en minutos", positive: true },
          { text: "Acompañamiento y soporte técnico en español", positive: true },
          { text: "Academia continua, clases en vivo y comunidad activa", positive: true },
          { text: "Estrategias de venta consultiva para tus clientes", positive: true }
        ]
      }
    }
  },

  faqs: [
    {
      question: "¿Para quién está pensado el Plan Embajador?",
      answer: "Está diseñado para agencias de marketing, freelancers, consultores y profesionales que venden servicios a empresas y desean incorporar sistemas de conversión y CRM con IA a su portafolio sin lidiar con meses de desarrollos técnicos.",
      category: "Requisitos"
    },
    {
      question: "¿Puedo poner mi propia marca y la de mis clientes?",
      answer: "Sí. Cada cliente que gestiones puede contar con sus propios dominios, números de WhatsApp dedicados, correos corporativos y accesos diferenciados, manteniendo una imagen 100% profesional.",
      category: "Marca y Clientes"
    },
    {
      question: "¿Existe contrato de permanencia o costo oculto?",
      answer: "No hay contratos forzosos. Puedes permanecer el tiempo que el sistema te sea rentable. Los únicos costos adicionales son los consumos directos de mensajería (SMS/WhatsApp) que pagas a precio de costo de proveedor.",
      category: "Costos"
    },
    {
      question: "¿Cómo es el proceso tras escribir por WhatsApp?",
      answer: "Al contactarnos por WhatsApp conversamos sobre tu tipo de agencia o negocio, resolvemos cualquier detalle puntual de tu operación y, si el perfil calza, coordinamos tu alta y entrega de accesos en menos de 24 horas hábiles.",
      category: "Ingreso"
    }
  ] as FaqItem[]
};

