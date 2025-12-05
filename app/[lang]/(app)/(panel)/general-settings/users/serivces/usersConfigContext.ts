import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

type Tab = 'list' | 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit'];

interface UsersConfig {
 tabs: Tab[];
 selectedTab: Tab;
 changeSelectedTab: (newTab?: Tab) => unknown;
}

const usersConfigContext = createContext<UsersConfig | null>(null);

function useUserConfigContext() {
 const val = use(usersConfigContext);
 if (!val) throw new OutOfContext('usersConfigContext');
 return val;
}

export type { UsersConfig };
export { tabs, usersConfigContext, useUserConfigContext };
