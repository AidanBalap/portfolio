import ENLang from '@/i18n/en.json'
import ESLang from '@/i18n/es.json'
import FRLang from '@/i18n/fr.json'

const LANGUAGES = {
    ENGLISH: 'en',
    SPANISH: 'es',
    FRENCH: 'fr'
}

export const getI18N = ({
  currentLocale = 'en'
}: {
  currentLocale: string | undefined
}) => {
  if (currentLocale === LANGUAGES.ENGLISH) return ENLang
  if (currentLocale === LANGUAGES.SPANISH) return ESLang
  if (currentLocale === LANGUAGES.FRENCH) return FRLang

  return ENLang
}

export const replaceStrong = (text: string) => {
  text = text.replaceAll(' **', ' <strong>');
  text = text.replaceAll('**', '</strong>');
  return text;
}