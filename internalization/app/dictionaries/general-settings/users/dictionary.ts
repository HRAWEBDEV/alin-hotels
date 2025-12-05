'server-only';
import { type Locale } from '@/internalization/app/localization';

type UsersDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<UsersDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getUsersDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { UsersDictionary };
export { getUsersDictionary };
