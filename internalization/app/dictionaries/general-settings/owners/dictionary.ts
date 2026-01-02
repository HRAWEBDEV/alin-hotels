'server-only';
import { type Locale } from '@/internalization/app/localization';

type OwnersDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<OwnersDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getOwnersDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { OwnersDictionary };
export { getOwnersDictionary };
