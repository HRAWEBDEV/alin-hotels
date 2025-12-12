import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';

type Tab = 'list' | 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit'];

interface PersonsConfig {
 tabs: Tab[];
 selectedTab: Tab;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 changeSelectedTab: (newTab?: Tab) => unknown;
}

const personsConfigContext = createContext<PersonsConfig | null>(null);

function usePersonsConfigContext() {
 const val = use(personsConfigContext);
 if (!val) throw new OutOfContext('usersConfigContext');
 return val;
}

export type { PersonsConfig };
export { tabs, personsConfigContext, usePersonsConfigContext };
