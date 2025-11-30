import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

interface Navigation {
 isOpen: boolean;
 toggle: (open?: boolean) => unknown;
}

const navigationContext = createContext<null | Navigation>(null);

function useNavigationContext() {
 const val = use(navigationContext);
 if (!val) throw new OutOfContext('navigationContext');
 return val;
}

export type { Navigation };
export { navigationContext, useNavigationContext };
