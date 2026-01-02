'use client';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import NewPerson from './new-person/NewPerson';
import PersonsList from './persons-list/PersonsList';
import { Activity } from 'react';

export default function PersonsContent({ dic }: { dic: CompaniesDictionary }) {
 const {
  selectedTab,
  initialData,
  persons: { selectedPersonID, onNewPersonSuccess, onCancelNewPerson },
 } = usePersonsConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <PersonsList dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
    <NewPerson
     dic={dic}
     onSuccess={onNewPersonSuccess}
     onCancel={onCancelNewPerson}
     initialData={initialData}
    />
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <NewPerson
     dic={dic}
     companyID={selectedPersonID}
     onSuccess={onNewPersonSuccess}
     onCancel={onCancelNewPerson}
     initialData={initialData}
    />
   </Activity>
  </main>
 );
}
