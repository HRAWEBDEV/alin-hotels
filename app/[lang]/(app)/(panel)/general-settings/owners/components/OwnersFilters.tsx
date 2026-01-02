'use client';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import { type OwnerSchema } from '../schemas/ownersSchema';
import { useFormContext } from 'react-hook-form';
import { RxReload } from 'react-icons/rx';
import { Button } from '@/components/ui/button';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { FaSearch } from 'react-icons/fa';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import OwnerItem from './OwnersItem';
import { useOwnersConfigContext } from '../services/ownersConfigContext';
import LinearLoading from '../../../components/LinearLoading';

export default function OwnersFilters({ dic }: { dic: OwnersDictionary }) {
 const {
  owners: { refetchOwners, isFetching },
 } = useOwnersConfigContext();
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 const { register } = useFormContext<OwnerSchema>();
 return (
  <div className='md:sticky top-0 z-1 bg-neutral-50 dark:bg-neutral-900 pt-2 relative'>
   <div className='w-[min(35rem,100%)] mx-auto'>
    <div className='mb-4 pb-4 border-b border-input flex gap-2'>
     <InputGroup className='bg-neutral-100 dark:bg-neutral-900 grow'>
      <InputGroupAddon align='inline-start' className='text-primary'>
       <FaSearch />
      </InputGroupAddon>
      <InputGroupInput
       type='search'
       id='search'
       placeholder={navList.search + ' ...'}
       {...register('name')}
      />
     </InputGroup>
     <Button
      variant={'outline'}
      size={'icon'}
      className='h-auto text-primary border-primary'
      disabled={isFetching}
      onClick={() => refetchOwners()}
     >
      <RxReload className='size-4' />
     </Button>
     {isFetching && <LinearLoading />}
    </div>
    <OwnerItem dic={dic} owner={null} />
   </div>
  </div>
 );
}
