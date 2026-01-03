'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { useSmsConfigContext } from '../services/smsConfigContext';

export default function ConfigTabs({ dic }: { dic: SmsPanelConfigDictionary }) {
 const {
  selectedTab,
  changeSelectedTab,
  config: { selectedConfigID },
 } = useSmsConfigContext();
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
      {dic.tabs.configList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='sm:w-32 cursor-pointer text-teal-700 dark:text-teal-400 font-normal'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addConfig}
     </TabsTrigger>
     {selectedConfigID && (
      <TabsTrigger
       value='edit'
       className='sm:w-32 cursor-pointer text-orange-700 dark:text-orange-400 font-normal'
       onClick={() => changeSelectedTab('edit')}
      >
       <FaUserEdit />
       {dic.tabs.editConfig}
      </TabsTrigger>
     )}
    </TabsList>
   </Tabs>
  </header>
 );
}
