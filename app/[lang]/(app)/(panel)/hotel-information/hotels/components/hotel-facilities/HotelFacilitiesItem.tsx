'use client';
import { useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
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
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';

export default function HotelFacilitiesItem({
 dic,
 facility,
 onCancel,
}: {
 dic: HotelsDictionary;
 facility: HotelFacility | null;
 onCancel?: () => unknown;
}) {
 const [openFacilities, setOpenFacilities] = useState(false);

 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();

 const {
  hotelID,
  initialData: { data: facilities, isLoading },
  facilities: { onRemoveFacility },
 } = useHotelFacilityContext();
 const queryClient = useQueryClient();
 const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  formState: { errors },
  watch,
  setFocus,
 } = useForm<HotelFacilitiesSchema>({
  resolver: zodResolver(createHotelFacilitiesSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   capacity: facility?.capacity || '',
   comment: facility?.comment || '',
   quantity: facility?.quantity || '',
   scale: facility?.scale || '',
   facility: facility
    ? {
       key: facility.facilityID.toString(),
       value: facility.facilityName,
      }
    : null,
  },
 });

 const [facilityValue, quantityValue, capacityValue, scaleValue, commentValue] =
  watch(['facility', 'quantity', 'capacity', 'scale', 'comment']);

 const formChanged =
  facilityValue?.key !== facility?.facilityID.toString() ||
  quantityValue !== (facility?.quantity || '') ||
  capacityValue !== (facility?.capacity || '') ||
  scaleValue !== (facility?.scale || '') ||
  commentValue !== (facility?.comment || '');

 const { mutate, isPending } = useMutation({
  mutationFn({
   capacity,
   comment,
   facility: formFacility,
   quantity,
   scale,
  }: HotelFacilitiesSchema) {
   const saveFacilityPackage: SaveHotelFacilityPackage = {
    id: facility?.id || 0,
    hotelID,
    facilityID: Number(formFacility!.key),
    capacity: capacity || 0,
    comment: comment || null,
    quantity: quantity || null,
    scale: scale || null,
   };
   return facility
    ? updateHotelFacility(saveFacilityPackage)
    : saveHotelFacility(saveFacilityPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelFacilitiesBasePath, 'all'],
   });
   if (facility) {
    queryClient.invalidateQueries({
     queryKey: [hotelFacilitiesBasePath, 'facility', facility.id.toString()],
    });
   } else {
    reset();
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {
    setFocus('facility');
   }, 200);
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
   className='group grid grid-cols-1 data-[add-edit="true"]:mb-4 data-[add-edit="true"]:bg-background data-[add-edit="true"]:p-4 data-[add-edit="true"]:rounded-md data-[add-edit="true"]:border data-[add-edit="true"]:border-input'
  >
   <div>
    <div className='gap-y-4 gap-3 grid grid-cols-2 md:grid-cols-[minmax(0,16rem)_repeat(3,1fr)] mb-4'>
     <Controller
      control={control}
      name='facility'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2' data-invalid={!!errors.facility}>
        <FieldLabel htmlFor={`facility${facility?.id || ''}`}>
         {dic.hotelFacility.form.facility}
        </FieldLabel>
        <Popover open={openFacilities} onOpenChange={setOpenFacilities}>
         <PopoverTrigger asChild>
          <Button
           data-invalid={!!errors.facility}
           id={`facility${facility?.id || ''}`}
           title={value?.value}
           variant='outline'
           role='combobox'
           type='button'
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
              type='button'
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
       <Field className='gap-2' data-invalid={!!errors.quantity}>
        <FieldLabel htmlFor={`quantity${facility?.id || ''}`}>
         {dic.hotelFacility.form.quantity}
        </FieldLabel>
        <InputGroup className='bg-background' data-invalid={!!errors.quantity}>
         <NumericFormat
          id={`quantity${facility?.id || ''}`}
          {...other}
          value={value}
          onValueChange={({ floatValue }) => onChange(floatValue || '')}
          getInputRef={other.ref}
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
        <FieldLabel htmlFor={`capacity${facility?.id || ''}`}>
         {dic.hotelFacility.form.capacity}
        </FieldLabel>
        <InputGroup className='bg-background'>
         <NumericFormat
          id={`capacity${facility?.id || ''}`}
          {...other}
          value={value}
          onValueChange={({ floatValue }) => onChange(floatValue || '')}
          getInputRef={other.ref}
          customInput={InputGroupInput}
         />
        </InputGroup>
       </Field>
      )}
     />
     <Field className='gap-2'>
      <FieldLabel htmlFor={`scale${facility?.id || ''}`}>
       {dic.hotelFacility.form.scale}
      </FieldLabel>
      <InputGroup className='bg-background'>
       <InputGroupInput
        id={`scale${facility?.id || ''}`}
        {...register('scale')}
       />
      </InputGroup>
     </Field>
     <Field className='gap-2 col-span-full'>
      <FieldLabel htmlFor={`comment${facility?.id || ''}`}>
       {dic.hotelFacility.form.comment}
      </FieldLabel>
      <InputGroup className='bg-background'>
       <InputGroupInput
        id={`comment${facility?.id || ''}`}
        {...register('comment')}
       />
      </InputGroup>
     </Field>
    </div>
    <div className='flex justify-end gap-2'>
     {facility && (
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
     )}
     <Button
      type='button'
      variant='outline'
      className='md:20'
      disabled={isPending || Boolean(facility && !formChanged)}
      onClick={() => {
       onCancel?.();
       if (facility) {
        setValue('quantity', facility?.quantity || '');
        setValue('capacity', facility?.capacity || '');
        setValue('scale', facility?.scale || '');
        setValue('comment', facility?.comment || '');
        setValue(
         'facility',
         facility?.facilityID && facility.facilityName
          ? {
             key: facility.facilityID.toString(),
             value: facility.facilityName,
            }
          : null,
        );
       }
      }}
     >
      {isPending && <Spinner />}
      {dic.hotelFacility.form.cancel}
     </Button>
     <Button
      type='submit'
      variant={facility ? 'secondary' : 'default'}
      className='md:w-20'
      disabled={isPending || Boolean(facility && !formChanged)}
      onClick={(e) => {
       e.preventDefault();
       handleSubmit((data) => {
        mutate(data);
       })();
      }}
     >
      {isPending && <Spinner />}
      {facility ? dic.hotelFacility.form.update : dic.hotelFacility.form.add}
     </Button>
    </div>
   </div>
  </form>
 );
}
