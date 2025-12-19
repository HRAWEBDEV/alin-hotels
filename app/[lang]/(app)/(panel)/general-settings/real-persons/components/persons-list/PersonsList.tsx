import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import PersonsFitlers from './PersonsFilters';
import PersonsTable from './PersonsTable';

export default function PersonsList({ dic }: { dic: RealPersonsDictionary }) {
 return (
  <div className='relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <PersonsFitlers dic={dic} />
   <PersonsTable dic={dic} />
  </div>
 );
}
