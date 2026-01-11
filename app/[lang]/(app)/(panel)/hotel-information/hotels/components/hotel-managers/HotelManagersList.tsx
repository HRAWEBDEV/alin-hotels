'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { useHotelManagerContext } from '../../services/hotel-managers/hotelManagerContext';
import NoItemFound from '../../../../components/NoItemFound';
import HotelManagerItem from './HotelManagerItem';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function HotelManagersList({
 dic,
 realPersonDic,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
}) {
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
      realPersonDic={realPersonDic}
      hotelManager={hotelManager}
     />
    ))
   ) : (
    <NoItemFound />
   )}
  </div>
 );
}
