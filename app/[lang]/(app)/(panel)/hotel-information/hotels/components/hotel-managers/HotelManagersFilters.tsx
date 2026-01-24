'use client';
import { useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { type HotelManagersSchema } from '../../schemas/hotel-managers/hotelManagersSchema';
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
import HotelManagerItem from './HotelManagerItem';
import LinearLoading from '../../../../components/LinearLoading';
import { useHotelManagerContext } from '../../services/hotel-managers/hotelManagerContext';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export default function HotelManagersFilters({
 dic,
 realPersonDic,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
}) {
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 const [showAddManager, setShowAddManager] = useState(false);
 const { register } = useFormContext<HotelManagersSchema>();
 const {
  hotelManager: { isFetching, filteredData, refetch },
 } = useHotelManagerContext();
 return (
  <div className='bg-teal-50 dark:bg-teal-900 p-3 relative mb-4 border border-teal-300 dark:border-teal-700 rounded-md overflow-hidden'>
   <div>
    <div className='mb-3 pb-3 border-b border-teal-300 dark:border-teal-700 flex gap-2'>
     <InputGroup className='grow bg-background dark:bg-background'>
      <InputGroupAddon align='inline-start' className='text-primary'>
       <FaSearch />
      </InputGroupAddon>
      <InputGroupInput
       type='search'
       id='search'
       placeholder={navList.search + ' ...'}
       {...register('name')}
      />
      <InputGroupAddon align='inline-end'>
       <div>
        <span>{dic.filters.results}: </span>
        <span>{filteredData?.length}</span>
       </div>
      </InputGroupAddon>
     </InputGroup>
     <Button
      variant={'outline'}
      size={'icon'}
      className='h-auto text-primary border-primary'
      disabled={false}
      onClick={() => refetch()}
     >
      <RxReload className='size-4' />
     </Button>
     {isFetching && <LinearLoading />}
    </div>
    {showAddManager ? (
     <HotelManagerItem
      dic={dic}
      realPersonDic={realPersonDic}
      hotelManager={null}
      onCancel={() => setShowAddManager(false)}
     />
    ) : (
     <div className='grid place-content-center'>
      <Button
       size='sm'
       className='w-32'
       onClick={() => setShowAddManager(true)}
      >
       {dic.hotelManager.form.add}
      </Button>
     </div>
    )}
   </div>
  </div>
 );
}
