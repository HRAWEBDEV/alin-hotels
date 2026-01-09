'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsList from './hotels-list/HotelsList';
import { useHotelsConfigContext } from '../services/hotelsConfigContext';
import { Activity } from 'react';

export default function HotelsContent({ dic }: { dic: HotelsDictionary }) {
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
    <></>
    {/* <NewPerson */}
    {/*  dic={dic} */}
    {/*  onSuccess={onNewPersonSuccess} */}
    {/*  onCancel={onCancelNewPerson} */}
    {/*  initialData={initialData} */}
    {/* /> */}
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <></>
    {/* <NewPerson */}
    {/*  dic={dic} */}
    {/*  companyID={selectedPersonID} */}
    {/*  onSuccess={onNewPersonSuccess} */}
    {/*  onCancel={onCancelNewPerson} */}
    {/*  initialData={initialData} */}
    {/* /> */}
   </Activity>
  </main>
 );
}
