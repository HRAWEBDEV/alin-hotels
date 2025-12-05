import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import UsersTabs from './UsersTabs';
import UsersConfigProvider from '../serivces/UsersConfigProvider';

export default async function UsersWrapper({ dic }: { dic: UsersDictionary }) {
 return (
  <div>
   <UsersConfigProvider>
    <UsersTabs dic={dic} />
   </UsersConfigProvider>
  </div>
 );
}
