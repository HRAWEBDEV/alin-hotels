'server-only';
import { type Locale } from '@/internalization/app/localization';

type RoomTypesDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<RoomTypesDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getRoomTypesDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { RoomTypesDictionary };
export { getRoomTypesDictionary };
