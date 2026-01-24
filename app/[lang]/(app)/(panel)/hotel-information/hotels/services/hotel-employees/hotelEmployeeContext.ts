import { use, createContext } from 'react';
import { OutOfContext } from '@/utils/OutOfContext';
import { type HotelEmployee, InitialData } from './hotelEmployeesApiActions';

interface HotelEmployeeContext {
 hotelID: number;
 showFilters: boolean;
 changeShowFilters: (open?: boolean) => unknown;
 onEditPerson: (personID: number) => unknown;
 initialData: {
  data?: InitialData;
  isLoading: boolean;
 };
 hotelEmployee: {
  data?: HotelEmployee[];
  filteredData?: HotelEmployee[];
  isLoading: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => unknown;
  onEditEmployee: (employeeID: number) => unknown;
  onAddEmployee: () => unknown;
  onRemoveHotelEmployee: (hotelEmployeeID: number) => unknown;
 };
}

const hotelEmployeeContext = createContext<HotelEmployeeContext | null>(null);

function useHotelEmployeeContext() {
 const val = use(hotelEmployeeContext);
 if (!val) throw new OutOfContext('hotelEmployeeContext');
 return val;
}

export type { HotelEmployeeContext };
export { hotelEmployeeContext, useHotelEmployeeContext };
