'use client';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { useUsersConfigContext } from '../services/usersConfigContext';
import UsersList from './users-list/UsersList';
// import NewPerson from './new-person/NewPerson';
// import PersonsList from './persons-list/PersonsList';
import { Activity } from 'react';

export default function UsersContent({ dic }: { dic: UsersDictionary }) {
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
    {/*  personID={selectedPersonID} */}
    {/*  onSuccess={onNewPersonSuccess} */}
    {/*  onCancel={onCancelNewPerson} */}
    {/*  initialData={initialData} */}
    {/* /> */}
   </Activity>
  </main>
 );
}
