'use client';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { useSmsConfigContext } from '../services/smsConfigContext';
import ConfigList from './config-list/ConfigList';
import NewConfig from './new-config/NewConfig';
import { Activity } from 'react';

export default function ConfigContent({
 dic,
}: {
 dic: SmsPanelConfigDictionary;
}) {
 const {
  selectedTab,
  initialData,
  config: { selectedConfigID, onNewConfigSuccess, onCancelNewConfig },
 } = useSmsConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <ConfigList dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
    <NewConfig
     dic={dic}
     onSuccess={onNewConfigSuccess}
     onCancel={onCancelNewConfig}
     initialData={initialData}
    />
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <NewConfig
     dic={dic}
     configID={selectedConfigID}
     onSuccess={onNewConfigSuccess}
     onCancel={onCancelNewConfig}
     initialData={initialData}
    />
   </Activity>
  </main>
 );
}
