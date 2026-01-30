import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

interface LogoutContext {
 open: boolean;
 onOpen: (open?: boolean) => unknown;
}

const logoutContext = createContext<LogoutContext | null>(null);

function useLogoutContext() {
 const val = use(logoutContext);
 if (!val) throw new OutOfContext('logoutContext');
 return val;
}

export type { LogoutContext };
export { logoutContext, useLogoutContext };
