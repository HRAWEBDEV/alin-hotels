import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import SmsConfigProvider from '../services/smsConfigProvider';
// import PersonsTabs from './PersonsTabs';
// import PersonsContent from './PersonsContent';

export default function ConfigWrapper({
 dic,
}: {
 dic: SmsPanelConfigDictionary;
}) {
 return (
  <div className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'>
   <SmsConfigProvider dic={dic}>
    <></>
    {/* <PersonsTabs dic={dic} /> */}
    {/* <PersonsContent dic={dic} /> */}
   </SmsConfigProvider>
  </div>
 );
}
