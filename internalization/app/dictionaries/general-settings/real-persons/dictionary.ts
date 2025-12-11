'server-only';
import { type Locale } from '@/internalization/app/localization';

type RealPersonsDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<RealPersonsDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getRealPersonsDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { RealPersonsDictionary };
export { getRealPersonsDictionary };
