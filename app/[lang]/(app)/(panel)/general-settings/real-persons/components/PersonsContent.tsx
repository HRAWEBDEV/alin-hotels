'use client';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import NewPerson from './new-person/NewPerson';
import PersonsList from './persons-list/PersonsList';
import { Activity } from 'react';

export default function PersonsContent({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 const { selectedTab } = usePersonsConfigContext();

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-2 lg:px-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   <Activity mode={selectedTab === 'list' ? 'visible' : 'hidden'}>
    <PersonsList dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'add' ? 'visible' : 'hidden'}>
    <NewPerson dic={dic} />
   </Activity>
   <Activity mode={selectedTab === 'edit' ? 'visible' : 'hidden'}>
    <NewPerson dic={dic} />
   </Activity>
  </main>
 );
}
