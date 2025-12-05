'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoMdPersonAdd } from 'react-icons/io';
import { FaUserEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';
import { useUserConfigContext } from '../serivces/usersConfigContext';

export default function UsersTabs({ dic }: { dic: UsersDictionary }) {
 const { selectedTab, changeSelectedTab } = useUserConfigContext();
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
      className='w-28 text-primary dark:text-primary cursor-pointer'
      onClick={() => changeSelectedTab('list')}
     >
      <FaClipboardList />
      {dic.tabs.usersList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='w-28 text-secondary dark:text-secondary cursor-pointer'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addUser}
     </TabsTrigger>
     <TabsTrigger
      value='edit'
      className='w-28 text-orange-700 dark:text-orange-400 cursor-pointer'
      onClick={() => changeSelectedTab('edit')}
     >
      <FaUserEdit />
      {dic.tabs.editUser}
     </TabsTrigger>
    </TabsList>
   </Tabs>
  </div>
 );
}
