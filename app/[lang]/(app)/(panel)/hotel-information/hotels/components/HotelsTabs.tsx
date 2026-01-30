'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { useHotelsConfigContext } from '../services/hotelsConfigContext';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { FaUserFriends, FaTools, FaBed } from 'react-icons/fa';
import { IoMdBusiness, IoIosPerson } from 'react-icons/io';

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
  let detailIcon = <FaUserEdit />;

  switch (selectedDetailTab) {
   case 'hotelFacilities':
    detailIcon = <FaTools />;
    break;
   case 'hotelEmployees':
    detailIcon = <FaUserFriends />;
    break;
   case 'hotelManagers':
    detailIcon = <IoIosPerson />;
    break;
   case 'hotelOperators':
    detailIcon = <IoMdBusiness />;
    break;
   case 'hotelRoomTypes':
    detailIcon = <FaBed />;
    break;
  }

  return (
   <TabsTrigger
    value={selectedDetailTab}
    className='sm:w-32 cursor-pointer text-purple-700 dark:text-purple-400 font-normal'
    onClick={() => changeSelectedDetailTab(selectedDetailTab)}
   >
    {detailIcon}
    {dic.tabs[selectedDetailTab]}
   </TabsTrigger>
  );
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
