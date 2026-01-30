import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type HotelRoomType } from './hotelRoomTypesApiActions';

interface HotelRoomTypeContext {
 hotelID: number;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 hotelRoomTypes: {
  data?: HotelRoomType[];
  filteredData?: HotelRoomType[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
  onEditRoomType: (roomTypeID: number) => unknown;
  onAddRoomType: () => unknown;
  onRemoveHotelRoomType: (hotelRoomTypeID: number) => unknown;
 };
}

const hotelRoomTypeContext = createContext<HotelRoomTypeContext | null>(null);

function useHotelRoomTypeContext() {
 const val = use(hotelRoomTypeContext);
 if (!val) throw new OutOfContext('hotelRoomTypeContext');
 return val;
}

export type { HotelRoomTypeContext };
export { hotelRoomTypeContext, useHotelRoomTypeContext };
