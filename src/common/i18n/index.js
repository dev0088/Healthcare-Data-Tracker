import english from './en';
import french from './fr';

export const DEFAULT_LOCALE = 'fr';

export const Translations = {
  en: english,
  fr: french,
};

export function translate(message, locale = DEFAULT_LOCALE) {
  // We're actually asking for 'something' to be translated
  if (message) {
    if (Translations[locale]) 
      if (Translations[locale][message]) return Translations[locale][message];
    
    return message;
  }

  return '???';
}

export default function _t(message, locale = DEFAULT_LOCALE) {
  return translate(message, locale);
}
