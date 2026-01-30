import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelRoomTypesFilters from './HotelRoomTypesFilters';
import HotelRoomTypesTable from './HotelRoomTypesTable';
import HotelRoomTypeConfigProvider from '../../services/hotel-room-types/HotelRoomTypeConfigProvider';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';

export default function HotelRoomTypesList({
 dic,
 hotelID,
 roomTypesDic,
}: {
 dic: HotelsDictionary;
 hotelID: number;
 roomTypesDic: RoomTypesDictionary;
}) {
 return (
  <div className='mx-auto w-[min(100%,70rem)] relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <HotelRoomTypeConfigProvider
    dic={dic}
    hotelID={hotelID}
    roomTypesDic={roomTypesDic}
   >
    <HotelRoomTypesFilters dic={dic} />
    <HotelRoomTypesTable dic={dic} />
   </HotelRoomTypeConfigProvider>
  </div>
 );
}
