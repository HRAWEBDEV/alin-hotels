import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type SmsConfig,
 type InitialData,
 type GetSmsConfigProps,
} from './smsPanelApiActions';

type Tab = 'list' | 'add' | 'edit';
type NewConfigModes = 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit'];

interface SmsConfigContext {
 tabs: Tab[];
 selectedTab: Tab;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 changeSelectedTab: (newTab?: Tab) => unknown;
 initialData: {
  data?: InitialData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
 config: {
  queries: Omit<GetSmsConfigProps, 'signal'>;
  data?: SmsConfig[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedConfigID: number | null;
  refetchConfig: () => unknown;
  onRemoveConfig: (personID: number) => unknown;
  onChangeSelectedConfigID: (id: number | null) => unknown;
  onEditConfig: (id: number) => unknown;
  onCancelNewConfig: (params: {
   mode: 'edit' | 'add';
   configID: number;
  }) => unknown;
  onNewConfigSuccess: (params: {
   mode: 'edit' | 'add';
   configID: number;
  }) => unknown;
 };
}

const smsConfigContext = createContext<SmsConfigContext | null>(null);

function useSmsConfigContext() {
 const val = use(smsConfigContext);
 if (!val) throw new OutOfContext('smsConfigContext');
 return val;
}

export type { SmsConfigContext, NewConfigModes };
export { tabs, smsConfigContext, useSmsConfigContext };
