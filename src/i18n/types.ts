export type Locale = "es" | "ca";

export interface Dict {
  meta: {
    title: string;
    description: string;
    privacyTitle: string;
    privacyDescription: string;
  };
  hero: {
    badge: string;
    headlinePre: string;
    headlineEm: string;
    headlinePost: string;
    sub: string;
    cta: string;
    microcopy: string;
  };
  features: {
    sectionTitle: string;
    items: { title: string; desc: string }[];
  };
  steps: {
    sectionTitle: string;
    items: { n: string; title: string; desc: string }[];
  };
  emailForm: {
    title: string;
    lede: string;
    label: string;
    placeholder: string;
    consentPre: string;
    consentLink: string;
    consentPost: string;
    submit: string;
    submitLoading: string;
    microcopy: string;
    success: string;
    errorGeneric: string;
    errorNetwork: string;
    errorInvalidEmail: string;
    errorConsent: string;
  };
  faq: {
    sectionTitle: string;
    items: { q: string; a: string }[];
  };
  footer: {
    tag: string;
    privacyLink: string;
    location: string;
    nav: string;
  };
  privacy: {
    back: string;
    h1: string;
    notice: string;
    sections: {
      h: string;
      body: string;
    }[];
    contactBefore: string;
    contactName: string;
    contactEmailLabel: string;
  };
  routes: {
    privacy: string;
  };
}
