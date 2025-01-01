import { parse } from 'csv-parse';
import { exit } from 'process';
import 'dotenv/config';

type CSVTranslations = {
  key: string
  en: string
  es: string
  fr: string
}

type FinalTranslationsFormat = {
  [lang: string]: {
    [key: string]: any
  }
}

const spreedSheetId = process.env.I18N_TRANSLATIONS_SHEET_ID;
const fileContent = await fetch(`https://docs.google.com/spreadsheets/d/${spreedSheetId}/gviz/tq?tqx=out:csv`)
  .then((response) => {
    if (!response.ok) {
      console.error('[!] Failed to fetch translations, check if the spreadsheet ID is correct');
      exit(123);
    }
    return response;
  })
  .then((response) => response.text());
  

export const getParsedTranslations = async (): Promise<FinalTranslationsFormat> => {
  const translations: FinalTranslationsFormat = {};

  parse(fileContent, { columns: true, delimiter: ",", skip_empty_lines: true }, (err, records: CSVTranslations[]) => {
    if (err) {
      console.error(err);
      return;
    }
    
    records.forEach((record) => {
      const { key, ...translationsByLang } = record;
    
      Object.entries(translationsByLang).forEach(([lang, translation]) => {
        if (key === '') return;
        if (!translations[lang]) translations[lang] = {};

        if (key.endsWith('[]') || key.endsWith('{}')) {
          const newKey = key.slice(0, -2);

          if (translation === '') {
            translation = translations["en"][newKey];
          }

          if (key.endsWith('[]')) {
            if (!translations[lang][newKey]) translations[lang][newKey] = [];
            translations[lang][newKey].push(translation);
          } else {
            try {
              translations[lang][newKey] = JSON.parse(translation);
            } catch (e) {
              translations[lang][newKey] = translation;
            }

            delete translations[lang][key];
          }
        } else {
          translations[lang][key] = translation || translations["en"][key];
        }
      });
    });
  });

  return translations;
}