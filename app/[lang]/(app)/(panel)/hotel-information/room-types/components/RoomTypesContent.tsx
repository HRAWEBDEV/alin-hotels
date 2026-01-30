'use client';
import RoomTypesList from './room-types-list/RoomTypesList';
// import NewHotel from './new-hotel/NewHotel';
import { useRoomTypesConfigContext } from '../services/roomTypesConfigContext';
import { Activity } from 'react';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';

export default function HotelsContent({ dic }: { dic: RoomTypesDictionary }) {
 const {
  selectedTab,
  roomTypes: { selectedRoomTypeID, onNewRoomTypeSuccess, onCancelNewRoomType },
 } = useRoomTypesConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <RoomTypesList dic={dic} />
   </Activity>
   {/*<Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
    <NewHotel
     dic={dic}
     onSuccess={onNewHotelSuccess}
     onCancel={onCancelNewHotel}
     initialData={initialData}
    />
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <NewHotel
     dic={dic}
     hotelID={selectedHotelID}
     onSuccess={onNewHotelSuccess}
     onCancel={onCancelNewHotel}
     initialData={initialData}
    />
   </Activity>*/}
  </main>
 );
}
