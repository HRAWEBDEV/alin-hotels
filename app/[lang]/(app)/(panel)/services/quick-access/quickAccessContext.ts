import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type Path, type Page } from '../../../services/pages/utils/pagesList';

interface QuickAccessItem {
 id: `${Path}-${Page['name']}`;
 path: Path;
 page: Page;
}

interface QuickAccess {
 list: QuickAccessItem[];
 pathExist: (path: QuickAccessItem['path']) => boolean;
 addItem: (
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page'],
 ) => unknown;
 isMarked: (
  path: QuickAccessItem['path'],
  page: QuickAccessItem['page']['name'],
 ) => boolean;
 removeItem: (id: QuickAccessItem['id']) => unknown;
}

const quickAccessContext = createContext<QuickAccess | null>(null);

function useQuickAccessContext() {
 const val = use(quickAccessContext);
 if (!val) throw new OutOfContext('quickAccessContext');
 return val;
}

export type { QuickAccessItem, QuickAccess };
export { quickAccessContext, useQuickAccessContext };
