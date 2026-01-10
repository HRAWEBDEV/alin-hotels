'use client';
import { useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
import {
 type HotelFacilitiesSchema,
 defaultValues,
 createHotelFacilitiesSchema,
} from '../../schemas/hotel-facilities/hotelFacilitiesSchema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
 type HotelFacility,
 type SaveHotelFacilityPackage,
 hotelFacilitiesBasePath,
 saveHotelFacility,
 updateHotelFacility,
} from '../../services/hotel-facilities/hotelFacilityApiActions';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useHotelFacilityContext } from '../../services/hotel-facilities/hotelFacilityContext';
import { IoTrashOutline } from 'react-icons/io5';
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
import { NumericFormat } from 'react-number-format';

export default function HotelFacilitiesItem({
 dic,
 facility,
}: {
 dic: HotelsDictionary;
 facility: HotelFacility | null;
}) {
 const [openFacilities, setOpenFacilities] = useState(false);

 const {
  initialData: { data: facilities, isLoading },
  facilities: { onRemoveFacility },
 } = useHotelFacilityContext();
 const queryClient = useQueryClient();
 const { localeInfo } = useBaseConfig();
 const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  formState: { errors },
  watch,
 } = useForm<HotelFacilitiesSchema>({
  resolver: zodResolver(createHotelFacilitiesSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });

 const { mutate, isPending } = useMutation({
  mutationFn({}: HotelFacilitiesSchema) {
   // const saveOwnerPackage: SaveHotelFacilityPackage = {};
   // return facility
   //  ? updateHotelFacility()
   //  : saveHotelFacility();
   return Promise.resolve(true);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelFacilitiesBasePath, 'all'],
   });
   if (facility) {
   } else {
    reset();
   }
  },
  onError(err: AxiosError<string>) {
   if (facility) {
   }
   toast.error(err.response?.data);
  },
 });

 return (
  <form
   data-add-edit={!!facility?.id}
   className='group grid grid-cols-1 data-[add-edit="true"]:mb-4'
  >
   <div>
    <div className='gap-y-5 gap-3 grid grid-cols-2 mb-2'>
     <Controller
      control={control}
      name='facility'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='facility'>
         {dic.hotelFacility.form.facility}
        </FieldLabel>
        <Popover open={openFacilities} onOpenChange={setOpenFacilities}>
         <PopoverTrigger asChild>
          <Button
           id='facility'
           variant='outline'
           role='combobox'
           aria-expanded={openFacilities}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {isLoading && <Spinner />}
            {value && (
             <Button
              variant={'ghost'}
              size={'icon'}
              className='text-rose-700 dark:text-rose-400'
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput />
           <CommandList>
            <CommandGroup>
             {facilities?.facilities?.map((item) => (
              <CommandItem
               key={item.key}
               value={item.value}
               onSelect={() => {
                setOpenFacilities(false);
                onChange(item);
               }}
              >
               {item.value}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === item.key ? 'opacity-100' : 'opacity-0',
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
      name='quantity'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='quantity'>
         {dic.hotelFacility.form.quantity}
        </FieldLabel>
        <InputGroup className='bg-background'>
         <NumericFormat
          id='quantity'
          {...other}
          value={value}
          onValueChange={({ floatValue }) => onChange(floatValue || '')}
          customInput={InputGroupInput}
         />
        </InputGroup>
       </Field>
      )}
     />
     <Controller
      control={control}
      name='capacity'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='capacity'>
         {dic.hotelFacility.form.capacity}
        </FieldLabel>
        <InputGroup className='bg-background'>
         <NumericFormat
          id='capacity'
          {...other}
          value={value}
          onValueChange={({ floatValue }) => onChange(floatValue || '')}
          customInput={InputGroupInput}
         />
        </InputGroup>
       </Field>
      )}
     />
     <Field className='gap-2'>
      <FieldLabel htmlFor='scale'>{dic.hotelFacility.form.scale}</FieldLabel>
      <InputGroup className='bg-background'>
       <InputGroupInput id='scale' {...register('scale')} />
      </InputGroup>
     </Field>
     <Field className='gap-2 col-span-2'>
      <FieldLabel htmlFor='comment'>
       {dic.hotelFacility.form.comment}
      </FieldLabel>
      <InputGroup className='bg-background'>
       <InputGroupTextarea id='comment' {...register('comment')} />
      </InputGroup>
     </Field>
    </div>
    <div className='flex justify-end gap-2'>
     <Button
      type='submit'
      variant={facility ? 'secondary' : 'default'}
      className='md:w-20'
      disabled={isPending}
      onClick={(e) => {
       e.preventDefault();
       handleSubmit((data) => {
        // mutate(data);
       })();
      }}
     >
      {isPending && <Spinner />}
      {facility ? dic.hotelFacility.form.update : dic.hotelFacility.form.save}
     </Button>
     {facility && (
      <>
       <Button
        type='button'
        variant='outline'
        className='md:20'
        disabled={isPending}
        onClick={() => {}}
       >
        {isPending && <Spinner />}
       </Button>
       <Button
        type='button'
        variant='outline'
        size='icon'
        disabled={isPending}
        className='text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
        onClick={() => {
         onRemoveFacility(facility.id);
        }}
       >
        {isPending ? <Spinner /> : <IoTrashOutline />}
       </Button>
      </>
     )}
    </div>
   </div>
  </form>
 );
}
