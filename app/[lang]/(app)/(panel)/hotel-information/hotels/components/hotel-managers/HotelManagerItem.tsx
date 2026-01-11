'use client';
import { useState, useEffect } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import {
 type HotelManagersSchema,
 defaultValues,
 createHotelManagersSchema,
} from '../../schemas/hotel-managers/hotelManagersSchema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { FaRegTrashAlt } from 'react-icons/fa';
import {
 type HotelManager,
 type SaveHotelManagerPackage,
 hotelHotelMangerBasePath,
 saveHotelManager,
 updateHotelManager,
} from '../../services/hotel-managers/hotelManagersApiActions';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useHotelManagerContext } from '../../services/hotel-managers/hotelManagerContext';
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
 hotelManager,
 onCancel,
}: {
 dic: HotelsDictionary;
 hotelManager: HotelManager | null;
 onCancel?: () => unknown;
}) {
 const [showMore, setShowMore] = useState(false);

 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();

 const {
  hotelID,
  initialData: { data: facilities, isLoading },
  hotelManager: { onRemoveHotelManger },
 } = useHotelManagerContext();
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
 } = useForm<HotelManagersSchema>({
  resolver: zodResolver(createHotelManagersSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });

 const { mutate, isPending } = useMutation({
  mutationFn({
   capacity,
   comment,
   facility: formFacility,
   quantity,
   scale,
  }: HotelManagersSchema) {
   const saveManagerPackage: SaveHotelManagerPackage = {
    id: 0,
   };
   return hotelManager
    ? updateHotelManager(saveManagerPackage)
    : saveHotelManager(saveManagerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelHotelMangerBasePath, 'all'],
   });
   if (hotelManager) {
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelMangerBasePath,
      'manager',
      hotelManager.id.toString(),
     ],
    });
   } else {
    reset();
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {}, 200);
  },
  onError(err: AxiosError<string>) {
   if (hotelManager) {
   }
   toast.error(err.response?.data);
  },
 });

 return (
  <form
   data-add-edit={!!hotelManager?.id}
   className='group grid grid-cols-1 data-[add-edit="true"]:mb-4 data-[add-edit="true"]:bg-background data-[add-edit="true"]:p-4 data-[add-edit="true"]:rounded-md data-[add-edit="true"]:border data-[add-edit="true"]:border-input'
  >
   <div>
    <div className='gap-y-4 gap-3 grid grid-cols-2 md:grid-cols-[minmax(0,16rem)_repeat(3,1fr)] mb-4'>
     {showMore && <></>}
    </div>
    <div className='flex justify-between gap-2 flex-wrap'>
     <Button
      type='button'
      variant='outline'
      onClick={() => {
       setShowMore((pre) => !pre);
      }}
     >
      {showMore
       ? dic.hotelManager.form.showLess
       : dic.hotelManager.form.showMore}
     </Button>
     <div className='flex justify-end gap-2 grow'>
      {hotelManager && (
       <Button
        type='button'
        variant='outline'
        size='icon'
        disabled={isPending}
        className='text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
        onClick={() => {
         onRemoveHotelManger(hotelManager.id);
        }}
       >
        {isPending ? <Spinner /> : <IoTrashOutline />}
       </Button>
      )}
      <Button
       type='button'
       variant='outline'
       className='md:20'
       disabled={isPending}
       onClick={() => {
        onCancel?.();
       }}
      >
       {isPending && <Spinner />}
       {dic.hotelManager.form.cancel}
      </Button>
      <Button
       type='submit'
       variant={hotelManager ? 'secondary' : 'default'}
       className='md:w-20'
       disabled={isPending}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => {
         mutate(data);
        })();
       }}
      >
       {isPending && <Spinner />}
       {hotelManager ? dic.hotelManager.form.update : dic.hotelManager.form.add}
      </Button>
     </div>
    </div>
   </div>
  </form>
 );
}
