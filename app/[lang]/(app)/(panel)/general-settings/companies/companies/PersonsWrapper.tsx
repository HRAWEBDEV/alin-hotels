import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import PersonsTabs from './PersonsTabs';
import PersonsConfigProvider from '../services/PersonsConfigProvider';

export default async function PersonsWrapper({
 dic,
}: {
 dic: CompaniesDictionary;
}) {
 return (
  <div>
   <PersonsConfigProvider>
    <PersonsTabs dic={dic} />
   </PersonsConfigProvider>
  </div>
 );
}
