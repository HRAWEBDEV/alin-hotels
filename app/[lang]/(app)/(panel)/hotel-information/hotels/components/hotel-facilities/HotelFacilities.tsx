import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelFacilityConfigProvider from '../../services/hotel-facilities/HotelFacilityConfigProvider';

export default function HotelFacilities({
 dic,
 hotelID,
}: {
 dic: HotelsDictionary;
 hotelID: number;
}) {
 // init data

 return (
  <div className='w-[min(40rem,100%)] mx-auto p-2 lg:px-4'>
   <HotelFacilityConfigProvider hotelID={hotelID} dic={dic}>
    <></>
   </HotelFacilityConfigProvider>
  </div>
 );
}
