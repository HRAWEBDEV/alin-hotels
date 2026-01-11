'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import {
 type Tab,
 useHotelsConfigContext,
} from '../services/hotelsConfigContext';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const staticTabs: Tab[] = [];

export default function HotelsTabs({ dic }: { dic: HotelsDictionary }) {
 const {
  selectedTab,
  selectedDetailTab,
  changeSelectedTab,
  changeSelectedDetailTab,
  hotels: { selectedHotelID },
 } = useHotelsConfigContext();
 const { localeInfo } = useBaseConfig();

 function renderDetailTab() {
  switch (selectedDetailTab) {
   case 'hotelManagers':
    return (
     <TabsTrigger
      value='hotelManagers'
      className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
      onClick={() => changeSelectedDetailTab('hotelManagers')}
     >
      <FaUserEdit />
      {dic.tabs.hotelManagers}
     </TabsTrigger>
    );

   case 'hotelOperators':
    return (
     <TabsTrigger
      value='hotelOperators'
      className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
      onClick={() => changeSelectedDetailTab('hotelOperators')}
     >
      <FaUserEdit />
      {dic.tabs.hotelOperators}
     </TabsTrigger>
    );

   case 'hotelEmployees':
    return (
     <TabsTrigger
      value='hotelEmployees'
      className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
      onClick={() => changeSelectedDetailTab('hotelEmployees')}
     >
      <FaUserEdit />
      {dic.tabs.hotelEmployees}
     </TabsTrigger>
    );

   case 'facilities':
    return (
     <TabsTrigger
      value='facilities'
      className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
      onClick={() => changeSelectedDetailTab('facilities')}
     >
      <FaUserEdit />
      {dic.tabs.hotelFacilities}
     </TabsTrigger>
    );
  }
 }

 return (
  <header className='p-1 px-0 lg:px-4 sticky top-0 z-1'>
   <Tabs
    className='items-center'
    dir={localeInfo.contentDirection}
    value={selectedTab}
   >
    <TabsList className='dark:bg-background border border-input'>
     <TabsTrigger
      value='list'
      className='sm:w-32 cursor-pointer text-sky-700 dark:text-sky-400 font-normal'
      onClick={() => changeSelectedTab('list')}
     >
      <FaClipboardList />
      {dic.tabs.hotelsList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='sm:w-32 cursor-pointer text-teal-700 dark:text-teal-400 font-normal'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addHotel}
     </TabsTrigger>
     {selectedHotelID && (
      <TabsTrigger
       value='edit'
       className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
       onClick={() => changeSelectedTab('edit')}
      >
       <FaUserEdit />
       {dic.tabs.editHotel}
      </TabsTrigger>
     )}
     {selectedHotelID && renderDetailTab()}
    </TabsList>
   </Tabs>
  </header>
 );
}
