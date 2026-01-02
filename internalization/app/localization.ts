import * as dateFns from 'date-fns';
import * as dateFnsJalali from 'date-fns-jalali';

type ContentDirection = 'rtl' | 'ltr';
type Calendar = 'jalali' | 'gregorian';
type Locale = 'fa' | 'en';
type LocaleLatinName = 'persian' | 'english';

interface LocaleInfo {
 latinName: LocaleLatinName;
 locale: Locale;
 extension: string;
 contentDirection: ContentDirection;
 calendar: Calendar;
 localeName: string;
 localeShortName: string;
 active: boolean;
}

const locales: Record<Locale, LocaleInfo> = {
 fa: {
  latinName: 'persian',
  locale: 'fa',
  extension: 'IR',
  contentDirection: 'rtl',
  calendar: 'jalali',
  localeName: 'فارسی',
  localeShortName: 'فا',
  active: true,
 },
 en: {
  latinName: 'english',
  locale: 'en',
  extension: 'US',
  contentDirection: 'ltr',
  calendar: 'gregorian',
  localeName: 'english',
  localeShortName: 'EN',
  active: false,
 },
} as const;

function getLocalInfo(locale: Locale): LocaleInfo {
 if (locale in locales) return locales[locale];
 return locales['en'];
}

const localesList = Object.keys(locales);

const supportedDateFns = {
 fa: dateFnsJalali,
 en: dateFns,
};

export type { ContentDirection, Calendar, Locale, LocaleInfo, LocaleLatinName };
export { locales, getLocalInfo, localesList, supportedDateFns };
