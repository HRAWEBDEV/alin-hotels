import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import PersonsFitlers from './PersonsFilters';
import PersonsTable from './PersonsTable';

export default function PersonsList({ dic }: { dic: RealPersonsDictionary }) {
 return (
  <div className='grid gap-2 grid-cols-[12rem_1fr] grow'>
   <PersonsFitlers dic={dic} />
   <PersonsTable dic={dic} />
  </div>
 );
}
