import { getParsedTranslations } from '@/i18n/csvParser'

const LANGUAGES = {
    ENGLISH: 'en',
    SPANISH: 'es',
    FRENCH: 'fr'
}

const translations = await getParsedTranslations()

export const getI18N = ({
  currentLocale = 'en'
}: {
  currentLocale: string | undefined
}) => {
  if (!Object.values(LANGUAGES).includes(currentLocale)) {
    return translations[LANGUAGES.ENGLISH]
  }

  return translations[currentLocale]
}

export const replaceStrong = (text: string) => {
  try {
    text = text.replaceAll(' **', ' <strong>');
    text = text.replaceAll('**', '</strong>');
  } catch (e) {
    return '';
  }
  
  return text;
}