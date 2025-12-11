import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import PersonsTabs from './PersonsTabs';
import PersonsConfigProvider from '../services/PersonsConfigProvider';

export default async function PersonsWrapper({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 return (
  <div>
   <PersonsConfigProvider>
    <PersonsTabs dic={dic} />
   </PersonsConfigProvider>
  </div>
 );
}
