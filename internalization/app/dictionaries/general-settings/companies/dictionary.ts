'server-only';
import { type Locale } from '@/internalization/app/localization';

type CompaniesDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<CompaniesDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getCompaniesDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { CompaniesDictionary };
export { getCompaniesDictionary };
