import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type RoomType, type GetRoomTypeProps } from './roomTypesApiActions';
import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';
import { type WrapperTypes } from '../utils/wrapperTypes';

type Tab = 'list' | 'add' | 'edit';

type NewRoomTypeModes = 'add' | 'edit';

const tabs: Tab[] = ['list', 'add', 'edit'];

interface RoomTypesConfig {
 wrapperType: WrapperTypes;
 tabs: Tab[];
 selectedTab: Tab;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 changeSelectedTab: (newTab?: Tab) => unknown;
 roomTypes: {
  queries: Omit<GetRoomTypeProps, 'signal'>;
  data?: RoomType[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  selectedRoomTypeID: number | null;
  refetchRoomTypes: () => unknown;
  onRemoveRoomType: (roomTypeID: number) => unknown;
  onChangeSelectedRoomTypeID: (id: number | null) => unknown;
  onEditRoomType: (id: number) => unknown;
  onCancelNewRoomType: (params: {
   mode: 'edit' | 'add';
   roomTypeID: number;
  }) => unknown;
  onNewRoomTypeSuccess: (params: {
   mode: 'edit' | 'add';
   roomTypeID: number;
  }) => unknown;
 };
}

const roomTypeConfigContext = createContext<RoomTypesConfig | null>(null);

function useRoomTypesConfigContext() {
 const val = use(roomTypeConfigContext);
 if (!val) throw new OutOfContext('roomTypesConfigContext');
 return val;
}

export type { Tab, RoomTypesConfig, NewRoomTypeModes };
export { tabs, roomTypeConfigContext, useRoomTypesConfigContext };
