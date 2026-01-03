import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type User, type GetUsersProps } from './usersApiActions';
import { type PagedData } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { type WrapperTypes } from '../utils/wrapperTypes';

type Tab = 'list' | 'add' | 'edit';
type NewUserModes = 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit'];

interface UsersConfig {
 wrapperType: WrapperTypes;
 tabs: Tab[];
 selectedTab: Tab;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 changeSelectedTab: (newTab?: Tab) => unknown;
 users: {
  queries: Omit<GetUsersProps, 'signal'>;
  data?: PagedData<User>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedUserID: number | null;
  pagination: PaginationState;
  refetchUsers: () => unknown;
  onRemoveUser: (userID: number) => unknown;
  onChangePagination: Dispatch<SetStateAction<PaginationState>>;
  onChangeSelectedUserID: (id: number | null) => unknown;
  onEditUser: (id: number) => unknown;
  onCancelNewUser: (params: {
   mode: 'edit' | 'add';
   userID: number;
  }) => unknown;
  onNewUserSuccess: (params: {
   mode: 'edit' | 'add';
   userID: number;
  }) => unknown;
 };
}

const usersConfigContext = createContext<UsersConfig | null>(null);

function useUsersConfigContext() {
 const val = use(usersConfigContext);
 if (!val) throw new OutOfContext('usersConfigContext');
 return val;
}

export type { UsersConfig, NewUserModes };
export { tabs, usersConfigContext, useUsersConfigContext };
