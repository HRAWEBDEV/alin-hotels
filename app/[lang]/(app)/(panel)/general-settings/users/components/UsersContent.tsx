'use client';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useUsersConfigContext } from '../services/usersConfigContext';
import UsersList from './users-list/UsersList';
import NewUser from './new-user/NewUser';
import { Activity } from 'react';

export default function UsersContent({
 dic,
 realPersonDic,
}: {
 dic: UsersDictionary;
 realPersonDic: RealPersonsDictionary;
}) {
 const {
  selectedTab,
  users: { selectedUserID, onNewUserSuccess, onCancelNewUser },
 } = useUsersConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <UsersList dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
    <NewUser
     dic={dic}
     realPersonDic={realPersonDic}
     onSuccess={onNewUserSuccess}
     onCancel={onCancelNewUser}
    />
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <NewUser
     dic={dic}
     userID={selectedUserID}
     realPersonDic={realPersonDic}
     onSuccess={onNewUserSuccess}
     onCancel={onCancelNewUser}
    />
   </Activity>
  </main>
 );
}
