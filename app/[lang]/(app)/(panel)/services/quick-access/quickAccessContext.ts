import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

interface QuickAccess {
 isOpen: boolean;
 toggle: (open?: boolean) => unknown;
}

const quickAccessContext = createContext<null | QuickAccess>(null);

function useQuickAccessContext() {
 const val = use(quickAccessContext);
 if (!val) throw new OutOfContext('settingContext');
 return val;
}

export type { QuickAccess };
export { quickAccessContext, useQuickAccessContext };
