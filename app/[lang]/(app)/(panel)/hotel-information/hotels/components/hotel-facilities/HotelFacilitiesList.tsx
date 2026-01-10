'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { useHotelFacilityContext } from '../../services/hotel-facilities/hotelFacilityContext';
import NoItemFound from '../../../../components/NoItemFound';

export default function HotelFacilitiesList({
 dic,
}: {
 dic: HotelsDictionary;
}) {
 const {
  facilities: { filteredData },
 } = useHotelFacilityContext();
 return (
  <div className='relative'>
   {filteredData && filteredData.length ? (
    filteredData.map((facility) => <></>)
   ) : (
    <NoItemFound />
   )}
  </div>
 );
}
