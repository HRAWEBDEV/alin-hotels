'use client';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { usePersonsConfigContext } from '../services/personsConfigContext';
import NewPerson from './new-person/NewPerson';

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
    return <div></div>;
  }
 }

 return <main className='pt-0 p-4'>{renderContent()}</main>;
}
