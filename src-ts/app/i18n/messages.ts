import type { Locale } from './language.js';

export interface AppMessages {
  documentTitle: string;
  description: string;
  backToSummaryTitle: string;
  languageSwitcherLabel: string;
  gateTitle: string;
  gateSubtitle: string;
  loadErrorSection: string;
  bootstrapErrorSection: string;
  manifestLoadTitle: string;
  manifestLoadDetails: string;
  manifestEmptyTitle: string;
  manifestEmptyDetails: string;
  slidesLoadTitle: string;
  slidesLoadDetails: string;
  partLoadTitle: string;
  partLoadDetails: (partIdx: number, reason: string) => string;
  sourceLabel: string;
}

const APP_MESSAGES: Record<Locale, AppMessages> = {
  'pt-BR': {
    documentTitle: 'Spec-Driven Development com GitHub Copilot | Glaucia Lemos',
    description:
      'Apresentação técnica sobre Spec-Driven Development (SDD) com GitHub Copilot Agent Mode: specs estruturadas + IA = código previsível e reduzindo alucinações.',
    backToSummaryTitle: 'Voltar ao Sumário',
    languageSwitcherLabel: 'Idioma',
    gateTitle: 'Escolha o idioma da apresentação',
    gateSubtitle: 'Selecione um idioma para carregar todos os slides nesta sessão.',
    loadErrorSection: 'Erro de Carregamento',
    bootstrapErrorSection: 'Erro de Bootstrap',
    manifestLoadTitle: 'Não foi possível carregar o manifesto de slides',
    manifestLoadDetails: 'A apresentação iniciou em modo degradado. Verifique a conectividade/local server.',
    manifestEmptyTitle: 'Manifesto sem seções',
    manifestEmptyDetails: 'Nenhuma seção de slide foi encontrada no manifesto informado.',
    slidesLoadTitle: 'Não foi possível carregar os slides',
    slidesLoadDetails: 'A apresentação iniciou em modo degradado. Verifique a origem dos slides.',
    partLoadTitle: 'Erro ao carregar seção',
    partLoadDetails: (partIdx: number, reason: string): string =>
      `A seção #${partIdx} não pôde ser carregada (${reason}).`,
    sourceLabel: 'Origem',
  },
  'en-US': {
    documentTitle: 'Spec-Driven Development with GitHub Copilot | Glaucia Lemos',
    description:
      'Technical talk about Spec-Driven Development (SDD) with GitHub Copilot Agent Mode: structured specs + AI = predictable code and fewer hallucinations.',
    backToSummaryTitle: 'Back to Agenda',
    languageSwitcherLabel: 'Language',
    gateTitle: 'Choose the presentation language',
    gateSubtitle: 'Pick one language to load all slides for this session.',
    loadErrorSection: 'Loading Error',
    bootstrapErrorSection: 'Bootstrap Error',
    manifestLoadTitle: 'Could not load the slide manifest',
    manifestLoadDetails: 'The presentation started in degraded mode. Check connectivity/local server.',
    manifestEmptyTitle: 'Manifest has no sections',
    manifestEmptyDetails: 'No slide sections were found in the provided manifest.',
    slidesLoadTitle: 'Could not load the slides',
    slidesLoadDetails: 'The presentation started in degraded mode. Check the slide source.',
    partLoadTitle: 'Failed to load section',
    partLoadDetails: (partIdx: number, reason: string): string =>
      `Section #${partIdx} could not be loaded (${reason}).`,
    sourceLabel: 'Source',
  },
  'es-ES': {
    documentTitle: 'Spec-Driven Development con GitHub Copilot | Glaucia Lemos',
    description:
      'Presentación técnica sobre Spec-Driven Development (SDD) con GitHub Copilot Agent Mode: especificaciones estructuradas + IA = código predecible y menos alucinaciones.',
    backToSummaryTitle: 'Volver al Resumen',
    languageSwitcherLabel: 'Idioma',
    gateTitle: 'Elige el idioma de la presentación',
    gateSubtitle: 'Selecciona un idioma para cargar todas las diapositivas en esta sesión.',
    loadErrorSection: 'Error de Carga',
    bootstrapErrorSection: 'Error de Bootstrap',
    manifestLoadTitle: 'No se pudo cargar el manifiesto de diapositivas',
    manifestLoadDetails: 'La presentación se inició en modo degradado. Verifica la conectividad/servidor local.',
    manifestEmptyTitle: 'Manifiesto sin secciones',
    manifestEmptyDetails: 'No se encontraron secciones de diapositivas en el manifiesto proporcionado.',
    slidesLoadTitle: 'No se pudieron cargar las diapositivas',
    slidesLoadDetails: 'La presentación se inició en modo degradado. Verifica el origen de las diapositivas.',
    partLoadTitle: 'Error al cargar sección',
    partLoadDetails: (partIdx: number, reason: string): string =>
      `No se pudo cargar la sección #${partIdx} (${reason}).`,
    sourceLabel: 'Origen',
  },
};

export function getAppMessages(locale: Locale): AppMessages {
  return APP_MESSAGES[locale];
}
