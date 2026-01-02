'use client';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import OwnersItem from './OwnersItem';
import { useOwnersConfigContext } from '../services/ownersConfigContext';
import NoItemFound from '../../../components/NoItemFound';

export default function OwnersList({ dic }: { dic: OwnersDictionary }) {
 const {
  owners: { data },
 } = useOwnersConfigContext();
 return (
  <div className='w-[min(35rem,100%)] mx-auto relative'>
   {data && data.length ? (
    data.map((owner) => <OwnersItem key={owner.id} dic={dic} owner={owner} />)
   ) : (
    <NoItemFound />
   )}
  </div>
 );
}
