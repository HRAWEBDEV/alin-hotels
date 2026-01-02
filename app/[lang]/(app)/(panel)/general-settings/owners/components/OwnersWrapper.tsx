import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import OwnersConfigProvider from '../services/OwnersConfigProvider';
import OwnersFilters from './OwnersFilters';
import OwnersList from './OwnersList';

export default function OwnersWrapper({ dic }: { dic: OwnersDictionary }) {
 return (
  <OwnersConfigProvider dic={dic}>
   <div className='p-2 lg:px-4'>
    <OwnersFilters dic={dic} />
    <OwnersList dic={dic} />
   </div>
  </OwnersConfigProvider>
 );
}
