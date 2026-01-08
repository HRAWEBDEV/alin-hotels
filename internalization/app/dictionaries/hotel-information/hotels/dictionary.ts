'server-only';
import { type Locale } from '@/internalization/app/localization';

type HotelsDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<HotelsDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getHotelsDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { HotelsDictionary };
export { getHotelsDictionary };
