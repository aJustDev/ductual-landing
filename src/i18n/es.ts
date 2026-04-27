import type { Dict } from "./types";

export const es: Dict = {
  meta: {
    title: "Ductual - Gestión de consulta de psicología, con calma",
    description:
      "Agenda, fichas clínicas con RGPD y facturación en una sola herramienta. Pensada para psicólogos en España. Apúntate a la lista de espera.",
    privacyTitle: "Política de privacidad - Ductual",
    privacyDescription: "Política de privacidad de Ductual.",
  },
  hero: {
    badge: "Próximamente",
    headlinePre: "Tu consulta de psicología, ",
    headlineEm: "con calma",
    headlinePost: ".",
    sub: "Agenda, fichas clínicas con RGPD y facturación en una sola herramienta. Pensada para psicólogos en España.",
    cta: "Apuntarme a la lista de espera",
    microcopy:
      "Informe ocasional del desarrollo y alguna encuesta breve para escucharte.",
  },
  features: {
    sectionTitle: "Lo que cubrimos",
    items: [
      {
        title: "Agenda",
        desc: "Slots, recordatorios automáticos y sincronización bidireccional completa con Google Calendar.",
      },
      {
        title: "Ficha clínica con RGPD",
        desc: "Notas cifradas, exportables y control completo del paciente sobre sus datos. Cumplimiento por diseño.",
      },
      {
        title: "Facturación",
        desc: "Tú decides qué y cuándo facturar. Configurable a tu manera, con Verifactu/AEAT e IVA correctos.",
      },
    ],
  },
  steps: {
    sectionTitle: "Cómo será tu primera semana",
    items: [
      {
        n: "01",
        title: "Crear tu espacio",
        desc: "En minutos, sin instalar nada. Acceso desde cualquier navegador.",
      },
      {
        n: "02",
        title: "Configurar agenda y plantillas",
        desc: "Tus horarios, tipos de sesión, plantillas de notas y datos fiscales.",
      },
      {
        n: "03",
        title: "Recibir pacientes",
        desc: "Gestionar sesiones, notas clínicas y emitir facturas sin distracciones.",
      },
    ],
  },
  emailForm: {
    title: "Apúntate a la lista de espera",
    lede: "Te avisamos por email cuando esté disponible. Recibirás un informe periódico del desarrollo y, de vez en cuando, una encuesta breve para darnos feedback.",
    label: "Email",
    placeholder: "tu@email.com",
    consentPre: "He leído y acepto la ",
    consentLink: "política de privacidad",
    consentPost: ".",
    submit: "Apuntarme",
    submitLoading: "Enviando...",
    microcopy:
      "Solo lo importante: avances del desarrollo y encuestas puntuales. Te puedes dar de baja en cualquier momento.",
    success: "¡Listo! Te escribiremos pronto con el primer informe.",
    errorGeneric: "Algo salió mal. Inténtalo de nuevo.",
    errorNetwork: "Error de conexión. Inténtalo de nuevo.",
    errorInvalidEmail: "Introduce un email válido.",
    errorConsent: "Debes aceptar la política de privacidad.",
  },
  faq: {
    sectionTitle: "Preguntas frecuentes",
    items: [
      {
        q: "¿Cuándo lanzáis?",
        a: "Estamos en desarrollo activo. Te avisaremos por email en cuanto esté disponible.",
      },
      {
        q: "¿Es para España?",
        a: "Sí. Diseñado para cumplir el RGPD, con factura electrónica AEAT (Verifactu) y soporte en castellano.",
      },
      {
        q: "¿Mis datos están seguros?",
        a: "Cifrado en reposo, copias diarias y DPA firmable. Cumplimos el RGPD por diseño.",
      },
      {
        q: "¿Puedo exportar mis datos?",
        a: "Sí. Exportación completa en formato abierto, en cualquier momento, sin lock-in.",
      },
    ],
  },
  footer: {
    tag: "Gestión de consulta, con calma.",
    privacyLink: "Política de privacidad",
    location: "Hecho en España",
    nav: "Pie de página",
  },
  privacy: {
    back: "← Volver",
    h1: "Política de privacidad",
    notice:
      "Borrador pendiente de revisión por asesor legal (ADR-024 de ductual-docs). No sustituye a asesoramiento jurídico profesional.",
    sections: [
      {
        h: "Datos que recogemos",
        body: "Únicamente tu dirección de correo electrónico, facilitada de forma voluntaria a través del formulario de esta página.",
      },
      {
        h: "Finalidad y base de licitud",
        body: "Tu email se guarda para enviarte un informe periódico del desarrollo de Ductual y, ocasionalmente, encuestas breves para recabar feedback. La base de licitud es tu consentimiento expreso (art. 6.1.a del Reglamento General de Protección de Datos).",
      },
      {
        h: "Conservación de los datos",
        body: "Conservamos tu email hasta que solicites la baja o hasta que el servicio sea lanzado y hayas tenido la oportunidad de registrarte o no en la plataforma.",
      },
      {
        h: "Destinatarios",
        body: "Tus datos se almacenan en Resend (resend.com), proveedor de email transaccional con DPA firmado y sede en la Unión Europea. No cedemos tus datos a terceros con fines comerciales.",
      },
      {
        h: "Tus derechos",
        body: "Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad y oposición enviando un correo a la dirección de contacto. También puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
      },
    ],
    contactBefore: "Responsable del tratamiento",
    contactName: "Adrián Justino (Developer).",
    contactEmailLabel: "Correo de contacto",
  },
  routes: {
    privacy: "/privacidad",
  },
};
