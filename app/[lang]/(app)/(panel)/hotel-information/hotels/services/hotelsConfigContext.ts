import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type Hotel,
 type InitialData,
 type GetHotelProps,
} from './hotelsApiActions';
import { type PagedData } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { type WrapperTypes } from '../utils/wrapperTypes';

type Tab = 'list' | 'add' | 'edit' | 'facilities';
type NewHotelModes = 'add' | 'edit';
const tabs: Tab[] = ['list', 'add', 'edit', 'facilities'];

interface HotelsConfig {
 wrapperType: WrapperTypes;
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
 hotels: {
  queries: Omit<GetHotelProps, 'signal'>;
  data?: PagedData<Hotel>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedHotelID: number | null;
  pagination: PaginationState;
  refetchHotels: () => unknown;
  onRemoveHotel: (newHotelID: number) => unknown;
  onChangePagination: Dispatch<SetStateAction<PaginationState>>;
  onChangeSelectedHotelID: (id: number | null) => unknown;
  onEditHotel: (id: number) => unknown;
  onCancelNewHotel: (params: {
   mode: 'edit' | 'add';
   hotelID: number;
  }) => unknown;
  onNewHotelSuccess: (params: {
   mode: 'edit' | 'add';
   hotelID: number;
  }) => unknown;
 };
}

const hotelsConfigContext = createContext<HotelsConfig | null>(null);

function useHotelsConfigContext() {
 const val = use(hotelsConfigContext);
 if (!val) throw new OutOfContext('hotelsConfigContext');
 return val;
}

export type { HotelsConfig, NewHotelModes };
export { tabs, hotelsConfigContext, useHotelsConfigContext };
