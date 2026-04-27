import type { Dict } from "./types";

export const ca: Dict = {
  meta: {
    title: "Ductual - Gestió de consulta de psicologia, amb calma",
    description:
      "Agenda, fitxes clíniques amb RGPD i facturació en una sola eina. Pensada per a psicòlegs a Espanya. Apunta't a la llista d'espera.",
    privacyTitle: "Política de privacitat - Ductual",
    privacyDescription: "Política de privacitat de Ductual.",
  },
  hero: {
    badge: "Properament",
    headlinePre: "La teva consulta de psicologia, ",
    headlineEm: "amb calma",
    headlinePost: ".",
    sub: "Agenda, fitxes clíniques amb RGPD i facturació en una sola eina. Pensada per a psicòlegs a Espanya.",
    cta: "Apuntar-me a la llista d'espera",
    microcopy:
      "Informe ocasional del desenvolupament i alguna enquesta breu per escoltar-te.",
  },
  features: {
    sectionTitle: "El que cobrim",
    items: [
      {
        title: "Agenda",
        desc: "Slots, recordatoris automàtics i sincronització bidireccional completa amb Google Calendar.",
      },
      {
        title: "Fitxa clínica amb RGPD",
        desc: "Notes xifrades, exportables i control complet del pacient sobre les seves dades. Compliment per disseny.",
      },
      {
        title: "Facturació",
        desc: "Tu decideixes què i quan facturar. Configurable al teu gust, amb Verifactu/AEAT i IVA correctes.",
      },
    ],
  },
  steps: {
    sectionTitle: "Com serà la teva primera setmana",
    items: [
      {
        n: "01",
        title: "Crear el teu espai",
        desc: "En minuts, sense instal·lar res. Accés des de qualsevol navegador.",
      },
      {
        n: "02",
        title: "Configurar agenda i plantilles",
        desc: "Els teus horaris, tipus de sessió, plantilles de notes i dades fiscals.",
      },
      {
        n: "03",
        title: "Rebre pacients",
        desc: "Gestionar sessions, notes clíniques i emetre factures sense distraccions.",
      },
    ],
  },
  emailForm: {
    title: "Apunta't a la llista d'espera",
    lede: "T'avisem per correu quan estigui disponible. Rebràs un informe periòdic del desenvolupament i, de tant en tant, una enquesta breu per donar-nos feedback.",
    label: "Correu electrònic",
    placeholder: "tu@email.com",
    consentPre: "He llegit i accepto la ",
    consentLink: "política de privacitat",
    consentPost: ".",
    submit: "Apuntar-me",
    submitLoading: "Enviant...",
    microcopy:
      "Només l'important: avenços del desenvolupament i enquestes puntuals. Pots donar-te de baixa en qualsevol moment.",
    success: "Llest! Et escriurem aviat amb el primer informe.",
    errorGeneric: "Alguna cosa ha anat malament. Torna-ho a provar.",
    errorNetwork: "Error de connexió. Torna-ho a provar.",
    errorInvalidEmail: "Introdueix un correu electrònic vàlid.",
    errorConsent: "Has d'acceptar la política de privacitat.",
  },
  faq: {
    sectionTitle: "Preguntes freqüents",
    items: [
      {
        q: "Quan ho llanceu?",
        a: "Estem en desenvolupament actiu. T'avisarem per correu tan aviat com estigui disponible.",
      },
      {
        q: "És per a Espanya?",
        a: "Sí. Dissenyat per complir el RGPD, amb factura electrònica AEAT (Verifactu) i suport en català i castellà.",
      },
      {
        q: "Les meves dades estan segures?",
        a: "Xifratge en repòs, còpies diàries i DPA signable. Complim el RGPD per disseny.",
      },
      {
        q: "Puc exportar les meves dades?",
        a: "Sí. Exportació completa en format obert, en qualsevol moment, sense lock-in.",
      },
    ],
  },
  footer: {
    tag: "Gestió de consulta, amb calma.",
    privacyLink: "Política de privacitat",
    location: "Fet a Espanya",
    nav: "Peu de pàgina",
  },
  privacy: {
    back: "← Tornar",
    h1: "Política de privacitat",
    notice:
      "Esborrany pendent de revisió per assessor legal (ADR-024 de ductual-docs). No substitueix assessorament jurídic professional.",
    sections: [
      {
        h: "Dades que recollim",
        body: "Únicament la teva adreça de correu electrònic, facilitada de manera voluntària a través del formulari d'aquesta pàgina.",
      },
      {
        h: "Finalitat i base de licitud",
        body: "El teu correu es guarda per enviar-te un informe periòdic del desenvolupament de Ductual i, ocasionalment, enquestes breus per recollir feedback. La base de licitud és el teu consentiment exprés (art. 6.1.a del Reglament General de Protecció de Dades).",
      },
      {
        h: "Conservació de les dades",
        body: "Conservem el teu correu fins que sol·licitis la baixa o fins que el servei sigui llançat i hagis tingut l'oportunitat de registrar-te o no a la plataforma.",
      },
      {
        h: "Destinataris",
        body: "Les teves dades s'emmagatzemen a Resend (resend.com), proveïdor de correu transaccional amb DPA signat i seu a la Unió Europea. No cedim les teves dades a tercers amb finalitats comercials.",
      },
      {
        h: "Els teus drets",
        body: "Pots exercir els teus drets d'accés, rectificació, supressió, portabilitat i oposició enviant un correu a l'adreça de contacte. També pots reclamar davant l'Agència Espanyola de Protecció de Dades (aepd.es).",
      },
    ],
    contactBefore: "Responsable del tractament",
    contactName: "Adrián Justino (Developer).",
    contactEmailLabel: "Correu de contacte",
  },
  routes: {
    privacy: "/privacitat",
  },
};
