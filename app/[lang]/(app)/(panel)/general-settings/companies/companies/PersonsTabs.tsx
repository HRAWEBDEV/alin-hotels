'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';

export default function PersonsTabs({ dic }: { dic: CompaniesDictionary }) {
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
      className='sm:w-32 cursor-pointer text-neutral-600'
      onClick={() => changeSelectedTab('list')}
     >
      <FaClipboardList />
      {dic.tabs.companiesList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='sm:w-32 cursor-pointer text-neutral-600'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addCompany}
     </TabsTrigger>
     <TabsTrigger
      value='edit'
      className='sm:w-32 cursor-pointer text-neutral-600'
      onClick={() => changeSelectedTab('edit')}
     >
      <FaUserEdit />
      {dic.tabs.editCompany}
     </TabsTrigger>
    </TabsList>
   </Tabs>
  </div>
 );
}
