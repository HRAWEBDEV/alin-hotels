import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import OperatorsFilters from './OperatorsFilters';
import HotelOperatorConfigProvider from '../../services/hotel-operators/HotelOperatorConfigProvider';
import OperatorsTable from './OperatorsTable';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';

export default function OperatorsList({
 dic,
 hotelID,
 realPersonDic,
 companyDic,
}: {
 dic: HotelsDictionary;
 hotelID: number;
 realPersonDic: RealPersonsDictionary;
 companyDic: CompaniesDictionary;
}) {
 return (
  <div className='mx-auto w-[min(100%,70rem)] relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <HotelOperatorConfigProvider
    dic={dic}
    hotelID={hotelID}
    realPersonDic={realPersonDic}
    companyDic={companyDic}
   >
    <OperatorsFilters dic={dic} />
    <OperatorsTable dic={dic} />
   </HotelOperatorConfigProvider>
  </div>
 );
}
