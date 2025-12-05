import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type Page } from './utils/pagesList';

interface PagesStore {
 pagesList: Readonly<Page[]>;
}

const pagesContext = createContext<PagesStore | null>(null);

function usePagesContext() {
 const val = use(pagesContext);
 if (!val) throw new OutOfContext('pagesContext');
 return val;
}

export type { PagesStore };
export { pagesContext, usePagesContext };
