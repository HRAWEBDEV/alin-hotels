import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import PersonsTabs from './PersonsTabs';
import PersonsConfigProvider from '../services/PersonsConfigProvider';
import PersonsContent from './PersonsContent';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default function PersonsWrapper({
 dic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: CompaniesDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div
   data-type={wrapperType.mode}
   className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'
  >
   <PersonsConfigProvider dic={dic} {...wrapperType}>
    <PersonsTabs dic={dic} />
    <PersonsContent dic={dic} />
   </PersonsConfigProvider>
  </div>
 );
}
