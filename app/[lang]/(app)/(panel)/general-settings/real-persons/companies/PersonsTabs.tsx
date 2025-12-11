'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function PersonsTabs({ dic }: { dic: RealPersonsDictionary }) {
 const { selectedTab, changeSelectedTab } = usePersonsConfigContext();
 const { localeInfo } = useBaseConfig();
 return (
  <div className='p-2'>
   <Tabs
    className='items-center'
    dir={localeInfo.contentDirection}
    value={selectedTab}
   >
    <TabsList className='dark:bg-background'>
     <TabsTrigger
      value='list'
      className='w-28 cursor-pointer'
      onClick={() => changeSelectedTab('list')}
     >
      <FaClipboardList />
      {dic.tabs.personsList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='w-28 cursor-pointer'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addPerson}
     </TabsTrigger>
     <TabsTrigger
      value='edit'
      className='w-28 cursor-pointer'
      onClick={() => changeSelectedTab('edit')}
     >
      <FaUserEdit />
      {dic.tabs.editPerson}
     </TabsTrigger>
    </TabsList>
   </Tabs>
  </div>
 );
}
