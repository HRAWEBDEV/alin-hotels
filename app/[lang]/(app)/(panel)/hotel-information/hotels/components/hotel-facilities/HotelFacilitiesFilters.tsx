'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { type HotelFacilitiesSchema } from '../../schemas/hotel-facilities/hotelFacilitiesSchema';
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
import HotelFacilitiesItem from './HotelFacilitiesItem';
import LinearLoading from '../../../../components/LinearLoading';
import { useHotelFacilityContext } from '../../services/hotel-facilities/hotelFacilityContext';

export default function HotelFacilitiesFilters({
 dic,
}: {
 dic: HotelsDictionary;
}) {
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 const { register } = useFormContext<HotelFacilitiesSchema>();
 const {
  facilities: { isFetching, refetch },
 } = useHotelFacilityContext();
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
        <span>{0}</span>
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
    <HotelFacilitiesItem dic={dic} facility={null} />
   </div>
  </div>
 );
}
