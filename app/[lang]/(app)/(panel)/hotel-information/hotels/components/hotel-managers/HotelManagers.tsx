import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelManagerConfigProvider from '../../services/hotel-managers/HotelManagerConfigProvider';
import HotelManagersList from './HotelManagersList';
import HotelManagersFilters from './HotelManagersFilters';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function HotelManagers({
 dic,
 hotelID,
 realPersonDic,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
 hotelID: number;
}) {
 // init data

 return (
  <div className='w-[min(40rem,100%)] mx-auto p-2 lg:px-4'>
   <HotelManagerConfigProvider hotelID={hotelID} dic={dic}>
    <HotelManagersFilters dic={dic} realPersonDic={realPersonDic} />
    <HotelManagersList dic={dic} realPersonDic={realPersonDic} />
   </HotelManagerConfigProvider>
  </div>
 );
}
