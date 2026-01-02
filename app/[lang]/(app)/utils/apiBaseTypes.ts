import { type LocaleLatinName } from '@/internalization/app/localization';

type Pagination = {
 limit: number;
 offset: number;
};
type PagedData<T> = {
 rows: T[];
 rowsCount: number;
} & Pagination;

type Combo = {
 key: string;
 value: string;
};

type Dictionary = {
 id: number;
 defaultValue: string | null;
} & {
 [key in LocaleLatinName]: string | null;
};

const dictionaryDefaultValues: Dictionary = {
 id: 0,
 defaultValue: null,
 persian: null,
 english: null,
};

export type { PagedData, Pagination, Combo, Dictionary };
export { dictionaryDefaultValues };
