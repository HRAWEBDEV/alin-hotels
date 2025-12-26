import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type RealPerson } from './personsApiActions';
import { type PagedData } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

type Tab = 'list' | 'add' | 'edit';
type NewPersonModes = 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit'];

interface PersonsConfig {
 tabs: Tab[];
 selectedTab: Tab;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 changeSelectedTab: (newTab?: Tab) => unknown;
 persons: {
  data?: PagedData<RealPerson[]>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedPersonID: number | null;
  pagination: PaginationState;
  refetchPersons: () => unknown;
  onRemovePerson: (personID: number) => unknown;
  onChangePagination: Dispatch<SetStateAction<PaginationState>>;
  onChangeSelectedPersonID: (id: number | null) => unknown;
  onEditPerson: (id: number) => unknown;
  onNewPersonSuccess: (params: {
   mode: 'edit' | 'add';
   personID: number;
  }) => unknown;
 };
}

const personsConfigContext = createContext<PersonsConfig | null>(null);

function usePersonsConfigContext() {
 const val = use(personsConfigContext);
 if (!val) throw new OutOfContext('usersConfigContext');
 return val;
}

export type { PersonsConfig };
export { tabs, personsConfigContext, usePersonsConfigContext };
