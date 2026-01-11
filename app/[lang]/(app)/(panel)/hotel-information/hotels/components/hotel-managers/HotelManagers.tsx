import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelManagerConfigProvider from '../../services/hotel-managers/HotelManagerConfigProvider';

export default function HotelManagers({
 dic,
 hotelID,
}: {
 dic: HotelsDictionary;
 hotelID: number;
}) {
 // init data

 return (
  <div className='w-[min(40rem,100%)] mx-auto p-2 lg:px-4'>
   <HotelManagerConfigProvider hotelID={hotelID} dic={dic}>
    <></>
    {/* <HotelFacilitiesFilters dic={dic} /> */}
    {/* <HotelFacilitiesList dic={dic} /> */}
   </HotelManagerConfigProvider>
  </div>
 );
}
