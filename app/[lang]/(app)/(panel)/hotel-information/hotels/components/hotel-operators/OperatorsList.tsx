import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import OperatorsFilters from './OperatorsFilters';
import HotelEmployeeConfigProvider from '../../services/hotel-employees/HotelEmployeeConfigProvider';
import OperatorsTable from './OperatorsTable';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function OperatorsList({
 dic,
 hotelID,
 realPersonDic,
}: {
 dic: HotelsDictionary;
 hotelID: number;
 realPersonDic: RealPersonsDictionary;
}) {
 return (
  <div className='mx-auto w-[min(100%,70rem)] relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <HotelEmployeeConfigProvider
    dic={dic}
    hotelID={hotelID}
    realPersonDic={realPersonDic}
   >
    <OperatorsFilters dic={dic} />
    <OperatorsTable dic={dic} />
   </HotelEmployeeConfigProvider>
  </div>
 );
}
