import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type Path, type Page } from '../../../services/pages/utils/pagesList';

interface QuickAccessItem {
 id: number;
 path: Path;
 page: Page;
}

interface QuickAccess {
 list: QuickAccessItem[];
 addItem: (
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page'],
 ) => unknown;
 removeItem: (id: number) => unknown;
}

const quickAccessContext = createContext<QuickAccess | null>(null);

function useQuickAccessContext() {
 const val = use(quickAccessContext);
 if (!val) throw new OutOfContext('quickAccessContext');
 return val;
}

export type { QuickAccessItem, QuickAccess };
export { quickAccessContext, useQuickAccessContext };
