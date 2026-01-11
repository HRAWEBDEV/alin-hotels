import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type InitialData, type HotelManager } from './hotelManagersApiActions';

interface HotelManagerContext {
 hotelID: number;
 initialData: {
  data?: InitialData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
 hotelManager: {
  data?: HotelManager[];
  filteredData?: HotelManager[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
  onRemoveHotelManger: (hotelManagerID: number) => unknown;
 };
}

const hotelManagerContext = createContext<HotelManagerContext | null>(null);

function useHotelManagerContext() {
 const val = use(hotelManagerContext);
 if (!val) throw new OutOfContext('hotelManagerContext');
 return val;
}

export type { HotelManagerContext };
export { hotelManagerContext, useHotelManagerContext };
