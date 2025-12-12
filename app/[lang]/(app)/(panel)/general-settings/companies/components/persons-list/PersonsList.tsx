import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import PersonsFitlers from './PersonsFilters';
import PersonsTable from './PersonsTable';

export default function PersonsList({ dic }: { dic: CompaniesDictionary }) {
 return (
  <div className='relative grid gap-2 lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <PersonsFitlers dic={dic} />
   <PersonsTable dic={dic} />
  </div>
 );
}
