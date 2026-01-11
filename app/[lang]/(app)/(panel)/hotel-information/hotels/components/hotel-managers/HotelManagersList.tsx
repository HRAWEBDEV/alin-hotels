'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { useHotelManagerContext } from '../../services/hotel-managers/hotelManagerContext';
import NoItemFound from '../../../../components/NoItemFound';
import HotelManagerItem from './HotelManagerItem';

export default function HotelManagersList({ dic }: { dic: HotelsDictionary }) {
 const {
  hotelManager: { filteredData },
 } = useHotelManagerContext();
 return (
  <div className='relative'>
   {filteredData && filteredData.length ? (
    filteredData.map((hotelManager) => (
     <HotelManagerItem
      key={hotelManager.id}
      dic={dic}
      hotelManager={hotelManager}
     />
    ))
   ) : (
    <NoItemFound />
   )}
  </div>
 );
}
