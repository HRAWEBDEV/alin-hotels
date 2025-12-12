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
      {dic.tabs.companiesList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='sm:w-32 cursor-pointer text-teal-700 dark:text-teal-400 font-normal'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addCompany}
     </TabsTrigger>
     <TabsTrigger
      value='edit'
      className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
      onClick={() => changeSelectedTab('edit')}
     >
      <FaUserEdit />
      {dic.tabs.editCompany}
     </TabsTrigger>
    </TabsList>
   </Tabs>
  </header>
 );
}
