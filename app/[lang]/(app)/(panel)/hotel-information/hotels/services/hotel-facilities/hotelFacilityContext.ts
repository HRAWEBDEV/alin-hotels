import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type InitialData } from './hotelFacilityApiActions';

interface HotelFacilityContext {
 hotelID: number;
 initialData: {
  data?: InitialData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
}

const hotelFacilityContext = createContext<HotelFacilityContext | null>(null);

function useHotelFacilityContext() {
 const val = use(hotelFacilityContext);
 if (!val) throw new OutOfContext('hotelFacilityContext');
 return val;
}

export type { HotelFacilityContext };
export { hotelFacilityContext, useHotelFacilityContext };
