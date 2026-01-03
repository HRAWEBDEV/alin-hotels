'server-only';
import { type Locale } from '@/internalization/app/localization';

type SmsPanelConfigDictionary = typeof import('./fa.json');

const dictionaries: Record<Locale, () => Promise<SmsPanelConfigDictionary>> = {
 fa: () => import('./fa.json').then((res) => res.default),
 en: () => import('./fa.json').then((res) => res.default),
};

function getSmsPanelConfigDictionary({ locale }: { locale: Locale }) {
 return dictionaries[locale]();
}

export type { SmsPanelConfigDictionary };
export { getSmsPanelConfigDictionary };
