import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import EmployeesFilters from './EmployeesFilters';
import HotelEmployeeConfigProvider from '../../services/hotel-employees/HotelEmployeeConfigProvider';
import EmployeesTable from './EmployeesTable';

export default function EmployeesList({
 dic,
 hotelID,
}: {
 dic: HotelsDictionary;
 hotelID: number;
}) {
 return (
  <div className='mx-auto w-[min(100%,70rem)] relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <HotelEmployeeConfigProvider dic={dic} hotelID={hotelID}>
    <EmployeesFilters dic={dic} />
    <EmployeesTable dic={dic} />
   </HotelEmployeeConfigProvider>
  </div>
 );
}
