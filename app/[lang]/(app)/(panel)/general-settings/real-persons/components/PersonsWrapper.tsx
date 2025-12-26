import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import PersonsTabs from './PersonsTabs';
import PersonsConfigProvider from '../services/PersonsConfigProvider';
import PersonsContent from './PersonsContent';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default async function PersonsWrapper({
 dic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: RealPersonsDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div className='h-full flex flex-col'>
   <PersonsConfigProvider dic={dic} {...wrapperType}>
    <PersonsTabs dic={dic} />
    <PersonsContent dic={dic} />
   </PersonsConfigProvider>
  </div>
 );
}
