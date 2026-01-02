'use client';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import OwnersItem from './OwnersItem';
import { useOwnersConfigContext } from '../services/ownersConfigContext';
import NoItemFound from '../../../components/NoItemFound';

export default function OwnersList({ dic }: { dic: OwnersDictionary }) {
 const {
  owners: {
   queries: { name },
   data,
  },
 } = useOwnersConfigContext();
 const filteredData =
  data && data.length && name
   ? data.filter((item) => item.name.includes(name))
   : data;
 return (
  <div className='w-[min(35rem,100%)] mx-auto relative'>
   {filteredData && filteredData.length ? (
    filteredData.map((owner) => (
     <OwnersItem key={owner.id} dic={dic} owner={owner} />
    ))
   ) : (
    <NoItemFound />
   )}
  </div>
 );
}
