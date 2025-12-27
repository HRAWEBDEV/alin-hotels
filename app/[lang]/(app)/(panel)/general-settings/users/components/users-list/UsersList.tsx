import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import UsersTable from './UsersTable';
import UsersFitlers from './UsersFilters';

export default function UsersList({ dic }: { dic: UsersDictionary }) {
 return (
  <div className='relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <UsersFitlers dic={dic} />
   <UsersTable dic={dic} />
  </div>
 );
}
