import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import PersonsTabs from './PersonsTabs';
import PersonsConfigProvider from '../services/PersonsConfigProvider';
import PersonsContent from './PersonsContent';

export default async function PersonsWrapper({
 dic,
}: {
 dic: CompaniesDictionary;
}) {
 return (
  <div className='h-full flex flex-col'>
   <PersonsConfigProvider>
    <PersonsTabs dic={dic} />
    <PersonsContent dic={dic} />
   </PersonsConfigProvider>
  </div>
 );
}
