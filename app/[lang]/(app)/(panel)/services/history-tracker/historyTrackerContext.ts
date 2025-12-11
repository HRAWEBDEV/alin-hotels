import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

interface History {
 canGoBack: boolean;
 goBack: () => unknown;
}

const historyContext = createContext<History | null>(null);

function useHistoryContext() {
 const val = use(historyContext);
 if (!val) throw new OutOfContext('navigatorContext');
 return val;
}

export type { History };
export { historyContext, useHistoryContext };
