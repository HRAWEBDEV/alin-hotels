'use client';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import NewPerson from './new-person/NewPerson';
import PersonsList from './persons-list/PersonsList';

export default function PersonsContent({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 const { selectedTab } = usePersonsConfigContext();

 function renderContent() {
  switch (selectedTab) {
   case 'add':
    return <NewPerson dic={dic} />;
   case 'edit':
    return <NewPerson dic={dic} />;
   default:
    return <PersonsList dic={dic} />;
  }
 }

 return (
  <main
   data-type-list={selectedTab === 'list'}
   className='pt-0 p-4 pb-2 grow flex flex-col data-[type-list="true"]:overflow-hidden'
  >
   {renderContent()}
  </main>
 );
}
