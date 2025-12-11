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
      className='sm:w-32 cursor-pointer text-neutral-600'
      onClick={() => changeSelectedTab('list')}
     >
      <FaClipboardList />
      {dic.tabs.usersList}
     </TabsTrigger>
     <TabsTrigger
      value='add'
      className='sm:w-32 cursor-pointer text-neutral-600'
      onClick={() => changeSelectedTab('add')}
     >
      <IoMdPersonAdd />
      {dic.tabs.addUser}
     </TabsTrigger>
     <TabsTrigger
      value='edit'
      className='sm:w-32 cursor-pointer text-neutral-600'
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
