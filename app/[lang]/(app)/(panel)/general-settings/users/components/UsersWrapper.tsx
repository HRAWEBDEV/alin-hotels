import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import UsersConfigProvider from '../services/UsersConfigProvider';
import UsersTabs from './UsersTabs';
import UsersContent from './UsersContent';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default async function UsersWrapper({
 dic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: UsersDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div
   data-type={wrapperType.mode}
   className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'
  >
   <UsersConfigProvider dic={dic} {...wrapperType}>
    <UsersTabs dic={dic} />
    <UsersContent dic={dic} />
   </UsersConfigProvider>
  </div>
 );
}
