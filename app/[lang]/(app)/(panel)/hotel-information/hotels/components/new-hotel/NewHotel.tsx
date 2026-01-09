'use client';
import { useState, useEffect } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelSchema,
 createHotelSchema,
 defaultValues,
} from '../../schemas/hotelSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveHotelPackage,
 hotelBasePath,
 saveHotel,
 getHotel,
 updateHotel,
 Hotel,
} from '../../services/hotelsApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type HotelsConfig } from '../../services/hotelsConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { NumericFormat } from 'react-number-format';
import { FaRegTrashAlt } from 'react-icons/fa';
import { dictionaryDefaultValues } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { setTimeout } from 'timers';

export default function NewHotel({
 dic,
 hotelID,
 onSuccess,
 onCancel,
 initialData,
}: {
 dic: HotelsDictionary;
 hotelID?: number | null;
 initialData: HotelsConfig['initialData'];
 onSuccess?: HotelsConfig['hotels']['onNewHotelSuccess'];
 onCancel?: HotelsConfig['hotels']['onCancelNewHotel'];
}) {
 const queryClient = useQueryClient();
 // form
 const {
  control,
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
  setFocus,
 } = useForm<HotelSchema>({
  resolver: zodResolver(createHotelSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { localeInfo } = useBaseConfig();
 //
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 //
 const { mutate, isPending } = useMutation({
  mutationFn({}: HotelSchema) {
   const newPerson: SaveHotelPackage = {
    mainData: {},
    dictionaryData: {
     id: data?.nameID || 0,
    },
   };
   return hotelID ? updateHotel(newPerson) : saveHotel(newPerson);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [hotelBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: hotelID ? 'edit' : 'add',
     hotelID: res.data,
    });
   }
   if (hotelID) {
    queryClient.invalidateQueries({
     queryKey: [hotelBasePath, 'hotel', hotelID.toString()],
    });
   } else {
    toast.success(dic.newHotel.newHotelAdded);
   }
   setTimeout(() => {}, 200);
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!hotelID,
  queryKey: [hotelBasePath, 'hotel', hotelID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getHotel({ signal, hotelID: hotelID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!hotelID) return;
  reset();
 }, [hotelID, reset]);

 useEffect(() => {
  if (!hotelID || !isSuccess) return;
  const {} = data;
 }, [hotelID, isSuccess, data, setValue]);

 if (hotelID && isError) return <NoItemFound />;
 if (hotelID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(50rem,100%)] mx-auto'>
   <FieldGroup className='gap-5'>
    <div className='grid grid-cols-2 gap-3 gap-y-5'></div>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!hotelID}
      disabled={!!hotelID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newHotel.form.clearForm}
     </Button>

     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: hotelID ? 'edit' : 'add',
         hotelID: hotelID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newHotel.form.cancel}
      </Button>
      <Button
       className='sm:min-w-28'
       type='submit'
       disabled={isPending || isLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => mutate(data))();
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newHotel.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
