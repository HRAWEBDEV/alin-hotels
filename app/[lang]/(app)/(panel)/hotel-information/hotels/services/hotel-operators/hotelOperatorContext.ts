import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type HotelOperator } from './hotelOperatorsApiActions';

interface HotelOperatorContext {
 hotelID: number;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 onEditPerson: (params: {
  personID: number | null;
  companyID: number | null;
 }) => unknown;
 hotelOperator: {
  data?: HotelOperator[];
  filteredData?: HotelOperator[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
  onEditOperator: (operatorID: number) => unknown;
  onAddOperator: () => unknown;
  onRemoveHotelOperator: (hotelOperatorID: number) => unknown;
 };
}

const hotelOperatorContext = createContext<HotelOperatorContext | null>(null);

function useHotelOperatorContext() {
 const val = use(hotelOperatorContext);
 if (!val) throw new OutOfContext('hotelOperatorContext');
 return val;
}

export type { HotelOperatorContext };
export { hotelOperatorContext, useHotelOperatorContext };
