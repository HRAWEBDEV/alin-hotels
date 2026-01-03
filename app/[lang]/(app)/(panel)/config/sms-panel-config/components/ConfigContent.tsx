'use client';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { useSmsConfigContext } from '../services/smsConfigContext';
import ConfigList from './config-list/ConfigList';
// import NewPerson from './new-person/NewPerson';
// import PersonsList from './persons-list/PersonsList';
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
    <></>
    {/* <NewPerson */}
    {/*  dic={dic} */}
    {/*  onSuccess={onNewPersonSuccess} */}
    {/*  onCancel={onCancelNewPerson} */}
    {/*  initialData={initialData} */}
    {/* /> */}
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <></>
    {/* <NewPerson */}
    {/*  dic={dic} */}
    {/*  companyID={selectedPersonID} */}
    {/*  onSuccess={onNewPersonSuccess} */}
    {/*  onCancel={onCancelNewPerson} */}
    {/*  initialData={initialData} */}
    {/* /> */}
   </Activity>
  </main>
 );
}
