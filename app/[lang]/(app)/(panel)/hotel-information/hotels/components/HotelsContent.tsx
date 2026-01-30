'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsList from './hotels-list/HotelsList';
import NewHotel from './new-hotel/NewHotel';
import HotelManagers from '../components/hotel-managers/HotelManagers';
import EmployeesList from './hotel-employees/EmployeesList';
import OperatorsList from './hotel-operators/OperatorsList';
import HotelRoomTypesList from './hotel-room-types/HotelRoomTypesList';
import { useHotelsConfigContext } from '../services/hotelsConfigContext';
import { Activity } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import HotelFacilities from './hotel-facilities/HotelFacilities';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';

export default function HotelsContent({
 dic,
 realPersonDic,
 companyDic,
 roomTypesDic,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
 companyDic: CompaniesDictionary;
 roomTypesDic: RoomTypesDictionary;
}) {
 const {
  selectedTab,
  initialData,
  hotels: { selectedHotelID, onNewHotelSuccess, onCancelNewHotel },
 } = useHotelsConfigContext();

 return (
  <main
   data-type-list={
    selectedTab === 'list' ||
    selectedTab === 'hotelEmployees' ||
    selectedTab === 'hotelOperators'
   }
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
   <Activity mode={selectedTab === 'hotelEmployees' ? 'visible' : 'hidden'}>
    {selectedHotelID && (
     <EmployeesList
      dic={dic}
      hotelID={selectedHotelID}
      realPersonDic={realPersonDic}
     />
    )}
   </Activity>
   <Activity mode={selectedTab === 'hotelOperators' ? 'visible' : 'hidden'}>
    {selectedHotelID && (
     <OperatorsList
      dic={dic}
      hotelID={selectedHotelID}
      realPersonDic={realPersonDic}
      companyDic={companyDic}
     />
    )}
   </Activity>
   <Activity mode={selectedTab === 'hotelRoomTypes' ? 'visible' : 'hidden'}>
    {selectedHotelID && (
     <HotelRoomTypesList
      dic={dic}
      hotelID={selectedHotelID}
      roomTypesDic={roomTypesDic}
     />
    )}
   </Activity>
  </main>
 );
}
