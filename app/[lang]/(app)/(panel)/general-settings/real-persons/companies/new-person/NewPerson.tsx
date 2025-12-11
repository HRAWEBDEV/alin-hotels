'use client';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function NewPerson({ dic }: { dic: RealPersonsDictionary }) {
 return (
  <form className='bg-background p-4 border border-input rounded w-[min(35rem,100%)] mx-auto'>
   new person
  </form>
 );
}
