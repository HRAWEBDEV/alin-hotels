import { useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Button } from '@/components/ui/button';
import { useHotelRoomTypeContext } from '../../services/hotel-room-types/hotelRoomTypeContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { Spinner } from '@/components/ui/spinner';
import {
 type HotelHotelRoomSchema,
 defaultValues,
} from '../../schemas/hotel-room-types/hotelRoomTypesSchema';
import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { NumericFormat } from 'react-number-format';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 roomTypesBasePath,
 getAllRoomTypes,
} from '../../../room-types/services/roomTypesApiActions';
import { useQuery } from '@tanstack/react-query';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 Command,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';

export default function HotelRoomTypesFilters({
 dic,
}: {
 dic: HotelsDictionary;
}) {
 const [showRoomTypes, setShowRoomTypes] = useState(false);
 const { localeInfo } = useBaseConfig();
 const { setValue, register, control } = useFormContext<HotelHotelRoomSchema>();
 const {
  showFilters,
  changeShowFilters,
  hotelRoomTypes: { filteredData, isLoading },
 } = useHotelRoomTypeContext();

 const { data: roomTypes, isLoading: roomTypesIsLoading } = useQuery({
  queryKey: [roomTypesBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getAllRoomTypes({ signal });
   return res.data;
  },
 });

 return (
  <div
   data-show-filters={showFilters}
   className='absolute inset-0 lg:static hidden data-[show-filters="true"]:flex bg-background border border-input rounded lg:rounded-ee-none lg:rounded-se-none lg:border-e-0 lg:flex! flex-col overflow-hidden z-4'
  >
   <div className='p-2 border-b border-input flex justify-between items-center min-h-12'>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 h-auto'
      onClick={() => {
       Object.keys(defaultValues).forEach((key) => {
        const typedKey = key as keyof HotelHotelRoomSchema;
        setValue(
         typedKey,
         defaultValues[
          typedKey
         ] as HotelHotelRoomSchema[keyof HotelHotelRoomSchema],
        );
       });
      }}
     >
      <FaRegTrashAlt className='size-4' />
     </Button>
    </div>
    <div className='flex gap-2 items-center'>
     <p className='text-base font-medium text-neutral-600 dark:text-neutral-400 grow text-center'>
      {dic.filters.title}
     </p>
     <div className='text-xs flex items-center'>
      ({dic.filters.results}:{' '}
      {isLoading ? (
       <Spinner className='text-primary' />
      ) : (
       filteredData?.length || 0
      )}
      )
     </div>
    </div>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 lg:hidden'
      onClick={() => changeShowFilters(false)}
     >
      <LiaTimesSolid className='size-5' />
     </Button>
    </div>
   </div>
   <div className='grow overflow-auto p-2 py-4'>
    <FieldGroup className='gap-5'>
     <Field className='gap-2'>
      <FieldLabel htmlFor='title'>{dic.hotelRoomTypes.form.name}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='title' type='search' {...register('name')} />
      </InputGroup>
     </Field>
     <Controller
      control={control}
      name='roomType'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='roomType'>
         {dic.hotelRoomTypes.form.roomType}
        </FieldLabel>
        <Popover open={showRoomTypes} onOpenChange={setShowRoomTypes}>
         <PopoverTrigger asChild>
          <Button
           type='button'
           id='owner'
           title={value?.value || ''}
           variant='outline'
           role='combobox'
           aria-expanded={showRoomTypes}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {roomTypesIsLoading && <Spinner />}
            {value && (
             <Button
              type='button'
              variant={'ghost'}
              size={'icon'}
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
              className='text-rose-700 dark:text-rose-400'
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-64 p-0'>
          <Command>
           <CommandInput />
           <CommandList>
            <CommandGroup>
             {roomTypes?.map((item) => (
              <CommandItem
               key={item.id}
               value={item.name}
               onSelect={() => {
                setShowRoomTypes(false);
                onChange({
                 key: item.id.toString(),
                 value: item.name,
                });
               }}
              >
               {item.name}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === item.id.toString()
                  ? 'opacity-100'
                  : 'opacity-0',
                )}
               />
              </CommandItem>
             ))}
            </CommandGroup>
           </CommandList>
          </Command>
         </PopoverContent>
        </Popover>
       </Field>
      )}
     />
     <Controller
      control={control}
      name='bedCount'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='bedCount'>
         {dic.hotelRoomTypes.form.bedCount}
        </FieldLabel>
        <InputGroup>
         <NumericFormat
          id='bedCount'
          {...other}
          value={value}
          onValueChange={({ floatValue }) =>
           onChange(floatValue || floatValue === 0 ? floatValue : '')
          }
          customInput={InputGroupInput}
         />
        </InputGroup>
       </Field>
      )}
     />
    </FieldGroup>
   </div>
  </div>
 );
}
