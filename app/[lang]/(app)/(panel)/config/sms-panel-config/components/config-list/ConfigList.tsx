import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import ConfigFilters from './ConfigFilters';
import PersonsTable from './ConfigTable';

export default function ConfigList({ dic }: { dic: SmsPanelConfigDictionary }) {
 return (
  <div className='relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <ConfigFilters dic={dic} />
   {/* <PersonsTable dic={dic} /> */}
  </div>
 );
}
