import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import {
 type InitialData,
 type HotelFacility,
} from './hotelFacilityApiActions';

interface HotelFacilityContext {
 hotelID: number;
 initialData: {
  data?: InitialData;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
 };
 facilities: {
  data?: HotelFacility[];
  filteredData?: HotelFacility[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
  onRemoveFacility: (facilityID: number) => unknown;
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
