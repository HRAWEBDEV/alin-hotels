import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import SmsConfigProvider from '../services/smsConfigProvider';
import ConfigTabs from './ConfigTabs';
import ConfigContent from './ConfigContent';

export default function ConfigWrapper({
 dic,
}: {
 dic: SmsPanelConfigDictionary;
}) {
 return (
  <div className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'>
   <SmsConfigProvider dic={dic}>
    <ConfigTabs dic={dic} />
    <ConfigContent dic={dic} />
   </SmsConfigProvider>
  </div>
 );
}
