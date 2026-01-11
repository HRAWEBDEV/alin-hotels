'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsList from './hotels-list/HotelsList';
import NewHotel from './new-hotel/NewHotel';
import HotelManagers from '../components/hotel-managers/HotelManagers';
import { useHotelsConfigContext } from '../services/hotelsConfigContext';
import { Activity } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

import HotelFacilities from './hotel-facilities/HotelFacilities';

export default function HotelsContent({
 dic,
 realPersonDic,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
}) {
 const {
  selectedTab,
  initialData,
  hotels: { selectedHotelID, onNewHotelSuccess, onCancelNewHotel },
 } = useHotelsConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <HotelsList dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
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
   </Activity>
   <Activity mode={selectedTab === 'hotelFacilities' ? 'visible' : 'hidden'}>
    {selectedHotelID && <HotelFacilities dic={dic} hotelID={selectedHotelID} />}
   </Activity>
   <Activity mode={selectedTab === 'hotelManagers' ? 'visible' : 'hidden'}>
    {selectedHotelID && (
     <HotelManagers
      dic={dic}
      hotelID={selectedHotelID}
      realPersonDic={realPersonDic}
     />
    )}
   </Activity>
  </main>
 );
}
